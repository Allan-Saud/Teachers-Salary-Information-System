import React, { useState, useEffect } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ViewStyle from "./View.module.css";

function View() {
    const [teachingLevels, setTeachingLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    Chart.register(ArcElement);

    useEffect(() => {
        const fetchTeachingLevels = async () => {
            try {
                const response = await axios.get('/get_calculations_level');
                if (response.status === 200) {
                    setTeachingLevels(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching teaching levels:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeachingLevels();
    }, []);

    const totalTeachers = teachingLevels.reduce((accumulator, level) => accumulator + level.value, 0);

    return (
        <div className={ViewStyle.piechartcontainer}>
            <div className={ViewStyle.chartcontainer}>
                <h3>Distribution of Teaching Levels</h3>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <PieChart data={teachingLevels} />
                )}
            </div>
            <div className={ViewStyle.tablecontainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Teaching Level</th>
                            <th>Percentage</th>
                            <th>Number of Teachers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachingLevels.map((level, index) => (
                            <tr key={index} style={{ backgroundColor: getColor(index), fontWeight: 'bold' }}>
                                <td>{level.label}</td>
                                <td>{((level.value / totalTeachers) * 100).toFixed(2)}%</td>
                                <td>{level.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={ViewStyle.buttonContainer}>
                <button onClick={() => navigate('/Adminpage')} style={{
                        marginLeft: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}>return</button>
            </div>
        </div>
    );
}

function PieChart({ data }) {
    const labels = data.map(level => level.label);
    const values = data.map(level => level.value);

    const pieData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    'rgb(224, 99, 71)',     // Solid Dark Red
                    'rgba(0, 0, 139, 0.6)',   // Dark Blue
                    'rgba(184, 134, 11, 0.6)', // Dark Goldenrod (Dark Yellow)
                    'rgba(0, 100, 0, 0.6)',    // Dark Green
                ],
            },
        ],
    };

    return <Pie data={pieData} />;
}

function getColor(index) {
    const colors = [
        'rgb(224, 99, 71)',     // Solid Dark Red
        'rgba(0, 0, 139, 0.6)',   // Dark Blue
        'rgba(184, 134, 11, 0.6)', // Dark Goldenrod (Dark Yellow)
        'rgba(0, 100, 0, 0.6)',    // Dark Green
    ];
    return colors[index % colors.length];
}

export default View;
