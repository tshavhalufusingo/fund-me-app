  // pages/report-and-budget.js
  'use client'
  import { useState, useEffect, useRef } from "react";
  import Chart from "chart.js/auto";
  import { useSession } from "next-auth/react";
  import styles from "../../../page.module.css"

  export default function ReportAndBudget() {
    const [balance, setBalance] = useState(0);
    const [amountUsed, setAmountUsed] = useState(20000);
    const [successfulRecipients, setSuccessfulRecipients] = useState(0);
    const [pending, setPending] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [company , setCompany] = useState("");

    const months = ["January","February","March","April","May","June","July"];

    const [approvalDates, setapprovaldate] = useState([]);
    const [totalApplication, settotalApplications] = useState(0);

    const { data: session } = useSession();  // Destructuring session data
    const chartRef = useRef(null);
    const myChartRef = useRef(null);

    const userID = session?.user?.id;

    const getAllMonths = (jsonData) =>{
      



    }

    const getAllData = (jsonData) => {
      settotalApplications(jsonData.length);
      console.log("user id is = ",session?.user?.id);
      let pendingCount = 0;
      let successfulCount = 0;
      let rejectedCount = 0;
    
      jsonData.forEach((item) => {
        console.log(item.statusId);
      });
    
      setPending(pendingCount);
      setSuccessfulRecipients(successfulCount);
      setRejected(rejectedCount);
    };
    

    useEffect(() => {
      const fetchData = async () => { 
        if (!session) return;

        try {
          const response = await fetch(`/api/generatereport?userId=${session?.user?.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
          }

          const data = await response.json();
          getAllData(data);
      
          console.log(data);

          setBalance(data[0].fundingAmount - data[0].fundingused || balance)  ;
          console.log("balance is :", balance);
          setAmountUsed(data[0].fundingused || amountUsed);
          setSuccessfulRecipients(data.successfulRecipients || successfulRecipients);
  x
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchData();



      


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
    }, [session]);  // Depend on session to fetch data

    function download() {
      const downloadUrl = cvs.toDataURL();
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.setAttribute("download", "SketchDownload");
      a.click();
    }

    return (
      <div className={styles.main}>
        <h1 className="txt">Budget and Report</h1>
        <div className={styles.balanceContainer}>
          <h2 className="txt">Available Balance: R{balance}</h2>
        </div>
        <div className={styles.amountUsedContainer}>
          <h2>Amount Given: R{amountUsed}</h2>
        </div>
        <div className={styles.barGraphContainer}>
          <h2 className="txt">Spending in the Last 6 Months</h2>
          <canvas className="barGraph" ref={chartRef}></canvas>
        </div>
        <div className={styles.recipientsContainer}>
          <h2>Number of application: {totalApplication}</h2>
        </div>
        <div className={styles.recipientsContainer}>
          <h2>Number of Successful Application: {successfulRecipients}</h2>
        </div>
        <div className={styles.recipientsContainer}>
          <h2>Number of pending application: {successfulRecipients}</h2>
        </div>
        <div className={styles.recipientsContainer}>
          <h2>Number of rejected applications: {rejected}</h2>
        </div>
        

        <button className={styles.button}>
          Download report as a pdf 
        </button>
      </div>
    );
  }
