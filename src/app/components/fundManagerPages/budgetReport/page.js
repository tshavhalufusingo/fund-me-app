// pages/report-and-budget.js
'use client'
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from './ReportAndBudget.module.css';
import { useSession } from "next-auth/react";

export default function ReportAndBudget() {
  const [balance, setBalance] = useState(100000);
  const [amountUsed, setAmountUsed] = useState(20000);
  const [successfulRecipients, setSuccessfulRecipients] = useState(11);

  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (session) {
          const response = await fetch(`/api/applicationform`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }

          const data = await response.json();
          setApplications(data.filter(application => application.postId === 2));
          console.log(data); // Log the fetched data instead of applications
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };




    const ctx = chartRef.current.getContext("2d");

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    myChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: 'Amount Spent',
            data: [5000, 5000, 2500, 2000, 2500, 4000],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="txt">Budget and Report</h1>
      <div className={styles.balanceContainer}>
        <h2 className="txt">Available Balance: R{balance}</h2>
      </div>
      <div className={styles.amountUsedContainer}>
        <h2>Amount Used: R{amountUsed}</h2>
      </div>
      <div className={styles.barGraphContainer}>
        <h2 className="txt">Spending in the Last 6 Months</h2>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className={styles.recipientsContainer}>
        <h2>Number of Successful Recipients: {successfulRecipients}</h2>
      </div>
    </div>
  );
}
