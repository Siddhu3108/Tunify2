
import express from 'express';
const router = express.Router();
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import getToken from '../utils/helpers.js'

// This POST route will help to register a user
router.post("/register", async (req, res) => {
    // This code is run when the /register api is called as a POST request

    // My req.body will be of the format {email, password, firstName, lastName, username }
    const {firstName, lastName,email, password } = req.body;
    console.log(req.body);

    // Step 2 : Does a user with this email already exist? If yes, we throw an error.
    console.log(email,password)
    const user = await User.findOne({email: email});
    if (user) {
        // status code by default is 200
        return res
            .status(403)
            .json({error: "A user with this email already exists"});
    }
    // This is a valid request

    // Step 3: Create a new user in the DB
    // Step 3.1 : We do not store passwords in plain text.
    // xyz: we convert the plain text password to a hash.
    // xyz --> asghajskbvjacnijhabigbr
    // My hash of xyz depends on 2 parameters.
    // If I keep those 2 parameters same, xyz ALWAYS gives the same hash.
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUserData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);

    // Step 4: We want to create the token to return to the user
    const token = await getToken(email, newUser);

    // Step 5: Return the result to the user
    const userToReturn = {...newUser.toJSON(), token};
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    // Step 1: Get email and password sent by user from req.body
    const {email, password} = req.body;

    // Step 2: Check if a user with the given email exists. If not, the credentials are invalid.
    //const user = await User.findOne({email: email});
    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    // Step 3: If the user exists, check if the password is correct. If not, the credentials are invalid.
    // This is a tricky step. Why? Because we have stored the original password in a hashed form, which we cannot use to get back the password.
    // I cannot do : if(password === user.password)
    // bcrypt.compare enabled us to compare 1 password in plaintext(password from req.body) to a hashed password(the one in our db) securely.
    const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
    // This will be true or false.
    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    // Step 4: If the credentials are correct, return a token to the user.
    const token = await getToken(user.email, user);
    // res.cookie("token", token, {
    //     maxAge: 15 * 24 * 60 * 60 * 1000,
    //     httpOnly:false,
    //     sameSite: "strict",
    //     path: "/",
    //   });
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.get("/logout" , async(req,res)=>{

    // res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged Out Successfully",
  });

});





export default router;
