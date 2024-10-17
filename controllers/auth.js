const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

///////////////////////////////////////////////
const register = async (req, res) => {
    // console.log("register req.body = ", req.body); //

    const user = await User.create({ ...req.body });

    // console.log("Register - return from DB user = ", user);

    // UserSchema.pre Middleware sẽ được thực thi trong này, mã hóa PW trước khi gửi lên DB
    const token = user.createJWT();

    // test
    // res.status(StatusCodes.CREATED).json(req.body);
    // res.status(StatusCodes.CREATED).json({ user });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        token,
    });
};

// Login Controller Setup
const login = async (req, res) => {
    // console.log("login req.body = ", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password!");
    }

    const user = await User.findOne({ email });
    // console.log("login return from DB user = ", user);

    // Trường hợp có điền email và PW nhưng điền không đúng (email chẳng hạn)
    if (!user) {
        // throw new UnauthenticatedError("Invalid Credentials");
        throw new UnauthenticatedError("Invalid Email!");
    }

    //compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        // throw new UnauthenticatedError("Invalid Credentials");
        throw new UnauthenticatedError("Invalid Password!");
    }

    const token = user.createJWT();
    // console.log("login token = ", token);

    res.status(StatusCodes.OK).json({
        user: { name: user.name },
        token,
    });
};

///////////////////////////////////////////////
module.exports = { register, login };
