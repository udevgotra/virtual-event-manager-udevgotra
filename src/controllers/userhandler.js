require('dotenv').config()


const usermodel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const saltRounds = 10//process.env.saltRounds
const JWT_SECRET = process.env.JWT_SECRET


const registerUser = (req, res) => {


    console.log("[Handler] POST registerUser")
    try {
        const newUser = req.body
        const isUserExist = usermodel.find((user) => user.email === newUser.email)

        if (isUserExist) {
            console.log("[Handler] POST registerUser: User already exists")
            return res.status(200).json("User already exists!")
        }


        newUser.password = bcrypt.hashSync(newUser.password, saltRounds)
        newUser.id = usermodel.length + 1
        if (newUser.role === undefined) newUser.role = "user"
        usermodel.push(newUser)
        console.log("[Handler] POST registerUser: newUser", newUser)
        console.log("[Handler] POST registerUser: User registered successfully!")


        res.status(201).json("User registered successfully!")


    } catch (err) {
        console.error("[Handler] POST registerUser: Error:", err)
        res.status(500).json(newUser)
    }
}
const loginUser = (req, res) => {


    console.log("[Handler] POST loginUser")
    const newUser = req.body
    try {
        const doesUserExists = usermodel.find((user) => user.email === newUser.email)

        if (!doesUserExists) {
            console.error("[Handler] POST loginUser: User does not exist!, Please register yourself")
            return res.status(200).json("User does not exist!, Please register yourself")
        }
        console.log("[Handler] POST loginUser: Matching Password...")
        const isPasswordMatched = bcrypt.compareSync(newUser.password, doesUserExists.password)


        if (!isPasswordMatched) {
            console.error("[Handler] POST loginUser: Incorrect Password")
            console.error("[Handler] POST loginUser: Logging failed")
            return res.status(200).json("Incorrect Password")
        }
        console.log("[Handler] POST loginUser: Password Matched!!")
        console.log("[Handler] POST loginUser: User logged in successfully!")


        //generating token
        const token = jwt.sign({ email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`[Handler] POST loginUser: token: ${token}`)
        return res.status(200).send({ token: token })


    } catch (err) {
        console.error("[Handler] POST loginUser: Error:", err)
        res.status(500).json(newUser)
    }
}


module.exports = { registerUser, loginUser }
