------- 
-- Made by: corehimself
-- Created: 2/28/2023
-- Updated: 3/24/2023
-- Contributors: Aina
-------

-- // Configuration
local DEBUG_MODE = false;
local Cooldown = (math.random(6, 14));

-- // Services
local ChatService = require(game:GetService("ServerScriptService"):WaitForChild("ChatServiceRunner").ChatService)
local PlayersService = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local MessagingService = game:GetService("MessagingService")

-- // Variables
local MainStore = DataStoreService:GetDataStore("DTRD")
local Enabled = false;
local dataCalls = 0;

-- // Config for announcement for actions
local ServerMsg = ChatService:GetSpeaker("Server") or ChatService:AddSpeaker("Server")
ServerMsg:JoinChannel("All")
ServerMsg:SetExtraData("Font", Enum.Font.Cartoon)
ServerMsg:SetExtraData("FontSize", Enum.FontSize.Size96)
ServerMsg:SetExtraData("NameColor", Color3.fromRGB(193, 0, 0))
ServerMsg:SetExtraData("ChatColor", Color3.fromRGB(193, 0, 0))

local BanMethods = {
	[1] = {Name = "Ban", Message = "You are banned until %s for the following reason: %s!", Lengths = {hr = 1, day = 24, wk = 168, mo = 720, yr = 8760}},
	[2] = {Name = "Kick", Message = "You were kicked from the server for: %s!"},
	[3] = {Name = "Unban", Message = "You have been unbanned!"},
};

local function GetData(plr)
	local plrData;
	local success, info = pcall(function()
		plrData = MainStore:GetAsync("user_"..plr.UserId, {})
	end)
	
	if not success then
		warn("Failed to get data for player "..plr.Name.." with error: "..info)
	end

	return info or {}
end

local function UpdateData(plr, method, time, reason, banEndtime)
	local success, response = pcall(function()
		MainStore:UpdateAsync("user_"..plr.UserId, function(old)
			if old.method == "Ban" and old.time then
				return { method = method, time = time, reason = reason, banEndtime = banEndtime }
			end
		end)
	end)

	if success and (method ~= "Ban" or (method == "Ban" and time == nil)) then
		MainStore:SetAsync("user_"..plr.UserId, false, nil)
	end

	if not success then
		warn("Failed to update data for player "..plr.Name.." with error: "..response)
	end
end

-- // method-to-index dictionary table
local BanMethodIndices = {}
for i, info in ipairs(BanMethods) do
    BanMethodIndices[info.Name] = i
end

-- // Improved HandleBanMethod function
local function HandleBanMethod(plr, method, time, reason)
    local banMethodIndex = BanMethodIndices[method]
    local banMethod = BanMethods[banMethodIndex]
    
    if banMethod == nil then
        warn("Invalid ban method provided.")
        return
    end
    
    local banMessage = banMethod.Message
    
    local currTime = os.time
    local date = os.date
    
    if banMethod == BanMethods[1] then -- Ban
        local timeLength, timeUnit = string.match(time, "(%d+)(%a+)")
        timeLength = tonumber(timeLength)
        
        if time ~= "Permanent" and (timeLength == nil or timeUnit == nil or banMethod.Lengths[timeUnit] == nil) then
            warn("Invalid ban time provided.")
            return
        end
        
        local banDuration = (time == "Permanent") and -1 or (timeLength * banMethod.Lengths[timeUnit] * 3600)
        local banEndTime = (banDuration >= 0) and (currTime() + banDuration) or math.huge
        local timeLeft = tonumber(banEndTime - currTime())
        
        if timeLeft > 0 and UpdateData(plr, method, timeLeft, reason, banEndTime) then
            plr:Kick(string.format(banMessage, date("%c", banEndTime), reason))
            ServerMsg:SayMessage(string.format("%s got BANNED for: %s!", plr.Name, reason), "All")
        elseif timeLeft <= 0 then
            UpdateData(plr, nil, nil, nil, nil)
            CheckPlayer(plr)
        end
    elseif UpdateData(plr, method, nil, reason, nil) then
        if banMethod == BanMethods[2] then -- Kick
            plr:Kick(string.format(banMessage, reason))
        elseif banMethod == BanMethods[3] then -- Unban
            UpdateData(plr, nil, nil, nil, nil)
        end
    end
end

local debounceTable = {}

function debounce(key, callback, cooldown)
    cooldown = cooldown or 0.3
    if debounceTable[key] == nil then
        debounceTable[key] = true
        callback()
        spawn(function()
            wait(cooldown)
            debounceTable[key] = nil
        end)
    end
end

local function CheckPlayer(plr)
	spawn(function()
		while task.wait(Cooldown) do
			if plr and next(GetData(plr)) ~= nil then
				local data = GetData(plr)
	
				if data.method ~= nil and data.time ~= nil and data.reason ~= nil then
					HandleBanMethod(plr, data.method, data.time, data.reason)
				elseif data.method == "Unban" then
					UpdateData(plr, nil, nil, nil, nil)
				elseif (data.method == "Kick" or data.method == "Warn") and data.reason ~= nil then
					UpdateData(plr, nil, nil, nil, nil)
					plr:Kick(string.format("You have been kicked for: %s", data.reason))
					ServerMsg:SayMessage(string.format("%s got KICKED for: %s!", plr.Name, data.reason), "All")
				else
					if DEBUG_MODE then
						warn(data)
					end
				end
			end
		end
	end)
end
	
local function PlayerAdded(plr)
	local data = GetData(plr)

	if next(data) ~= nil then
		if data.method ~= nil and data.time ~= nil then
			HandleBanMethod(plr, data.method, data.time, data.reason)
		elseif data.method == "Unban" or data.method == "Kick" then
			UpdateData(plr, nil, nil, nil, nil)
			debounce(plr.UserId, function()
				CheckPlayer(plr)
			end)
		elseif data.method == "Warn" and data.reason ~= nil then
			UpdateData(plr, nil, nil, nil, nil)
			plr:Kick(string.format("You have been kicked for: %s", data.reason))
			ServerMsg:SayMessage(string.format("%s got KICKED for: %s!", plr.Name, data.reason), "All")
		end
	else
		CheckPlayer(plr)
	end
end

local function initMsgServ()
	local subSucc, conn = pcall(function()
		return MessagingService:SubscribeAsync("DTR", function(msg)
			if (msg.Data.Reason == "Ask" and Enabled) then
				local pubSucc, pubRes = pcall(function()
					MessagingService:PublishAsync("DTR", {Reason = "Response", To = game.JobId})
				end)
			elseif (msg.Data.Reason == "Response" and (msg.Data.To == game.JobId)) then
				dataCalls += 1;
			else
				warn("Msg | ", msg);
				warn("msgData | ", msg.data);
			end
		end)
	end)
	if (subSucc) then warn("Successfully linked"); end
	return subSucc, conn
end

local function code()
	initMsgServ()
	spawn(function()
		while true do
			dataCalls = 0;
			local pubSucc, pubRes = pcall(function()
				MessagingService:PublishAsync("DTR", {Reason = "Ask"});
			end)

			if (pubSucc) then
				task.wait(2);
				if (dataCalls > 3 and Enabled) then
					Cooldown = (Cooldown + math.random(14));
					Enabled = false;
				elseif (dataCalls < 4) then
					if (not Enabled) then
						print("This server is listening to datastore changes");
					end
					Enabled = true;
				else
					Enabled = false;
				end
			else
				Enabled = false;
			end

			task.wait(Cooldown);
		end
	end)
end

PlayersService.PlayerAdded:Connect(PlayerAdded)

return { CheckPlayer = CheckPlayer, HandleBanMethod = HandleBanMethod, GetData = GetData, UpdateData = UpdateData, code = code }