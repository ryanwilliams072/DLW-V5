const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getDb, saveSetting } = require('../Api/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbsetup')
        .setDescription('Setup the database for the bot')
        .addStringOption(option =>
            option.setName('module')
                .setDescription('Select the module to setup')
                .setRequired(true) 
                .addChoices(
                    { name: 'DataStore', value: 'db' },
                    { name: 'logChannelID', value: 'logchan' },
                ))
        .addStringOption(option =>
            option.setName('dbkey')
                .setDescription('The value to save')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const module = interaction.options.getString('module');
        const dbkey = interaction.options.getString('dbkey');
        
        if (!module || !dbkey) {
            await interaction.reply('You must specify both values to setup the database');
            return;
        }

        if (module === 'db') {
            await saveSetting('datastoreApiKey', dbkey);

            return await interaction.reply({
                content: `Datastore API key set to ${dbkey}`,
                embeds: [saveSetting],
                ephemeral: true
            });
        } else if (module === 'logchan'){
            await saveSetting('logChannelID', dbkey);

            return await interaction.reply({
                content: `Log channel set to ${dbkey}`,
                embeds: [saveSetting],
                ephemeral: true
            });
        }
        await interaction.reply({
            content: `Failed to set ${module}`
        });
    }
};