const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const axios = require('axios');

const db_uri = 'mongodb+srv://tensorgo:ow4ohB1k8d5NA2bj@tensorgochallenge.ikxcb.mongodb.net/tensorgo?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/populate-db', async (req,res) => { 
    // get data from the api 
    let response = await axios('https://gorest.co.in/public/v2/users', {
        method: "GET",
        headers: {
            'Authorization': "bearer 788079a79d34433fdf17f288151557477cdbb761ca6d016de2dc6386afff91e9"
        },
    });
    let users = response.data;
    let promises = [];

    for(let user of users){
        let new_user = User.build({ ...user });
        
        promises.push(new_user.save());
    }

    await User.deleteMany({});
    await Promise.all(promises);

    res.status(200).send("Data populated in database");
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

