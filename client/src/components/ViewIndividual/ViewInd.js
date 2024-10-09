import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { decodeBase64 } from '../SalaryFolder/cryptoUtils';

function ViewInd() {
    const [viewSalaries, setViewSalaries] = useState([]);
   
    const { username: encodedUsername } = useParams();
    const username=decodeBase64(encodedUsername);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await fetch(`/get_calculations/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setViewSalaries(data.data);
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

    const handleEditClick = (username, name, objectId) => {
        navigate(`/Edit/${username}/${name}/${objectId}`);
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Card style={{ marginBottom: '20px' }}>
                <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <h4>User Information</h4> */}
                    <div>
                    <strong>Name:</strong> {viewSalaries.length > 0 ? viewSalaries[0].name : ''}<br/>
                        <strong>Username:</strong> {username}
                    </div>
                    <div>
                        <Link to={"/Salary"}>
                            <Button variant="primary">return</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>

            <Row xs={1} md={2} lg={3} className="g-4">
                {viewSalaries.map((salary) => (
                    <Col key={salary._id} >
                        <Card>
                            <Card.Body>
                                <Card.Title>{formatDate(salary.date)}</Card.Title>
                                <hr />
                                <Card.Text>
                                    
                                                <strong>Teaching Level:</strong>
                                                {salary.teaching_level}<br/>
                                                <strong>Subject Teaching:</strong>
                                                {salary.subject_teaching}<br/>
                                            
                                                <strong>Monthly Salary:</strong>
                                                {salary.monthly_salary}<br/>
                                                <strong>Salary Send Per Month:</strong>
                                                {salary.salary_send_per_month}<br/>
                                            
                                                <strong>Extra Period Salary:</strong>
                                                {salary.extra_period_salary}<br/>
                                                <strong>Extra Period:</strong>
                                                {salary.extra_period}<br/>
                                                <strong>Extra Course Teaching:</strong>
                                                {salary.extra_course_teaching}<br/>
                                            
                                                <strong>Government Tax:</strong>
                                                {salary.government_tax}<br/>
                                                <strong>Social Welfare:</strong>
                                                {salary.social_welfare}<br/>
                                            
                                                <strong>Allowance Received:</strong>
                                                {salary.allowance_received}<br/>
                                                <strong>Allowance Deduction:</strong>
                                                {salary.allowance_deduction}<br/>
                                            
                                                <strong>Insurance:</strong>
                                                {salary.insurance}<br/>
                                                <strong>Total Salary Received:</strong>
                                                {salary.total_salary_received}<br/>
                                            
                                                <strong>Bonus:</strong>
                                                {salary.bonus}<br/>
                                           
                                    <Button
                                        variant="primary"
                                        className="mt-3"
                                        onClick={() => handleEditClick(username, salary.name, salary._id)}
                                    >
                                        Edit <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                    </Button>

                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ViewInd;









