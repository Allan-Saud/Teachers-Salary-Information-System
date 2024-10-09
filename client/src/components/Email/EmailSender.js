

import { decodeBase64 } from '../SalaryFolder/cryptoUtils';
import React, { useState, useEffect } from 'react';
import styles from './EmailSender.module.css';  
import { useNavigate, useParams,Link } from 'react-router-dom';

function EmailSender() {
  const [from, setFrom] = useState('saudallan99@gmail.com');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { username: encodedUsername } = useParams();

  // useEffect(() => {
  //   if (username) {
  //     setTo(username);
  //   }
  // }, [username]);

  useEffect(() => {
    if (encodedUsername) {
      const decodedUsername = decodeBase64(encodedUsername); // Decode the username
      setTo(decodedUsername);
    }
  }, [encodedUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from, to, subject, text })
      });
      if (response.ok) {
        console.log('Email sent successfully');
        alert('Email sent successfully');
        navigate("/Salary");
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Send Email</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>From:</label>
          <input className={styles.input} type="email" value={from} onChange={(e) => setFrom(e.target.value)} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>To:</label>
          <input className={styles.input} type="email" value={to} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject:</label>
          <input className={styles.input} type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Message:</label>
          <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button className={styles.button} type="submit">Send Email</button><br/>
        <Link to={"/Salary"}><button className={styles.button} type="submit">return</button></Link>
      </form>
    </div>
  );
}

export default EmailSender;

