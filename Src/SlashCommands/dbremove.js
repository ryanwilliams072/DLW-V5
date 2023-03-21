const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { removeUniverse, removeSetting, setupDatabase } = require('../Api/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dbremove')
        .setDescription('Remove a value from the database')
        .addStringOption(option =>
            option.setName('module')
                .setDescription('Select the module to setup')
                .setRequired(true) 
                .addChoices(
                    { name: 'Universe', value: 'uni' },
                    { name: 'Setting', value: 'setti' },
                ))
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The name of the value to remove')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const module = interaction.options.getString('module');
        const uniInput = interaction.options.getString('input');

        if (!uniInput) {
            await interaction.reply('You must specify');
            return;
        }
        const db = await setupDatabase();
        if (module === 'uni') {
            const toRemove = await removeUniverse(db, uniInput);

            await interaction.reply({
                embeds: [toRemove],
            })
            return;
        } else if (module === 'setti'){
            const toRemove = await removeSetting(db, uniInput);

            await interaction.reply({
                embeds: [toRemove],
            })
            return;
        }

        await interaction.reply({
            content: `Failed to remove ${module}`
        })
    }
};