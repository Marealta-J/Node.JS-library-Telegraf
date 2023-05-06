const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')

const startStep = new Composer()
startStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        await ctx.replyWithHTML('Какого <b>специалиста</b> Вы ищите?\n<i>Например, Менеджер по продаже автомобилей</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const advertisementScene = new Scenes.WizardScene('advertisementWizard', startStep)
module.exports = advertisementScene