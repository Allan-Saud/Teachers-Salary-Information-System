

import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import RegisterStyle from './Register.module.css';

const Register = () => {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            alert("Passwords do not match");
            return;
        }

        let formData = new FormData();

        formData.append("username", uname);
        formData.append("password", password);
        formData.append("confirmPassword", confirmpassword);
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("panNumber", panNumber);
        formData.append("accountNumber", accountNumber);
        formData.append("image", image);

        axios.post("http://localhost:9000/register", formData)
            .then(result => {
                console.log("Registration successful:", result);
                alert("Registered successfully!");
                alert("Data stored in the database!");
                navigate("/Adminpage");
            })
            .catch(error => {
                console.error("Registration failed:", error);
                alert(`Registration failed: ${error.response.data.message}`);
            });
    };

    return (
        <div className={RegisterStyle.container}>
            <form className={RegisterStyle.registrationform} onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                
                <div className={RegisterStyle.formGroup}>
                    <div className={RegisterStyle.formRow}>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="Username">User Name</label>
                            <input
                                type="text"
                                id="Username"
                                name="Username"
                                placeholder="Enter your username"
                                required
                                onChange={(e) => setUname(e.target.value)}
                            />
                        </div>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={RegisterStyle.formRow}>
                        <div className={RegisterStyle.formItem}>
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
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={RegisterStyle.formRow}>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="panNumber">PAN Number</label>
                            <input
                                type="text"
                                id="panNumber"
                                name="panNumber"
                                placeholder="Enter PAN Number"
                                required
                                onChange={(e) => setPanNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={RegisterStyle.formRow}>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="accountNumber">Account Number</label>
                            <input
                                type="text"
                                id="accountNumber"
                                name="accountNumber"
                                placeholder="Enter Account Number"
                                required
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </div>
                        <div className={RegisterStyle.formItem}>
                            <label htmlFor="image">Profile Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(e) => {
                                    const img = e.target.files[0];
                                    setImage(img);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={RegisterStyle.checkboxGroup}>
                    <label htmlFor="checkbox">
                        <input type="checkbox" id="checkbox" name="terms" required />
                        I agree to the terms and conditions
                    </label>
                </div>

                <button type="submit">Register</button><br/>
                <Link to={"/Adminpage"}><button type="submit2" >return</button></Link>
            </form>
        </div>
    );
};

export default Register;





