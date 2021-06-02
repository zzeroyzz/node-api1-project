// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model.js")


const server =express()

server.use(express.json())

server.get("/api/users",(req,res) =>{
    User.findAll()
    .then(users =>{
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err =>{
        res.status(500).json({message:err.message})
    })
})



server.get("/api/users/:id",(req,res) =>{
    const idVar = req.params.id
    User.findById(idVar)
        .then(users =>{
            if(!users){
                res.status(404).json("User does not exist")
            }else{
                res.json(users)
            }
        })
        .catch(err =>{
            res.status(500).json({message:err.message})
        })
})



server.post("/api/users",(req,res) =>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json("Error Name and Bio required")
    }else{
        User.create(newUser)
        .then(dog =>{
            res.status(201).json(dog)
        })
        .catch(err =>{
            res.status(500).json({message:err.message})
        })
    }
})



server.put("/api/users/:id", async (req,res) =>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(422).json({message:"need both name and bio values"})
        }else{
            const updateUser = await User.update(id,changes)
            if(!updateUser){
                res.status(404).json("User does not exist")
            }else{
                res.status(200).json(updateUser)
            }
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})



server.delete("/api/users/:id", async (req,res) =>{
    try{
        const {id} = req.params
        const deletedUser = await User.delete(id)
        res.status(200).json(deleteUser)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

server.use("*", (req,res) =>{
    res.status(404).json({message:"404 Not Found!!!"})
})

module.exports = {}; // EXPORT YOUR SERVER instead of {}
