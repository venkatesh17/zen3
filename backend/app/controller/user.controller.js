const User = require('../models/user.model')

exports.getall = async(req, res)=>{
    User.find().then(data=>{
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4001');
        res.send({
            message: "Success",
            data: data
        })
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Something went wrong"
        })
    })
}

exports.create = async(req, res)=>{
    const user=new User({
        Name: req.body.Name,
        Type: req.body.Type,
        Favorite: req.body.Favorite
    })
    user.save().then(data=>{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send({
            message: "Success",
            data: data
        })
        console.log("data......",data)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Something went wrong"
        })
    })
}

exports.deleteByid = async(req,res)=>{
    console.log( req.body )
    User.findByIdAndDelete(
        {"_id":req.body.userId})
        .then(data=>{
            if(!data){
                return res.status(404).send({
                    message: "User not found with id "+ req.params.noteId
                })
            }
            res.send({ 
                message: "User deleted successfully!",
                data: data
            })
            
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Something went wrong"
            })
        })
}






exports.update = async(req, res)=>{
    const product = {Product:req.body.Product}
    const cost = {Cost:req.body.Cost}
    Product.findOneAndUpdate(
           product, cost,
            {new: true, upsert: true}  
    ).then(data=>{
        res.send({
            message: "Success",
            data: data
        })
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Something went wrong"
        })
    })
}

exports.replace = async(req, res)=>{
    Product.findOneAndReplace(
        {Cost: {$eq:50}},
        {Product: req.body.Product, Cost: 10},
        {   sort: { Cost : 1 }, 
            new : true,
            project: { "_id" : 0, Product : 1 },
            maxTimeMS: 5,
            upsert: true 
         }
    ).then(data=>{
        res.send({
            message: "Success",
            data: data
        })
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Something went wrong"
        })
    })
}

exports.delete = async(req, res)=>{
    Product.findOneAndDelete(
        {Name:req.body.Name},
    ).then(data=>{
        res.send({
            message: "Success",
            data: data
        })
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Something went wrong"
        })
    })
}