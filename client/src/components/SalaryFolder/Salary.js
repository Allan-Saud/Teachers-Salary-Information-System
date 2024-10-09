
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SalaryStyle from "./Salary.module.css";
import { encodeBase64 } from "./cryptoUtils";

function Salary() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { username, name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/getuser');
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [username, name]);

   

    const handleInsertClick = (username, name) => {
        const encodedUsername = encodeBase64(username);
        const encodedName = encodeBase64(name);
        navigate(`/Operation/${encodedUsername}/${encodedName}`);
    };

    const handleViewClick = (username) => {
        const encodedUsername = encodeBase64(username);
        navigate(`/ViewInd/${encodedUsername}`);
    };

    const handleMailClick = (username) => {
        const encodedUsername= encodeBase64(username);
        navigate(`/EmailSender/${encodedUsername}`);
    };

    const handleDeleteClick = async (username, status) => {
        if (status) {
            console.log("Cannot delete user with active status");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:9000/deleteuser/${username}`);
            if (response.status === 200) {
                const updatedUserData = userData.filter(user => user.username !== username);
                setUserData(updatedUserData);
                console.log("User deleted successfully");
            } else {
                console.error("Failed to delete user:", response.data.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className={SalaryStyle.container}>
           <div className={SalaryStyle.header}>
                <h3>Salary Information</h3>
                <Link to="/Adminpage">
                    <button className={SalaryStyle.returnButton}>Return</button>
                </Link>
            </div>
            {userData && (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Insert</th>
                            <th>View</th>
                            <th>Mail</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleInsertClick(user.username, user.name)}
                                    >
                                        <i className="fa-solid fa-calculator"></i> Insert
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleViewClick(user.username)}>
                                        <i className="fa-solid fa-eye"></i> View
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleMailClick(user.username, user.status)}>
                                        <i className="fa fa-envelope" aria-hidden="true"></i> Mail
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(user.username, user.status)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Salary;


