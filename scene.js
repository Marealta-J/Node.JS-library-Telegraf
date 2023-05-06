const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);

const startWizard = new Composer()
startWizard.on('text', async (ctx) => {
    await ctx.reply('Назови своё имя')
    return ctx.scene.enter('sceneWizard')
  })

const firstName = new Composer()
firstName.on('text', async (ctx) => {
  ctx.wizard.state.data.firstName = ctx.message.text;
  await ctx.reply('Назови фамилию')
  return ctx.wizard.next();
})

const lastName = new Composer()
lastName.on('text', async (ctx) => {
  ctx.wizard.state.data.lastName = ctx.message.text;
  await ctx.reply('Выбери', Markup.inlineKeyboard([
    [Markup.button.callback('Telegram', 'Telegram')],
    [Markup.button.callback('WhatsApp', 'WhatsApp')]
  ]))
  return ctx.wizard.next();
})

const messenger = new Composer()
messenger.action('Telegram', async (ctx) => {
  ctx.wizard.state.data.messenger = 'Telegram';
  await ctx.reply(`${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.lastName}`)
  await ctx.reply(`${ctx.wizard.state.data.messenger} - ответ неверный!`)
  return ctx.scene.leave();
})

messenger.action('WhatsApp', async (ctx) => {
  ctx.wizard.state.data.messenger = 'WhatsApp';
  await ctx.reply(`${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.lastName}`)
  await ctx.reply(`${ctx.wizard.state.data.messenger} - ответ неверный!`)
  return ctx.scene.leave();
})
      
const menuScene = new Scenes.WizardScene('sceneWizard', startWizard, firstName, lastName, messenger)
const stage = new Scenes.Stage([menuScene])
bot.use(session())
bot.use(stage.middleware())

bot.command('start', (ctx) => {
    ctx.scene.enter('sceneWizard')
})

bot.launch()