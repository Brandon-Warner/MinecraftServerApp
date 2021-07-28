const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
require('express-async-errors')
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const blockUrl = 'https://ismyserverblocked.com/check'
const serverUrl = 'https://api.mcsrvstat.us/2'
const offlineModeUrl = 'https://ismyserverblocked.com/ping'

app.get(`/api/serverinfo/:url`, async (request, response) => {
    console.log('request params: ', request.params)
    const url = request.params.url
    const serverInfo = await axios.get(`${serverUrl}/${url}`)

    response.json(serverInfo.data)
})

app.get('/api/blockinfo/:url', async (request, response) => {
    console.log('request params: ', request.params)
    const url = request.params.url
    const blockInfo = await axios.get(`${blockUrl}/${url}`)

    response.json(blockInfo.data)
})

app.get('/api/offlineinfo/:url', async (request, response) => {
    console.log('request params: ', request.params)
    const url = request.params.url
    const offlineInfo = await axios.get(`${offlineModeUrl}/${url}`)

    response.json(offlineInfo.data)
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
