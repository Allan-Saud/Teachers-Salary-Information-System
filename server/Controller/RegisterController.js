const bcrypt = require('bcrypt');
const registerModel = require('../Model/RegisterSchema');
const operationModel=require("../Model/OperationSchema");
// const senderModel=require("../Model/SenderSchema")
const fs = require('fs');
const path = require('path');

const registerUser = async (req, res) => {
  try {
    const { username, password, confirmPassword, name, gender, panNumber, accountNumber } = req.body;
    const image= req.file ? req.file.filename:"";
    const ext = image.split(".").pop();
    if (image === undefined || image === null || image === "") {
      return res.status(400).json({ error: "Image filed is empty" });
    } else if (
      ext !== "PNG" &&
      ext !== "JPG" &&
      ext !== "GIF" &&
      ext !== "JFIF" &&
      ext !== "png" &&
      ext !== "jpg" &&
      ext !== "gif" &&
      ext !== "jfif"
    ) {
      return res.status(400).json({
        error: "Please upload an image in PNG, JPG, JFIF, or GIF format.",
      });
    }

    const existingPanUser = await registerModel.findOne({ panNumber });
    if (existingPanUser) {
      return res.status(400).json({ message: 'PAN number is already registered' });
    }
    const existingAccountUser = await registerModel.findOne({ accountNumber });
    if (existingAccountUser) {
      return res.status(400).json({ message: 'Account number is already registered' });
    }



    const existingUser = await registerModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    console.log("Here is the data",existingUser);


    if (!isEmail(username)) {
      console.log(username);
      return res.status(400).json({ message: 'Invalid username format' });
    }

   

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Invalid password format' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new registerModel({
      username,
      // password:hashedPassword,
      password,
      name,
      gender,
      panNumber,
      accountNumber,
      image
    });

    // const credentials=new senderModel({
    //   username,
    //   password
    // })


    await newUser.save();
    // await credentials.save();

    return res.status(201).json({ message: 'User registered successfully',imageUrl: req.file.filename });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function isStrongPassword(str) {
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(str);
}

const getUser = async (req, res) => {
  try {
    const userdata = await registerModel.find();
   return  res.status(200).json(userdata);

  } catch (error) {
     return res.status(422).json({ message: error.message });
  }
};


const getUserData = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = await registerModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      username: user.username,
      name: user.name,
      gender: user.gender, 
      panNumber: user.panNumber,
      accountNumber: user.accountNumber, 
      image: user.image,
    };

    return res.status(200).json(userData);
    
  } catch (error) {
    
    return res.status(500).json({ message: 'Internal server error' });
    
  }
};

const sanitizeFileName = (filename) => {
  // Replacing special characters with underscores as special character such as #@ in image name cant be read 
  return filename.replace(/[^\w.-]/g, '_');
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { name, gender, accountNumber } = req.body;
  console.log("body: ", req.body);

  const sanitizedFileName = sanitizeFileName(req.file ? req.file.filename : '');
  console.log("Sanitized file name: ", sanitizedFileName);

  try {
    const user = await registerModel.findOne({ username });
    if (!user) {
      console.log("no user found");
      return res.status(404).json({ message: 'User not found' });
    }

    if (sanitizedFileName && user.image) {
      const imagePath = path.join(__dirname, '..', 'Images', sanitizeFileName(user.image));
      fs.unlinkSync(imagePath);
    }

    user.name = name;
    user.gender = gender;
    user.accountNumber = accountNumber;
    user.image = sanitizedFileName || user.image;

    await user.save();

    return res.status(200).json({ message: 'User data updated successfully', user });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
      const { username } = req.params;

      const user = await registerModel.findOneAndDelete({ username });

      if (user) {
          await operationModel.deleteMany({ username });

          return res.status(200).json({ status: 200, message: 'User and associated operations deleted successfully' });
      } else {
          return res.status(404).json({ status: 404, message: 'User not found' });
      }
  } catch (error) {
      console.error('Failed to delete user and operations:', error.message);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};






module.exports = { registerUser, getUser, getUserData, updateUser, deleteUser };
