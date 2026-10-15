const express = require('express')
const { getAccessToken, testarToken } = require('./token')
const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

const ML_CLIENT_ID = process.env.ML_CLIENT_ID
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET
const ML_REDIRECT_URI = process.env.ML_REDIRECT_URI

const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${ML_CLIENT_ID}&redirect_uri=${ML_REDIRECT_URI}`;
console.log(url)

app.get('/', async (req, res) => {
    try {
        const { code, error, error_description } = req.query;

        if (error) {
            return res.status(400).render("token", {
                authUrl: null,
                accessToken: null,
                erro: error_description || error,
            });
        }

        if (!code || typeof code !== "string") {
            return res.status(400).render("token", {
                authUrl: null,
                accessToken: null,
                erro: "Código de autorização não recebido.",
            });
        }

        const accessToken = await getAccessToken(code);

        return res.render("token", {
            authUrl: null,
            accessToken,
            erro: null,
        });
    } catch (error) {
        console.error("Falha na autorização do Mercado Livre.");

        return res.status(500).render("token", {
            authUrl: null,
            accessToken: null,
            erro: "Não foi possível obter o token. Tente autorizar novamente.",
        });
    }
})

export default app