
const adminModel = require('../Model/AdminSchema');


const Admins = async (req, res) => {
  try {
      const { username, password } = req.body;

    
      const existingUser = await adminModel.findOne({ username });

      if (existingUser) {
         
          if (password === existingUser.password) {
              
              return res.status(200).json({ status: 200, message: 'Login successful' });
          } else {
             
              return res.status(401).json({ status: 401, message: 'Incorrect password' });
          }
      }
         
      
      return res.status(404).json({ status: 404, message: 'Admin not registered' });

  } catch (error) {
      console.error('Login failed:', error.message);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }

};


const getAdmin=async (req, res) => {
  try {
    const userdata = await adminModel.find();
    res.status(200).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};





module.exports = { Admins ,getAdmin};