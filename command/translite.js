//** translite

const translate = require('@vitalets/google-translate-api');

module.exports = {
 CmD: ['translate'],
 aliases: ['translate'],
 categori: "Google",
 exec: async ( m, { bob, text, args }) => {
 if (!text) return m.reply('contoh: #translate Halo semua

