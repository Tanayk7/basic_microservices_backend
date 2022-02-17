const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const db_uri = 'mongodb+srv://tensorgo:ow4ohB1k8d5NA2bj@tensorgochallenge.ikxcb.mongodb.net/tensorgo?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/users/:id", async (req,res) => { 
    let { id } = req.params;
    let existing_user = await User.findById(id);

    if(!existing_user){
        return res.status(200).send({ 
            errors: [
                { message: "user not found" } 
            ]
        })
    }

    res.status(200).send(existing_user);
});

app.get('/api/users', async (req,res) => { 
    let users = await User.find({});

    res.status(200).send(users);
});

app.delete("/api/users", async (req,res) => { 
    let users = await User.deleteMany({});

    res.status(200).send(users);
})

app.put('/api/edit-user', async (req,res) => { 
    let { id } = req.body;

    if(!id){
        return res.status(200).send({ 
            errors: [
                { message: "id cannot be empty" } 
            ]
        })
    }

    let existing_user = await User.findById(id);

    if(!existing_user){
        return res.status(200).send({ 
            errors: [
                { message: "user not found" } 
            ]
        })
    }

    existing_user.set({ 
        name: req.body.name ? req.body.name : existing_user.name,
        email: req.body.email ? req.body.email : existing_user.email,
        gender: req.body.gender ? req.body.gender : existing_user.gender,
        status: req.body.status ? req.body.status : existing_user.status 
    });
    await existing_user.save();

    res.status(201).send(existing_user);
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

