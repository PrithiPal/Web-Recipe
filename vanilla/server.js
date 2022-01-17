const e = require('express')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const ITEMS = {
    "item1": {
        "title": "ITEM1",
        "description": "This is Item 1 ",
        "props": [5, 7, 8]
    },
    "item2": {
        "title": "Something2",
        "description": "This is Item 2 ",
        "props": [2, 5, 6]
    }
}

const addItem = async(name, title, description) => {
    ITEMS[`${name}`] = { title, description };
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.get('/item/:name', (req, res) => {
    const name = req.params['name']

    if (Object.keys(ITEMS).includes(name)) {
        console.log(ITEMS[name]);
        res.send(JSON.stringify(ITEMS[name]))
    } else {
        res.sendStatus(404)
    }
});

app.get('/items', (_, res) => {
    console.log('Requesting Items');
    res.status(200).send(JSON.stringify(ITEMS));
});

app.post('/item', (req, res) => {
    console.log(`Request to Create Item `);
    console.log(`Req URL ${req.url}`);
    console.log(`Req Headers ${JSON.stringify(req.headers)}`);
    console.log(`Req Body ${JSON.stringify(req.body)}`);

    const formData = req.body

    addItem(formData['itemName'], formData['itemDescription'])
        .then(() => {
            res.status(200).redirect('http://localhost:5500/frontend');
        })
        .catch((err) => console.log(err));
})




app.listen(3000, () => { console.log("Backend Running @ 3000") });