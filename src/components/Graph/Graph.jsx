import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Graph.module.css';

const Graph = () => {
    const [dailyDeaths, setDailyDeaths] = useState([]);
    const [dailyInfected, setDailyInfected] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const fetchDaily = async () => {
            const dailyData = await fetchDailyData();
            setDailyDeaths(dailyData.map((data) => data.deaths));
            setDailyInfected(dailyData.map((data) => data.confirmed));
            setDates(dailyData.map(({ date }) => date));
        };

        fetchDaily();
    }, []);

    const data = {
        labels: dates,
        datasets: [{
            data: dailyInfected,
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
        }, {
            data: dailyDeaths,
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
        },]
    };

    return (
        <div className={styles.container}>
            <Line
                className={styles.chart}
                data={data}
            />
        </div>
    );
}

export default Graph;