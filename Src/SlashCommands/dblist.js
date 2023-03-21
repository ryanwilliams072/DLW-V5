const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getDb, listSettings, listUniverses } = require('../Api/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dblist')
        .setDescription('List all the values in the database')
        .addStringOption(option =>
            option.setName('module')
                .setDescription('Select the module to list')
                .setRequired(true) 
                .addChoices(
                    { name: 'Universe', value: 'uni' },
                    { name: 'Settings', value: 'setti' },
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const module = interaction.options.getString('module');
        // list all the databases
        const db = await getDb();

        if (module === 'uni') {
            const universes = await listUniverses(db);
            return await interaction.reply({
                embeds: [universes],
            });
        } else if (module === 'setti') {
            const settings = await listSettings(db);
            return await interaction.reply({
                embeds: [settings],
                ephemeral: true,
            });
        }
    }
};