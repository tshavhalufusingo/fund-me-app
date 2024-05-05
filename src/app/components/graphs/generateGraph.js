'use client'
import React, { Fragment, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../../styles.css";


function GeneratePiChart({ labels, data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to hold the chart instance

  useEffect(() => {
    const createPieChart = () => {
      if (chartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'purple',
                'orange'
              ],
              borderColor: 'white',
              borderWidth: 2
            }]
          },
          options: {
            responsive: false,
            maintainAspectRatio: false
          }
        });
      }
    };

    createPieChart();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, data]);

  return (
    <Fragment>
      <canvas className="pichart" ref={chartRef} width="400" height="400"></canvas>
    </Fragment>
  );
}

export default GeneratePiChart;
