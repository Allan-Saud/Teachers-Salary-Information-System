import { decodeBase64 } from '../SalaryFolder/cryptoUtils';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OperationStyle from "./Operation.module.css";

function Operation() {
  const { username: encodedUsername, name: encodedName } = useParams();

  // Decode the parameters
  const username = decodeBase64(encodedUsername);
  const name = decodeBase64(encodedName);

  const [formData, setFormData] = useState({
    username: username,
    name: name,
    date: '',
    teaching_level: '',
    subject_teaching: '',
    extra_course_teaching: '',
    extra_period: 0,
    salary_send_per_month: 1,
  });

  const [monthly_salary, setMonthlySalary] = useState(0);
  const [allowance_received, setAllowanceReceived] = useState(0);
  const [allowance_deduction, setAllowanceDeduction] = useState(0);
  const [total_salary_received, setTotalSalaryReceived] = useState(0);
  const [government_tax, setGovernmentTax] = useState(0);
  const [social_welfare, setSocialWelfare] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [extra_period_salary, setExtraPeriodSalary] = useState(0);
  const [bonus, setBonus] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      setFormData({ ...formData, date: value, formattedDate: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:9000/calculations', formData);

      if (response.status === 200) {
        alert("Teacher's information has been saved in the database");
        const { total_salary_received } = response.data.data;
        setTotalSalaryReceived(total_salary_received);
      }

      if (response.status === 400) {
        alert("You are not a Teacher");
      }

      if (response.data && response.data.status === 200) {
        const data = response.data.data;

        const {
          monthly_salary,
          bonus,
          allowance_received,
          allowance_deduction,
          total_salary_received,
          extra_period_salary,
          government_tax,
          social_welfare,
          insurance,
        } = data;

        setMonthlySalary(monthly_salary);
        setAllowanceReceived(allowance_received);
        setAllowanceDeduction(allowance_deduction);
        setTotalSalaryReceived(total_salary_received);
        setGovernmentTax(government_tax);
        setSocialWelfare(social_welfare);
        setInsurance(insurance);
        setExtraPeriodSalary(extra_period_salary);
        setBonus(bonus);
      } else {
        console.error('Server error');
      }
    } catch (error) {
      console.error('Client error', error);
    }
  };

  return (
    <Container className={OperationStyle.operation_form}>
      <h2>Teacher Salary Calculator</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm="4">Username</Form.Label>
          <Col sm="8">
            <Form.Control type="text" name="username" value={formData.username} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="4">Name</Form.Label>
          <Col sm="8">
            <Form.Control type="text" name="name" value={formData.name} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTeachingLevel">
          <Form.Label column sm="4">Teaching Level</Form.Label>
          <Col sm="8">
            <Form.Control as="select" name="teaching_level" value={formData.teaching_level} onChange={handleChange}>
              <option value="">Select Teaching Level</option>
              <option value="Pre-Primary">Pre-Primary</option>
              <option value="Primary">Primary</option>
              <option value="Lower Secondary">Lower Secondary</option>
              <option value="Secondary">Secondary</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSubjectTeaching">
          <Form.Label column sm="4">Subject Teaching</Form.Label>
          <Col sm="8">
            <Form.Control as="select" name="subject_teaching" value={formData.subject_teaching} onChange={handleChange}>
              <option value="">Select Subject Teaching</option>
              <option value="English">English</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="Social">Social</option>
              <option value="Account">Account</option>
              <option value="Economics">Economics</option>
              <option value="Nepali">Nepali</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExtraCourseTeaching">
          <Form.Label column sm="4">Extra Course Teaching</Form.Label>
          <Col sm="8">
            <Form.Control as="select" name="extra_course_teaching" value={formData.extra_course_teaching} onChange={handleChange}>
              <option value="">Select Extra Course Teaching</option>
              <option value="Pre-Primary">Pre-Primary</option>
              <option value="Primary">Primary</option>
              <option value="Lower Secondary">Lower Secondary</option>
              <option value="Secondary">Secondary</option>
              <option value="None">None</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSalarySendPerMonth">
          <Form.Label column sm="4">Salary Sent per Month</Form.Label>
          <Col sm="8">
            <Form.Control type="number" name="salary_send_per_month" value={formData.salary_send_per_month} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExtraPeriod">
          <Form.Label column sm="4">Extra Period</Form.Label>
          <Col sm="8">
            <Form.Control type="number" name="extra_period" value={formData.extra_period} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDate">
          <Form.Label column sm="4">Date</Form.Label>
          <Col sm="8">
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            <Form.Text>{formData.formattedDate}</Form.Text>
          </Col>
        </Form.Group>

        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Monthly Salary</td>
              <td><Form.Control type="number" name="monthly_salary" value={monthly_salary} readOnly /></td>
            </tr>
            <tr>
              <td>Extra Period Salary</td>
              <td><Form.Control type="number" name="extra_period_salary" value={extra_period_salary} readOnly /></td>
            </tr>
            <tr>
              <td>Government Tax</td>
              <td><Form.Control type="number" name="government_tax" value={government_tax} readOnly /></td>
            </tr>
            <tr>
              <td>Social Welfare</td>
              <td><Form.Control type="number" name="social_welfare" value={social_welfare} readOnly /></td>
            </tr>
            <tr>
              <td>Allowance Received</td>
              <td><Form.Control type="number" name="allowance_received" value={allowance_received} readOnly /></td>
            </tr>
            <tr>
              <td>Allowance Deduction</td>
              <td><Form.Control type="number" name="allowance_deduction" value={allowance_deduction} readOnly /></td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td><Form.Control type="number" name="insurance" value={insurance} readOnly /></td>
            </tr>
            <tr>
              <td>Bonus Received</td>
              <td><Form.Control type="number" name="bonus" value={bonus} readOnly /></td>
            </tr>
            <tr>
              <td>Total Salary Received</td>
              <td><Form.Control type="number" name="total_salary_received" value={total_salary_received} readOnly /></td>
            </tr>
          </tbody>
        </Table>

        <Button variant="primary" type="submit">Calculate</Button>
      </Form>
      <Link to="/Salary" className="btn btn-success" style={{marginTop:"5px"}}>
          Go Back
       </Link>
    </Container>
  );
}

export default Operation;







