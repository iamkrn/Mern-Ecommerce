const Contact = require("../models/contact.model")


exports.sendMessage = async(req,res)=>{

    try {
        const {name, email, message} = req.body;
        if(!name || !email || !message){
         return res.status(400).json({message: "All fields are required"})
        }

        const newMessage  = new Contact({name, email, message});
        newMessage.save();
        res.status(200).json({message: "Message saved successfully"})


    } catch (error) {
        console.log(error, "error is comming")
        res.status(201).json({message : error.message})
        
    }
}