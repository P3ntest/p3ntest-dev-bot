const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
    "create commission": {
        message: "",
        embed: new MessageEmbed()
            .setColor("#316ff5")
            .setTitle("Create a commission!")
            // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
            .setDescription("Click the button and send me the details about your request. I will get back to you ASAP with a quote :)")
            .setFooter("P3ntest Development"),
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('create_commission')
                    .setLabel('Create Commission')
                    .setStyle('PRIMARY')
                    .setEmoji("📩"),
                new MessageButton()
                    .setLabel("View Portfolio")
                    .setStyle("LINK")
                    .setURL("https://p3ntest.dev")
            )]
    },
    "new commission": {
        message: "",
        embed: new MessageEmbed()
            .setColor("#316ff5")
            .setTitle("Successfully created your commission!")
            // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
            .setDescription("Please tell me what you need and I will get back to you very soon!")
            .setFooter("P3ntest Development"),
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('delete_commission')
                    .setLabel('Delete Commission')
                    .setStyle("SECONDARY")
                    .setEmoji("⛔")
            )]
    }
}