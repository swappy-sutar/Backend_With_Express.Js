import {User} from "../models/user.model.js"
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
        
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    let hashPass;

    try {
       hashPass = await bcrypt.hash(password, 10);
    } catch (error) {
        return res.json({
            success: false,
            message: "Error hashing password"
        })
    }

    const createUser = await User.create({
        name,
        email,
        password:hashPass,
        role
    })

    return res.json({
        success: true,
        data: createUser,
        message: "User created successfully",
    })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid User",
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    user.token = token;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options);

    const { password, ...userWithoutPassword } = user._doc;

    return res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token: token,
      },
      message: "Logged in successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Password",
    });
  }
});


export { signupUser, loginUser };