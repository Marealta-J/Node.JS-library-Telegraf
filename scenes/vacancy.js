const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')
const yesUndefinded = name => typeof name === 'undefined' ? '' : name;

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

const titleStep = new Composer()
titleStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        await ctx.replyWithHTML('Укажите форму занятости. В каком городе требуется <b>специалист</b>?\n<i>Например, Москва</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const cityStep = new Composer()
cityStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.city = ctx.message.text
        await ctx.replyWithHTML('Укажите <b>заработную плату</b>?\n<i>Например, До 130,000 руб.</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

cityStep.action('remote', async (ctx) => {
    try {
        ctx.wizard.state.data.city = 'Дистанционно'
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Укажите <b>заработную плату</b>?\n<i>Например, До 130,000 руб.</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const priseStep = new Composer()
priseStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.prise = ctx.message.text
        await ctx.replyWithHTML('Требуется ли <b>опыт работы</b>? Укажите какой\n<i>Например, от 1 года</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Не требуется', 'no-experience')]
        ]))     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const experienceStep = new Composer()
experienceStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.experience = ctx.message.text
        await ctx.replyWithHTML('Какие <b>обязанности</b>несёт должность?\n<i>Например, Приём входящих звонков</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

experienceStep.action('no-experience', async (ctx) => {
    try {
        ctx.wizard.state.data.experience = 'не требуется'
        await ctx.replyWithHTML('Какие <b>обязанности</b>несёт должность?\n<i>Например, Приём входящих звонков</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const dutyStep = new Composer()
dutyStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.duty = ctx.message.text
        await ctx.replyWithHTML('Укажите <b>требования</b> к соискателю:\n<i>Например, Грамотная речь</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const requirementStep = new Composer()
requirementStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.requirement = ctx.message.text
        await ctx.replyWithHTML('Укажите <b>условия</b> работы:\n<i>Например, График работы 5/2 с плавающими выходными</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const conditionStep = new Composer()
conditionStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.condition = ctx.message.text
        const wizartData = ctx.wizard.state.data
        await ctx.replyWithHTML(`<b>${wizartData.title}</b>\n${wizartData.prise}\n${wizartData.city}\n\n<b>Требуемый опыт работы:</b> ${wizartData.experience}\n\n<b>Обязанности:</b>\n${wizartData.duty}\n\n<b>Требования:</b>\n${wizartData.requirement}\n\n<b>Условия:</b>\n${wizartData.condition}\n\n<b>Контакты:</b>\n${yesUndefinded(wizartData.firstName)} ${yesUndefinded(wizartData.lastName)}\nТелеграм: @${wizartData.userName}`)     
        await ctx.replyWithHTML('Вакансия успешно отправлено Администратору!')
        return ctx.wizard.leave()
    } catch (e) {
        console.log(e)
    }
})

const vacancyScene = new Scenes.WizardScene('vacancyWizard', startStep, titleStep, cityStep, priseStep, experienceStep, dutyStep, requirementStep, conditionStep)
module.exports = vacancyScene