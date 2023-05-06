const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')

const yesUndefinded = name => typeof name === 'undefined' ? '' : name;

const startStep = new Composer()
startStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        await ctx.replyWithHTML('На какую <b>должность</b> Вы претендуете?\n<i>Например, Организатор свадеб</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const titleStep = new Composer()
titleStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        await ctx.replyWithHTML('Укажите форму занятости. В каком городе Вы хотите работать <b>работать</b>?\n<i>Например, Москва</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Дистанционно', 'remote')]
        ]))     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const cityStep = new Composer()
cityStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.city = ctx.message.text
        await ctx.replyWithHTML('На какую <b>заработную плату</b> Вы претендуете?\n<i>Например, До 50,000 руб.</i>', Markup.inlineKeyboard([
            [Markup.button.callback('По договорённости', 'comp')]
        ]))     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

cityStep.action('remote', async (ctx) => {
    try {
        ctx.wizard.state.data.city = 'Дистанционно'
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('На какую <b>заработную плату</b> Вы претендуете?\n<i>Например, До 50,000 руб.</i>', Markup.inlineKeyboard([
            [Markup.button.callback('По договорённости', 'comp')]
        ]))     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const priseStep = new Composer()
priseStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.prise = ctx.message.text
        await ctx.replyWithHTML('Опишите, чем Вы <b>занимаетесь</b>? Коротко расскажите о том, что Вы предлагаете?\n<i>Например, подбор декора и артистов</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

priseStep.action('comp', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.prise = 'По договорённости'
        await ctx.replyWithHTML('Опишите, чем Вы <b>занимаетесь</b>? Коротко расскажите о том, что Вы предлагаете?\n<i>Например, подбор декора и артистов</i>')     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})


const classStep = new Composer()
classStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.class = ctx.message.text
        await ctx.replyWithHTML('Какой у Вас <b>опыт работы</b>?\n<i>Например, от 1 года</i>', Markup.inlineKeyboard([
            [Markup.button.callback('Нет опыта', 'no-experience')]
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
        await ctx.replyWithHTML('Укажите ссылку на <b>портфолио</b>:', Markup.inlineKeyboard([
            [Markup.button.callback('Нет портфолио', 'no-portfolio')]
        ]))     
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

experienceStep.action('no-experience', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.experience = 'Нет опыта'
        await ctx.replyWithHTML('Укажите ссылку на <b>портфолио</b>:', Markup.inlineKeyboard([
            [Markup.button.callback('Нет портфолио', 'no-portfolio')]
        ]))  
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const portfolioStep = new Composer()
portfolioStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.portfolio = ctx.message.text
        const wizartData = ctx.wizard.state.data
        await ctx.replyWithHTML(`<b>${wizartData.title}</b>\n${wizartData.prise}\n${wizartData.city}\n\n<b>Опыт работы:</b> ${wizartData.experience}\n\n<b>Портфолио:</b>\n${wizartData.portfolio}\n\n<b>Навыки:</b>\n${wizartData.class}\n\n<b>Заработная плата:</b>\n${wizartData.prise}\n\n<b>Контакты:</b>\n${yesUndefinded(wizartData.firstName)} ${yesUndefinded(wizartData.lastName)}\nТелеграм: @${wizartData.userName}`)  
        await ctx.replyWithHTML('Резюме успешно отправлено Администратору!')    
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

portfolioStep.action('no-portfolio', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.portfolio = 'Нет портфолио'
        const wizartData = ctx.wizard.state.data
        await ctx.replyWithHTML(`<b>${wizartData.title}</b>\n${wizartData.prise}\n${wizartData.city}\n\n<b>Опыт работы:</b> ${wizartData.experience}\n\n<b>Портфолио:</b>\n${wizartData.portfolio}\n\n<b>Навыки:</b>\n${wizartData.class}\n\n<b>Заработная плата:</b>\n${wizartData.prise}\n\n<b>Контакты:</b>\n${yesUndefinded(wizartData.firstName)} ${yesUndefinded(wizartData.lastName)}\nТелеграм: @${wizartData.userName}`)    
        await ctx.replyWithHTML('Резюме успешно отправлено Администратору!')  
        return ctx.wizard.leave()
    } catch (e) {
        console.log(e)
    }
})

const resumeScene = new Scenes.WizardScene('vacancyWizard', startStep, titleStep, cityStep, priseStep, classStep, experienceStep, portfolioStep)
module.exports = resumeScene