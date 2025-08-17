import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import dotenv from "dotenv";  
dotenv.config(); // Load environment variables
// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User Doesn't exist"})    
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    return jwt.sign({id},process.env.JWT_SECRET)
}
 
// register user
// const registerUser = async (req,res) => {
//     const {name,password,email} = req.body;
//     try {
//         // checking is user already exists
//         const exists = await userModel.findOne({email})
//         if (exists) {
//             return res.json({success:false,message:"User already exists"})
//         } 

//         // validating email format and strong password
//         if (!validator.isEmail(email)){
//             return res.json({success:false,message:"Please enter a valid email"})
//         }

//         if (password.length<8) {
//             return res.json({success:false,message:"Please enter a strong password"})
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const newUser = new userModel({
//             name:name,
//             email: email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()
//         const token = createToken(user._id)
//         res.json({success:true,token});
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})    
//     }
// };

const registerUser = async (req, res) => {
    console.log("Request body:", req.body); // Add this line to debug

    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        } 

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "Error" });
    } 
};


export {loginUser,registerUser}

// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
    
//     try {
//         // Checking if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validating email format and strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hashing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Generate token before saving the user
//         if (!process.env.JWT_SECRET) {
//             return res.json({ success: false, message: "Server error: JWT secret missing" });
//         }

//         const token = createToken(user._id);  // Now JWT_SECRET is ensured

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         const user = await newUser.save();

//         res.json({ success: true, token });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };