import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { encodeBase64,decodeBase64 } from '../SalaryFolder/cryptoUtils';
import { blue } from '@mui/material/colors';

function Detail() {
    const [viewuserSalaries, setViewSalaries] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);
    const { username: encodedUsername } = useParams();
    const username = decodeBase64(encodedUsername);

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await fetch(`/get_calculations/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setViewSalaries(data.data);

                    const total = data.data.reduce((sum, salary) => sum + salary.total_salary_received, 0);
                    setTotalSalary(total);
                } else {
                    console.error('Failed to fetch salaries');
                }
            } catch (error) {
                console.error('Error fetching salaries:', error);
            }
        };

        fetchSalaries();
    }, [username]);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return dateObj.toLocaleDateString(undefined, options);
    };

    const encryptedUsername = encodeBase64(username);
    const encryptedTotalSalary = encodeBase64(totalSalary.toString());
    const encryptedName = viewuserSalaries.length > 0 ? encodeBase64(viewuserSalaries[0].name) : '';

    return (
        <Container style={{ marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Teacher Salary Details</h2>
            <Link to="/">
                <button style={{
                    backgroundColor: blue[500],
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    marginLeft: '92%',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = blue[700]}
                onMouseOut={(e) => e.target.style.backgroundColor = blue[500]}>
                    Logout
                </button>
            </Link>
            <Card style={{ marginBottom: '20px',marginTop:"10px" }}>
                <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <strong>Username:</strong> {username}<br />
                        <strong>Name:</strong> {viewuserSalaries.length > 0 ? viewuserSalaries[0].name : ''}
                    </div>
                    <div>
                        <Link to={`/UserSalary/${encryptedUsername}?totalSalary=${encryptedTotalSalary}`}>
                            <Button variant="primary">View Profile</Button>
                        </Link>
                        <Link to={`/EmailSender2/${encryptedUsername}/${encryptedName}`}>
                            <Button variant="secondary" style={{ marginLeft: '10px' }}>Send Email</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
            <Row xs={1} md={2} lg={3} className="g-4">
                {viewuserSalaries.map((salary) => (
                    <Col key={salary._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{formatDate(salary.date)}</Card.Title>
                                <hr />
                                <Card.Text>
                                    <strong>Teaching Level:</strong> {salary.teaching_level}<br />
                                    <strong>Subject Teaching:</strong> {salary.subject_teaching}<br />
                                    <strong>Monthly Salary:</strong> {salary.monthly_salary}<br />
                                    <strong>Salary Send Per Month:</strong> {salary.salary_send_per_month}<br />
                                    <strong>Extra Period Salary:</strong> {salary.extra_period_salary}<br />
                                    <strong>Extra Period:</strong> {salary.extra_period}<br />
                                    <strong>Extra Course Teaching:</strong> {salary.extra_course_teaching}<br />
                                    <strong>Government Tax:</strong> {salary.government_tax}<br />
                                    <strong>Social Welfare:</strong> {salary.social_welfare}<br />
                                    <strong>Allowance Received:</strong> {salary.allowance_received}<br />
                                    <strong>Allowance Deduction:</strong> {salary.allowance_deduction}<br />
                                    <strong>Insurance:</strong> {salary.insurance}<br />
                                    <strong>Total Salary Received:</strong> {salary.total_salary_received}<br />
                                    <strong>Bonus:</strong> {salary.bonus}<br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Detail;



