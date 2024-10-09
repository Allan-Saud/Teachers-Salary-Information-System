import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminStyle from "./Admin.module.css"

function AdminForm() {

    const [username, setUname] = useState('')

    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userResponse = await axios.post("http://localhost:9000/admin", { username, password });
            if (userResponse.data.status === 200) {
                
                navigate('/Adminpage');
            }

        } catch (error) {
            console.error('Login failed:', error.message);
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    alert('Incorrect password or Username. Please try again.');
                } else if (status === 404) {
                    alert('User not registered');
                } else {
                    alert('An error occurred. Please try again.');
                }
            }

        }
    };


    return (
        <div class={AdminStyle.formcontainer}>
            <form class={AdminStyle.loginform} onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <div class="AdminStyle.form-group">
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Enter your username" required 
                        onChange={(e) => setUname(e.target.value)}
                     />

                </div>
                <div class={AdminStyle.formgroup}>
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" required
                        onChange={(e) => setPassword(e.target.value)}

                    
                    />
                </div>
                <button type="submit">Login</button>
            </form>

        </div>

    );
}

export default AdminForm;


