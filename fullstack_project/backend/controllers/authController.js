const{generateToken}=require('../utils/jwt');
const bcrypt = require("bcrypt");
const authRepository = require('../repository/authRepository');
exports.registerUser =async(req, res) => {
   try{
    const { username, email, password,phone } = req.body;
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing password
    const hashedPassword =await bcrypt.hash(password, 10);
    //creating new user
    const User = { id: users.length + 1,
      username,
      email,
        password: hashedPassword,
        phone
        }
    users.push(User);
    res.status(201).json({ message: "User registered successfully" });  
   }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
   
} ;
exports.loginUser = async(req, res) => {
  //validating user input
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
    //checking if user exists
        const user=await authRepository.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    //comparing password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    //token payload
        const payload = { userId: user.id ,
          email: user.email,
          name: user.name
        };
    //generating JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });

    }
    catch(error){
    res.status(500).json({ message: "Server error" });
    }
}

