const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const { Parser } = require('json2csv');

const db_uri = 'mongodb+srv://tensorgo:ow4ohB1k8d5NA2bj@tensorgochallenge.ikxcb.mongodb.net/tensorgo?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fields = [
    {
        label: "id",
        value: "id"
    },
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'Email',
        value: 'email'
    },
    {
        label: "Gender",
        value: "gender"
    },
    {
        label: "Status",
        value: "status"
    },
    {
        label: "CreatedAt",
        value: "createdAt"
    },
    {
        label: "UpdatedAt",
        value: "updatedAt"
    }
]
const json2csv = new Parser({ fields: fields })

app.get('/api/export-user-data', async (req,res) => { 
    let users = await User.find({});

    try {
        const csv = json2csv.parse(users)
        res.attachment('data.csv')
        res.status(200).send(csv);
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
});

(async () => {
    await mongoose.connect(db_uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Connected to database successfully!");

    app.listen(PORT, () => { 
        console.log("Server listening on port: ", PORT);
    });
})();

