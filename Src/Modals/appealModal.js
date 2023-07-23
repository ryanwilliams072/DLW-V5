const { ActionRowBuilder, ModalBuilder,  TextInputBuilder, TextInputStyle } = require('discord.js');
// const { return } = require('../Api/mainAPI.js')

module.exports = {
    name: 'appealModal',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('appealModal')
            .setTitle('Unban Appeal Application')

        const serverInputField = new TextInputBuilder()
            .setCustomId('serverInput')
            .setLabel("Place ID you're banned from")
            .setPlaceholder('4917838193')
            .setStyle(TextInputStyle.Short);

        const userInputField = new TextInputBuilder()
            .setCustomId('userInput')
            .setLabel("What's your Username/ID?")
            .setPlaceholder('corehimself')
            .setStyle(TextInputStyle.Short);

        const appealInputField = new TextInputBuilder()
            .setCustomId('appealField')
            .setLabel("What would you like to appeal?")
            .setPlaceholder('I would like to appeal my ban because...')
            .setStyle(TextInputStyle.Paragraph);

        const row = new ActionRowBuilder()
            .addComponents(serverInputField, userInputField, appealInputField);

        modal.addComponents(row);
    
        // Show the modal to the user
        await interaction.showModal(modal);
    },
};