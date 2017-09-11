// require all node module stuff
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// require my code (e.g. db and routes)
const db = require('./models')
//const routes = require('./routes')

// make an app instance of express
const app = express()


// do middleware
// logging
app.use(morgan('dev'))
// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set up template engine
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', require('./api'));
//app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))


// do routes
// app.use(require('./routes'))

// do app.listen (inside a db.sync)
db.sync()
	.then(function(){
		app.listen(3000, function(){
			console.log('keeping it 3000')
		})
	});