const express = require('express')
const {getAccessToken, testarToken} = require('./token')
const app = express()

const CODE = 'TG-6ad0c1487b026b0001c072a1-3335633877'

const ML_CLIENT_ID = process.env.ML_CLIENT_ID
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET
const ML_REDIRECT_URI = process.env.ML_REDIRECT_URI

const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${ML_CLIENT_ID}&redirect_uri=${ML_REDIRECT_URI}`;
console.log(url)

app.get('/', async (req, res)=>{
    const {code} = req.query
    const token = await getAccessToken(code)
    const response = await testarToken(token)
    return res.json(response)
})

export default app