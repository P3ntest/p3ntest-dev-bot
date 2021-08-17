const { MessageSelectMenu, MessageEmbed, MessageActionRow } = require("discord.js")

module.exports = {
    paymentMessageBuilder: function (amount) {
        return {
            embeds: [new MessageEmbed()
                .setColor("#316ff5")
                .setTitle("What is your preferred payment method?")
                .setDescription("Please select an option below. Different payment methods have different fees!")
                .addField("Payment Methods",
                    `<:paypal:877009799949205574> \`0%  fees: $${(Math.round(amount * 100) / 100).toFixed(2)}\` PayPal Friends & Family
                    <:paypal:877009799949205574> \`15% fees: $${(Math.round(amount * 115) / 100).toFixed(2)}\` PayPal Goods & Services
                    <:tebex:877010888584986634> \`20% fees: $${(Math.round(amount * 120) / 100).toFixed(2)}\` Tebex Webshop`
                    , true)
                .addField("Amount", `$${amount}`, true)
                .setTimestamp()
                .setFooter("P3ntest Development")],
            components: [new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("payment_select_option")
                        .setPlaceholder('Select a payment option!')
                        .addOptions([
                            {
                                label: 'Paypal F&F',
                                description: `$${(Math.round(amount * 100) / 100).toFixed(2)}`,
                                value: `paypal_ff:${(Math.round(amount * 100) / 100).toFixed(2)}`,
                                "emoji": {
                                    "name": "paypal",
                                    "id": "877009799949205574"
                                }
                            },
                            {
                                label: 'Paypal G&S',
                                description: `$${(Math.round(amount * 115) / 100).toFixed(2)}`,
                                value: `paypal_gs:${(Math.round(amount * 115) / 100).toFixed(2)}`,
                                "emoji": {
                                    "name": "paypal",
                                    "id": "877009799949205574"
                                }
                            },
                            {
                                label: 'Tebex',
                                description: `$${(Math.round(amount * 120) / 100).toFixed(2)}`,
                                value: `tebex:${(Math.round(amount * 120) / 100).toFixed(2)}`,
                                "emoji": {
                                    "name": `tebex`,
                                    "id": "877010888584986634"
                                }
                            },
                        ]),
                )]
        }
    },
    paypalmeLinkBuilder: function (type, amount) {
        return {
            embeds: [new MessageEmbed()
                .setColor("#316ff5")
                .setTitle("Click here to get redirected to paypal!")
                .setDescription(`⚠️ **Make sure to select ${type == "ff" ? "Friends & Family" : "Goods & Services"} at checkout!**`)
                .setURL("https://paypal.me/p3ntest/" + amount + "usd")
                .setTimestamp()
                .setFooter("P3ntest Development")],
        }
    },
    tebexLinkBuilder: function (amount) {
        return {
            embeds: [new MessageEmbed()
                .setColor("#316ff5")
                .setTitle("Click here to get redirected to tebex!")
                .setDescription(`⚠️ **Make sure to pay $${amount}!**`)
                .setURL("https://p3ntests-development.tebex.io/package/4634092")
                .setTimestamp()
                .setFooter("P3ntest Development")],
        }
    }
}