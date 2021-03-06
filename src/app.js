require("dotenv").config();

const {
  Client,
  Intents,
  MessageButton,
  Permissions,
  CommandInteraction,
  MessageActionRow,
} = require("discord.js");
const {
  paymentMessageBuilder,
  paypalmeLinkBuilder,
  tebexLinkBuilder,
} = require("./messageBuilders");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const messages = require("./messages");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (
      interaction.customId == "create_commission" ||
      interaction.customId == "create_ticket"
    ) {
      const channelName =
        (interaction.customId == "create_commission"
          ? "commission-"
          : "ticket-") + interaction.user.username;

      const commissionChannel = await interaction.guild.channels.create(
        channelName,
        {
          topic: interaction.user.username + "'s Ticket",
          parent:
            interaction.customId == "create_commission"
              ? "876945254568316948"
              : "902256309376794684",
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
          ],
        }
      );

      commissionChannel.send(messageBuilder("new commission"));

      await interaction.reply({
        ephemeral: true,
        content: "Created your ticket: <#" + commissionChannel.id + ">",
      });
    } else if (interaction.customId == "delete_commission") {
      interaction.update({
        ...messageBuilder("new commission"),
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("Are you sure?")
              .setStyle("DANGER")
              .setCustomId("delete_commission_confirm")
              .setEmoji("??????")
          ),
        ],
      });

      setTimeout(() => {
        try {
          interaction.message.edit(messageBuilder("new commission"));
        } catch (e) {}
      }, 5000);
    } else if (interaction.customId == "delete_commission_confirm") {
      interaction.channel.delete();
    }
  }

  if (interaction.isCommand()) {
    if (interaction.commandName === "sendmsg") {
      const apiMsg = messageBuilder(interaction.options.getString("message"));

      if (!apiMsg) await interaction.reply("Message not found.");
      else {
        interaction.options.getChannel("channel").send(apiMsg);
        await interaction.reply({ content: "Sent", ephemeral: true });
      }
    } else if (interaction.commandName === "pay") {
      await interaction.reply(
        paymentMessageBuilder(interaction.options.getInteger("amount"))
      );
    } else if (interaction.commandName === "accept") {
      interaction.options.getMember("client").roles.add("876850716436738098");
      interaction.channel.setParent("904369569563541524");
      await interaction.reply(messageBuilder("accepted"));
    } else if (interaction.commandName === "archive") {
      interaction.channel.setParent("902325000747491338");
      await interaction.reply(messageBuilder("archived"));
    }
  }

  if (interaction.isSelectMenu()) {
    if (interaction.customId == "payment_select_option") {
      const value = interaction.values[0];
      const amount = value.split(":")[1];
      switch (value.split(":")[0]) {
        case "paypal_ff":
          interaction.reply(paypalmeLinkBuilder("ff", amount));
          break;
        case "paypal_gs":
          interaction.reply(paypalmeLinkBuilder("gs", amount));
          break;
        case "tebex":
          interaction.reply(tebexLinkBuilder(amount));
          break;
      }
    }
  }
});

function messageBuilder(msgId) {
  if (!messages[msgId]) {
    return;
  }
  const message = messages[msgId];
  const apiMsg = {};
  message.message && (apiMsg.content = message.message);
  message.embed && (apiMsg.embeds = [message.embed]);
  message.components && (apiMsg.components = message.components);
  return apiMsg;
}

client.login(process.env.DISCORD_TOKEN);
