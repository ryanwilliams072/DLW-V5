const { ActionRowBuilder, ModalBuilder,  TextInputBuilder, TextInputStyle } = require('discord.js');
// const { return } = require('../Api/mainAPI.js')

module.exports = {
    name: 'submitAppeal',
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

        const firstAct = new ActionRowBuilder().addComponents(serverInputField);
        const secAct = new ActionRowBuilder().addComponents(userInputField);
        const thirdAct = new ActionRowBuilder().addComponents(appealInputField);

        modal.addComponents(firstAct, secAct, thirdAct);
    
        // Show the modal to the user
        await interaction.showModal(modal);
    },
};