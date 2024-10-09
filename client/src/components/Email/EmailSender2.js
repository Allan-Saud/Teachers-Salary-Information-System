import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './EmailSender2.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { decodeBase64 } from '../SalaryFolder/cryptoUtils';

function EmailSender2() {
    const form = useRef();
    const navigate = useNavigate();
    const { username, name } = useParams();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (username) {
            setUserEmail(decodeBase64(username));
        }
        if (name) {
            setUserName(decodeBase64(name));
        }
    }, [username, name]);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_avca33v', 'template_8c4w1rw', form.current, 'JbPj6v1Dd4kFtUfII')
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert("Successfully sent email to admin");
                    navigate(`/Detail/${username}`);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" name="user_name" className={styles.input} value={userName} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" name="user_email" className={styles.input} value={userEmail} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea name="message" className={styles.textarea} />
            </div>
            <input type="submit" value="Send" className={styles.button} /><br/>
            <Link to={`/Detail/${username}`}><button>return</button></Link>

        </form>
    );
}

export default EmailSender2;
