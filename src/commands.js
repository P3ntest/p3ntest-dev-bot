const { SlashCommandBuilder } = require("@discordjs/builders");

const commands = [];

commands.push(
  new SlashCommandBuilder()
    .setName("commission")
    .setDescription("Handle Commissions")
    .toJSON()
);

commands.push({
  ...new SlashCommandBuilder()
    .setName("accept")
    .setDescription("Accept a client")
    .addUserOption((option) =>
      option
        .setName("client")
        .setDescription("Client to accept.")
        .setRequired(true)
    )
    .toJSON(),
  default_permission: false,
});

commands.push({
  ...new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Archive a commission")
    .addUserOption((option) =>
      option
        .setName("client")
        .setDescription("Client to accept.")
        .setRequired(true)
    )
    .toJSON(),
  default_permission: false,
});

commands.push({
  ...new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Request a payment")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to pay in $")
        .setRequired(true)
    )
    .toJSON(),
  default_permission: false,
});

const sendPre = new SlashCommandBuilder()
  .setName("sendmsg")
  .setDescription("Send a predefined message.")
  .addStringOption((option) =>
    option.setName("message").setDescription("Message ID").setRequired(true)
  )
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Channel to send in.")
      .setRequired(true)
  );
commands.push({ ...sendPre.toJSON(), default_permission: false });

module.exports = commands;
