import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OperationDetails() {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        const fetchOperations = async () => {
            try {
               
                const response = await axios.get('http://localhost:9000/get_calculations');
                setOperations(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching operations:', error);
                
            }
        };

        
        fetchOperations();
    }, []); 

    return (
        <div className="table-container">
          
            {operations.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Teaching Level</th>
                            <th>Subject Teaching</th>
                            <th>Salary Send Per Month</th>
                            <th>Monthly Salary</th>
                            <th>Date</th>
                            <th>Government Tax</th>
                            <th>Social Welfare</th>
                            <th>Allowance Received</th>
                            <th>Allowance Deduction</th>
                            <th>Insurance</th>
                            <th>Total Salary Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {operations.map((operation, index) => (
                            <tr key={index}>
                                <td>{operation.name}</td>
                                <td>{operation.teaching_level}</td>
                                <td>{operation.subject_teaching}</td>
                                <td>{operation.salary_send_per_month}</td>
                                <td>{operation.monthly_salary}</td>
                                <td>{operation.date}</td>
                                <td>{operation.government_tax}</td>
                                <td>{operation.social_welfare}</td>
                                <td>{operation.allowance_received}</td>
                                <td>{operation.allowance_deduction}</td>
                                <td>{operation.insurance}</td>
                                <td>{operation.total_salary_received}</td>
                                <td>
                                   
                                    <button><i className="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* //{operations.length === 0 && <p>Loading...</p>} */}
        </div>
    );
}

export default OperationDetails;
