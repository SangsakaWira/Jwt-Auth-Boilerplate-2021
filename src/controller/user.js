const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const user = require("../model/user")

dotenv.config()

exports.login = (req,res) =>{
    user.findOne({ $or:[{username:req.body.username}, {email:req.body.username}]},(err,doc)=>{
        if (err) return res.send({token:null,status:false,message:'Internal server error!',error:true})
        if (!doc) return res.send({token:null,status:false,message:'User not found!',error:true})
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            doc.password
        )

        if (!passwordIsValid){
            return res.send({token:null,status:false,message:'Wrong password!',error:true})
        }
            
        const token = jwt.sign({
            id:doc._id
        },
        process.env.JWT_SECRET_KEY,{expiresIn: 86400})

        res.status(200).send({
            message: 'Login success!',
            status:true,
            error:false,
            token
        })
            
    })
}

exports.register = (req,res) =>{
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    user.create({
        username:username,
        email:email,
        password: hashedPassword,
    }).then(doc=>{
        const token = jwt.sign({id:doc._id},process.env.JWT_SECRET_KEY,{expiresIn: 86400})
        res.status(200).send({
                        message: 'Register success!',
                        status:true,
                        error:false,
                        token:token
                    })
    }).catch(err=>{
        res.status(200).send({
            message: 'Register failed! Maybe username or email already taken?',
            err:err,
            status:false,
            error:true,
            token:null
        })
    })

   
}


exports.readById = (req,res) =>{
    user.findOne({_id:req.params.id}).then(doc=>{
        res.status(200).send({
            message: 'Success!',
            status:true,
            error:false,
            token:null,
            doc:doc
        })
    })
}