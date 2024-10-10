const express  = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors")
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); 
//  ===== db connect ===================

mongoose.connect('mongodb://127.0.0.1:27017/mernstack_crud').then(()=>{
    console.log("DB connection successfully")
})
.catch((error) =>{
    console.log(error);
});


// User Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    }, 

    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

// ===== Create User ============
app.post("/createuser", async (req, res) => {
    try{
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    }
    catch(error){
        res.send(error);
    }
    
});

// ========= read all user details ===============

app.get("/readalluser", async(req, res) =>{
    try{
        const userData = await User.find({});
        res.send(userData);
    }
    catch(error){
        res.send(error);

    }
});

// ========= read single id user details ===============

app.get("/read/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const user = await User.findById({_id: id});
        res.send(user);
    }catch(error){
        res.send(error);
    }
});

// ======== Update user details =========================

app.put("/updateuser/:id", async(req,res) =>{
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body,{
            new : true,
        });

        res.send(user);
    }catch(error){
        res.send(error);
    }
});



// ======== Update user details =========================

// app.put("/updateuser/:id", async (req, res) => { 
//     try {
//         const id = req.params.id;  

//         const user = await User.findByIdAndUpdate(id, req.body, {  
//             new: true,  
//         });

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });  
//         }

//         res.send(user);  
//     } catch (error) {
//         res.status(500).send({ message: error.message || "An error occurred while updating the user" });  
//     }
// });



// ======== for delete the user ====================
app.delete("/delete/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.send(user);
    } catch (error){
        res.send(user);  
    }
})




// == basic routes ==========
app.get("/", (req, res) => {
    res.send("from get route");
});

// ======= server start ===============
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);
});

