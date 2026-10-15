const dotenv = require('dotenv')
dotenv.config()

async function getAccessToken(code) {
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code,
        redirect_uri: process.env.ML_REDIRECT_URI,
    });

    const response = await fetch(
        "https://api.mercadolibre.com/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            `Erro ${response.status}: ${JSON.stringify(data)}`
        );
    }

    return data.access_token;
}

async function testarToken(accessToken) {
    const response = await fetch(
        "https://api.mercadolibre.com/users/me",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }

    console.log("Autenticação funcionando!");
    console.log("ID:", data.id);
    console.log("Apelido:", data.nickname);
    console.log("País:", data.country_id);

    return data;
}

module.exports = { getAccessToken, testarToken };
