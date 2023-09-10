import http from 'http'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import routes from './server/routes'

const port = process.env.PORT || 4000
const host = '192.168.0.100'
var app  = express()
var server = http.createServer(app)


let corsOptions ={
    origin: "http://localhost:3000"
}
app.use('/api/static',express.static(__dirname + '/public'));
app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))

routes(app)

app.get('*',(req,res)=>{
    res.status(200).send({message: "Welcome API UNITY"})
})

server.listen(port,host,()=>{
    console.log(`Server is runing  http://${host}:${port}/`)
})
