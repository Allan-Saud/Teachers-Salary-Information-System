import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserStyle from "./User.module.css"
import { encodeBase64 } from '../SalaryFolder/cryptoUtils';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   



    const handleSubmit = async (e) => {
        e.preventDefault();

       

        try {
            const userResponse = await axios.post("http://localhost:9000/users", { username, password });
            if (userResponse.data.status === 200) {
                const encodedUsername = encodeBase64(username); 
                navigate(`/Detail/${encodedUsername}`);
                // navigate(`/Detail/${username}`);
            }

        } catch (error) {
            console.error('Login failed:', error.message);
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    alert('Incorrect password or Username. Please try again.');
                } else if (status === 404) {
                    alert('User not registered by Accountant');
                } else {
                    alert('An error occurred. Please try again.');
                }
            }

        }
    };









    return (
        <div className={UserStyle.formcontainer}>
            <form className={UserStyle.loginform} onSubmit={handleSubmit}>
                <h2>User Login</h2>
                <div className={UserStyle.formgroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={UserStyle.formgroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
