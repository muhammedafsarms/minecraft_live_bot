const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot is online!')
})

app.listen(3000, () => {
  console.log('Web server running')
})
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'zenshawn.falix.pro',
  port: 26450,
  username: 'zenshawn',
  auth: 'offline',
  version: '1.21.11'
})

bot.once('spawn', () => {

  console.log('✅ Bot joined server')

  bot.chat('🔥 Livestream bot online!')

  // Anti AFK
  setInterval(() => {

    bot.setControlState('jump', true)

    setTimeout(() => {
      bot.setControlState('jump', false)
    }, 500)

  }, 15000)

  // Chat messages every 5 minutes
  const messages = [
    '🔥 Subscribe to the stream!',
    '🎥 Live now on YouTube!',
    '💬 Type !hi in chat!',
    '🌍 Welcome everyone!',
    '🎵 Steve Lofi playing now!'
  ]

  setInterval(() => {

    const random =
      messages[Math.floor(Math.random() * messages.length)]

    bot.chat(random)

  }, 300000)

})

bot.on('chat', (username, message) => {

  if (username === bot.username) return

  if (message === '!hi') {
    bot.chat(`Hello ${username} 👋`)
  }

  if (message === '!live') {
    bot.chat('🎥 Stream is live now!')
  }

  if (message === '!dance') {

    bot.setControlState('left', true)

    setTimeout(() => {
      bot.setControlState('left', false)
    }, 3000)

    bot.chat('💃 Dancing!')
  }

})

bot.on('playerJoined', (player) => {

  if (player.username !== bot.username) {
    bot.chat(`👋 Welcome ${player.username}`)
  }

})

bot.on('end', () => {

  console.log('🔄 Reconnecting...')

  setTimeout(() => {
    process.exit()
  }, 5000)

})

bot.on('error', err => {
  console.log('❌ Error:', err.message)
})
