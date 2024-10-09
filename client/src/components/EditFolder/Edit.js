import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditStyle from "./Edit.module.css"
function Edit() {



    const { username, name, objectId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: username,
        name: name,
        extra_course_teaching: '',
        extra_period: '',
        teaching_level: '',
        subject_teaching: '',
        salary_send_per_month: '',
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



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/get_individual_calculations/${username}/${name}/${objectId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched data:', data);

                    setFormData(data.data);
                    setMonthlySalary(data.data.monthly_salary);
                    setAllowanceReceived(data.data.allowance_received);
                    setAllowanceDeduction(data.data.allowance_deduction);
                    setTotalSalaryReceived(data.data.total_salary_received);
                    setGovernmentTax(data.data.government_tax);
                    setSocialWelfare(data.data.social_welfare);
                    setInsurance(data.data.insurance);
                    setExtraPeriodSalary(data.data.extra_period_salary);
                    setBonus(data.data.bonus);

                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [username, name, objectId]);



    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/update_calculations/${username}/${name}/${objectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setMonthlySalary(updatedData.data.monthly_salary);
                setGovernmentTax(updatedData.data.government_tax);
                setSocialWelfare(updatedData.data.social_welfare);
                setAllowanceReceived(updatedData.data.allowance_received);
                setAllowanceDeduction(updatedData.data.allowance_deduction);
                setInsurance(updatedData.data.insurance);
                setTotalSalaryReceived(updatedData.data.total_salary_received);
                setExtraPeriodSalary(updatedData.data.extra_period_salary);
                setBonus(updatedData.data.bonus);


                console.log('Data updated successfully:', updatedData);
                alert("Updated successfully in the database");
                navigate(`/ViewInd/${username}`);

            } else {
                console.error('Server error');
            }

        } catch (error) {
            console.error('Client error', error);
        }
    };


    return (


        <div className={EditStyle.operationform}>
            <h2>Teacher Salary Calculator</h2>

            <table>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td><input type="text" name="username" value={formData.username} onChange={handleChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value={formData.name} onChange={handleChange} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Teaching Level</td>
                        <td>
                            <select name="teaching_level" onChange={handleChange} value={formData.teaching_level}>
                                <option value="">Select Teaching Level</option>
                                <option value="Pre-Primary">Pre-Primary</option>
                                <option value="Primary">Primary</option>
                                <option value="Lower Secondary">Lower Secondary</option>
                                <option value="Secondary">Secondary</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Subject Teaching</td>
                        <td>
                            <select name="subject_teaching" onChange={handleChange} value={formData.subject_teaching}>
                                <option value="">Select Subject Teaching</option>
                                <option value="English">English</option>
                                <option value="Maths">Maths</option>
                                <option value="Science">Science</option>
                                <option value="Social">Social</option>
                                <option value="Account">Account</option>
                                <option value="Economics">Economics</option>
                                <option value="Nepali">Nepali</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Extra Course Teaching</td>
                        <td>
                            <select name="extra_course_teaching" onChange={handleChange} value={formData.extra_course_teaching}>
                                <option value="">Select Extra Course Teaching</option>
                                <option value="Pre-Primary">Pre-Primary</option>
                                <option value="Primary">Primary</option>
                                <option value="Lower Secondary">Lower Secondary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="None">None</option>

                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Monthly Salary</td>
                        <td><input type="number" name="monthly_salary" value={monthly_salary} onChange={handleChange} readOnly />
                        </td>
                    </tr>

                    <tr>
                        <td>Extra Priod</td>
                        <td><input type="number" name="extra_period" onChange={handleChange} value={formData.extra_period} /></td>
                    </tr>



                    <tr>
                        <td>Extra Period Salary</td>
                        <td><input type="number" name="extra_period_salary" value={extra_period_salary} onChange={handleChange} readOnly />
                        </td>
                    </tr>


                    <tr>
                        <td>Salary Sent per Month</td>
                        <td><input type="number" name="salary_send_per_month" onChange={handleChange} value={formData.salary_send_per_month} /></td>
                    </tr>
                    <tr>
                        <td>Government Tax</td>
                        <td><input type="number" name="government_tax" onChange={handleChange} value={government_tax} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Social Welfare</td>
                        <td><input type="number" name="social_welfare" onChange={handleChange} value={social_welfare} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Allowance Received</td>
                        <td><input type="number" name="allowance_received" onChange={handleChange} value={allowance_received} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Allowance Deduction</td>
                        <td><input type="number" name="allowance_deduction" onChange={handleChange} value={allowance_deduction} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                        <td><input type="number" name="insurance" onChange={handleChange} value={insurance} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Bonus</td>
                        <td><input type="number" name="bonus" onChange={handleChange} value={bonus} readOnly /></td>
                    </tr>
                    <tr>
                        <td>Total Salary Received</td>
                        <td><input type="number" name="total_salary_received" onChange={handleChange} value={total_salary_received} readOnly /></td>
                    </tr>


                </tbody>
            </table>
            <button onClick={handleSubmit} className={EditStyle.btn}>Calculate and Save</button>
        </div>





    )
}

export default Edit




