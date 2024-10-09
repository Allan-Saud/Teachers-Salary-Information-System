import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import './UserSalary.css';
import { decodeBase64,encodeBase64 } from '../SalaryFolder/cryptoUtils';
function UserSalary() {
  const location = useLocation();
  // const totalSalary = new URLSearchParams(location.search).get('totalSalary');
  const { username:encodedUsername } = useParams();
  const username=decodeBase64(encodedUsername);
  const encodedTotalSalary = new URLSearchParams(location.search).get('totalSalary');
    const totalSalary = decodeBase64(encodedTotalSalary);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    const encodedUsername = encodeBase64(username);
    const encodedTotalSalary = encodeBase64(totalSalary);
    navigate(`/UserSalaryEdit/${encodedUsername}?totalSalary=${encodedTotalSalary}`);
  };

  const encodedReturnUsername = encodeBase64(userData.username);

  return (
    <div className="user-card">
      <div className="user-photo">
        {userData.image && <img src={`/Images/${userData.image}`} alt="User" />}
      </div>
      <div className="user-info">
        <p className="info-item">Name: {userData.name}</p>
        <p className="info-item">Username: {userData.username}</p>
        <p className="info-item">Gender: {userData.gender}</p>
        <p className="info-item">PAN Number: {userData.panNumber}</p>
        <p className="info-item">Account Number: {userData.accountNumber}</p>
        <p className="info-item">Total Salary Received: {totalSalary}</p>
        <div className="button-group">
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
          <Link to={`/Detail/${encodedReturnUsername}`}><button className="return-button">Return</button></Link>
        </div>
      </div>
    </div>
  );
}

export default UserSalary;
