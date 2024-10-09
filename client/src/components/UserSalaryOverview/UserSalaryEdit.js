import { decodeBase64, encodeBase64 } from '../SalaryFolder/cryptoUtils';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './UserSalaryEdit.module.css'; // Import CSS module

function UserSalaryEdit() {
  const location = useLocation();
  const totalSalaryEncoded = new URLSearchParams(location.search).get('totalSalary');
  const { username: encodedUsername } = useParams();
  
  const username = decodeBase64(encodedUsername);
  const totalSalary = decodeBase64(totalSalaryEncoded);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [updatedImg, setUpdateImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/getuser/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [username]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      image: e.target.files[0],
    });
    setUpdateImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('name', userData.name);
      formData.append('gender', userData.gender);
      formData.append('panNumber', userData.panNumber);
      formData.append('accountNumber', userData.accountNumber);
      formData.append('image', userData.image);
      const response = await axios.patch(`http://localhost:9000/updateuser/${username}`, formData);
      if (response.status === 200) {
        const encodedUsername = encodeBase64(userData.username);
        const encodedTotalSalary = encodeBase64(totalSalary); 
        navigate(`/UserSalary/${encodedUsername}?totalSalary=${encodedTotalSalary}`);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className={styles.userCard}>
      <div className={styles.userPhoto}>
        {updatedImg ? (
          <img src={updatedImg} alt="User" />
        ) : (
          <img src={`/Images/${userData.image}`} alt="User" />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.userInfo}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={userData.accountNumber}
            onChange={handleInputChange}
            placeholder="Account Number"
          />
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default UserSalaryEdit;
