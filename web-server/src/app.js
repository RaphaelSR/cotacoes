//Please read the tag ( ERROR OLD MSG #FIXED )


//( ERROR OLD MSG #FIXED )  In the package.json the instructor takes off the handlebars installation, but doesn't worked out with me without it.

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')
const app = express()
// #FIXED publicDirectoryPath didn´t worked
const publicDirectoryPath = path.join(__dirname, '../public') //( ERROR OLD MSG #FIXED ) I found the error, the correct should be '../web-server' (Please discart the others messages)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(__dirname)
app.set('view engine', 'hbs') // ( ERROR OLD MSG #FIXED )I belive the old error is in this function, but now is using /templates/views as a directory.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // ( ERROR OLD MSG #FIXED ) In the instruction video are used ('index') to find the path, but i´ve tried, and tried again with /views , tried with index.hbs and nothing worked, so i´ve putted the complete directory path.
    res.render('index', {
        title: 'Cotações',
        author: 'Raphael Rocha'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Raphael Rocha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Raphael Rocha'
    })
})
//Used for .html get
// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('about page')
// })

app.get('/cotacoes', (req, res) => {
    // const cotacao = {
    //     symbol: 'PETR4.SA',
    //     price_open: 10,
    //     price: 12,
    //     day_high: 13,
    //     day_low: 9
    // }
    // const cotacoes = new Array()
    // cotacoes.push(cotacao)
    // cotacoes.push(cotacao)
    // res.send(cotacoes)
    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                mensage: 'O ativo deve ser informado como query parameter',
                code: 400
            }
        })
    }
    const symbol = req.query.ativo.toUpperCase()
    cotacoes(symbol, (err, body) => {
        if (err) {
            // const {message} = err
            // const error = {
            //     error :{
            //         message : 'O ativo deve ser informado como query parameter',
            //         code : err.code
            //     }                
            // }
            return res.status(err.code).json({error : {
                mensage: err.mensage,
                code : err.code
            }})
        }
        res.status(200).json(body)
    })
})

app.get('/help/*', (req, res) => {
    // res.send('404 do help')
    res.render('404', {
        title: '404',
        errorMensage: 'Não existe página depois de /help',
        author: 'Raphael Rocha'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMensage: 'Página não encontrada',
        author: 'Raphael Rocha'
    })
})
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})