//const userModel = require('../Model/UsersSchema'); // Use the correct model here
const registerModel=require("../Model/RegisterSchema")
const bcrypt = require("bcrypt")


const Users = async (req, res) => {
    

    try {
        const { username, password} = req.body;

        

        // Check if the username exists in the database
        const existingUserInregister = await registerModel.findOne({ username });

        if (existingUserInregister) {


            // Compare the provided password with the stored password
            if (password === existingUserInregister.password) {
        
        
                //const existuserinUsers = await userModel.findOne({ username });

                //if (!existuserinUsers) {
                 //   const newUser = new userModel({ username, password});

                   //  await newUser.save();
                   

               // }

                // Passwords match, return a success response
                return res.status(200).json({ status: 200, message: 'Login successful' });


            }

            else {
                // Passwords do not match, return an error response
                return res.status(401).json({ status: 401, message: 'Incorrect password' });
            }
        }



        // If the user does not exist, return an error response
        return res.status(404).json({ status: 404, message: 'User not registered' });

    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }


};



const getUsers=async (req, res) => {
    try {
        const users = await registerModel.find();

        return res.status(200).json({ status: 200, data: users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}


const getIndividual=async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        return res.status(200).json({ status: 200, data: user });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}


const updateUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        const { _id, ...updatedData } = req.body;

        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        // Also update the user in the "register" collection
        await registerModel.updateOne({ username: user.username }, { $set: updatedData });

        return res.status(200).json({ status: 200, message: 'User updated successfully', data: user });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}




// const deleteUser = async (req, res) => {
//     try {
//         const { username } = req.params;

//         const user = await registerModel.findOneAndDelete({ username });

//         if (user) {
//             return res.status(200).json({ status: 200, message: 'User deleted successfully' });
//         } else {
//             return res.status(404).json({ status: 404, message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Failed to delete user:', error.message);
//         res.status(500).json({ status: 500, message: 'Internal Server Error' });
//     }
// };

module.exports = { Users,getUsers ,getIndividual,updateUsers};





























// const Users = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the username exists in the database
//         const existingUser = await userModel.findOne({ username });

//         if (existingUser) {
//             // If the user exists, compare the provided password with the stored hashed password

//             //const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

//              // if (isPasswordMatch) {
//             //     // Passwords match, return a success response
//             //     return res.status(200).json({ message: 'Login successful' });
//             // } 

//             if (password === existingUser.password) {
//                 // Passwords match, return a success response
//                 return res.status(200).json({ status: 200, message: 'Login successful' });

//             }


//             else {
//                 // Passwords do not match, return an error response
//                 return res.status(401).json({ status: 401, message: 'Incorrect password' });
//             }
//         }

//         // If the user does not exist, return an error response
//         return res.status(404).json({ status: 404, message: 'User not registered' });

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ status: 500, message: 'Internal Server Error' });
//     }
// };


