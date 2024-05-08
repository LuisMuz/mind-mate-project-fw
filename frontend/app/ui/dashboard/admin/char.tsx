'use client'

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
    data: number[];
    labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Diary  Entries',
                            data: data,
                            fill: false,
                            borderColor: '#61C0BF',
                            borderWidth: 1,
                            pointRadius: 5,
                            pointBackgroundColor: '#FAE3D9',
                            pointBorderColor: '#444',
                            pointHoverRadius: 8,
                            pointHoverBackgroundColor: '#FAE3D9',
                            pointHoverBorderColor: '#fff'
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    }, [data, labels]);

    return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
