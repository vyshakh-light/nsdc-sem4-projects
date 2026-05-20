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
   
} 
