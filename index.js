const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')
const vacancyScene = require('./scenes/vacancy')
const resumeScene = require('./scenes/resume')
const advertisementScene = require('./scenes/advertisement')

require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([vacancyScene, resumeScene, advertisementScene])
bot.use(session())
bot.use(stage.middleware())

bot.hears('Разместить вакансию', ctx => ctx.scene.enter('vacancyWizard'))
bot.hears('Разместить резюме', ctx => ctx.scene.enter('resumeWizard'))
bot.hears('Заказать рекламу', ctx => ctx.scene.enter('advertisementWizard'))


bot.start( async (ctx) => {
    try {
        await ctx.reply('Хочу разместить', Markup.keyboard([
            ['Разместить вакансию'],
            ['Разместить резюме', 'Заказать рекламу']
        ]).oneTime().resize())
    } catch (e) {
        console.log(e)
    }
})
//Уменьшает размер кнопок .oneTime().resize()

bot.launch()