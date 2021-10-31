const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  "create commission": {
    message: "",
    embed: new MessageEmbed()
      .setColor("#316ff5")
      .setTitle("P3ntest Development")
      // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
      .setDescription(
        "Welcome to my discord server. Use the buttons below to create commissions or tickets and I will get back to you ASAP."
      )
      .setFooter("P3ntest Development"),
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("create_commission")
          .setLabel("Create Commission")
          .setStyle("PRIMARY")
          .setEmoji("📩"),
        new MessageButton()
          .setCustomId("create_ticket")
          .setLabel("Create Ticket")
          .setStyle("SUCCESS")
          .setEmoji("💌"),
        new MessageButton()
          .setLabel("View Portfolio")
          .setStyle("LINK")
          .setURL("https://p3ntest.dev")
      ),
    ],
  },
  "new commission": {
    message: "",
    embed: new MessageEmbed()
      .setColor("#316ff5")
      .setTitle("Successfully created your ticket!")
      // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
      .setDescription(
        "Please tell me what you need and I will get back to you very soon!"
      )
      .setFooter("P3ntest Development"),
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("delete_commission")
          .setLabel("Delete Ticket")
          .setStyle("SECONDARY")
          .setEmoji("⛔")
      ),
    ],
  },
  accepted: {
    message: "",
    embed: new MessageEmbed()
      .setColor("#00e61f")
      .setTitle("🧩 Commission accepted!")
      // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
      .setDescription(
        "I will start working on your commission as soon as I receive 50% of the money. You got assigned the client role."
      )
      .setFooter("P3ntest Development"),
  },
  archived: {
    message: "",
    embed: new MessageEmbed()
      .setColor("#6e6e6e")
      .setTitle("🗃️ Commission archived.")
      // .setThumbnail("https://i.imgur.com/W6XEZ0Z.png")
      .setDescription(
        "This commission is marked as done, however will not be deleted."
      )
      .setFooter("P3ntest Development"),
  },
};
