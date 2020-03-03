const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 4444;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// auth: get tokens
app.post('/oauth2/tokens', (req, res) => {

    console.log('body', JSON.stringify(req.body));
    const { scope } = req.body;

    res.send({
        "access_token": "9c024732-444a-4a40-a145-c1245f966023",
        "token_type": "bearer",
        "expires_in": 604799,
        scope,
        "role": "PUBLIC",
        "roles": [
            "PUBLIC"
        ]
    })
})

app.listen(port, () => console.log(`cortex mock api listening on port ${ port }...`));