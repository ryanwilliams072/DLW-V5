const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { returnUniverses } = require('../Api/database.js');
const { listEntries } = require('../Api/datastoreHandler.js');
const axios = require('axios').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('List all the values in the database')
        .addStringOption(option =>
            option.setName('universe')
                .setDescription('The name of the Server to ban the user from')
                .setRequired(true)
                .setAutocomplete(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = await returnUniverses();
        
        const filtered = choices.filter((choice) => {
            if (typeof focusedValue === 'string') {
                return choice.name.toLowerCase().startsWith(focusedValue.toLowerCase());
            }
            return false;
        });
        await interaction.respond(filtered.map((choice) => ({ name: choice.name, value: choice.id })));
    },
    async execute(interaction) {
        const universe = interaction.options.getString('universe');
        const universes = await listEntries(universe);
        const userID = universes.keys[0].key;
        const username = await returnRobloxUsername(userID);
        const baseLink = 'https://www.roblox.com/users/${userID}/profile';
        const link = baseLink.replace('${userID}', userID);

        const embed = new EmbedBuilder()
            .setTitle("Datastore Entries")
            .setColor('#2f3136')
            .setDescription("Here are the entries in the datastore.")
            .addFields(
                { name: "Username", value: `[${username}](${link})`, inline: true},
                { name: "UserID", value: userID, inline: true},
            )

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};

async function returnRobloxUsername(userID) {
    const baseURL = `https://users.roblox.com/v1/users/${userID}`;
    try {
        const response = await axios.get(baseURL);
        const returnedData = response.data;
        if (returnedData.id !== undefined) {
            return returnedData.name;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(`Error with name check API: ${error.message}`);
    }
}