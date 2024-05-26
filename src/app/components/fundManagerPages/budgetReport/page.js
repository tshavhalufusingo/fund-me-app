"use client";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../../../page.module.css";
import GeneratePiChart from "../../graphs/generateGraph";

export default function ReportAndBudget() {
  const [balance, setBalance] = useState(0);
  const [amountUsed, setAmountUsed] = useState(20000);
  const [successfulRecipients, setSuccessfulRecipients] = useState(0);
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [monthlyApprovals, setMonthlyApprovals] = useState([]);
  const [indAmt, setindAmt] = useState(10000);
  

  const labels = ["pending", "approved", "rejected"];
  const { data: session } = useSession(); // Destructuring session data
  const chartRef = useRef(null);
  const myChartRef = useRef(null);
  const reportRef = useRef(null); // Reference for the report div
  const buttonRef = useRef(null); // Reference for the download button

  const userID = session?.user?.id;

  const getAllData = (jsonData) => {
    setTotalApplications(jsonData.length);

    let pendingCount = 0;
    let successfulCount = 0;
    let rejectedCount = 0;
    const approvals = {};

    jsonData.forEach((item) => {
      const statusId = item.statusId["0"]; // Extracting the numeric status ID
      const approvalDate = item.approvalDate
        ? new Date(item.approvalDate)
        : null;

      if (approvalDate) {
        const month = approvalDate.getMonth();
        const year = approvalDate.getFullYear();
        const key = `${year}-${month}`;
        approvals[key] = (approvals[key] || 0) + indAmt;
      }

      switch (statusId) {
        case 1:
          pendingCount++;
          break;
        case 2:
          successfulCount++;
          break;
        case 3:
          rejectedCount++;
          break;
        default:
          break;
      }
    });

    setPending(pendingCount);
    setSuccessfulRecipients(successfulCount);
    setRejected(rejectedCount);

    const approvalArray = Object.keys(approvals)
      .map((key) => ({
        key,
        value: approvals[key],
      }))
      .sort((a, b) => new Date(a.key) - new Date(b.key));

    setMonthlyApprovals(approvalArray);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          `/api/generatereport?userId=${session?.user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setindAmt(data[0].indivisualFund);
        if (data && data.length > 0) {
          getAllData(data);

          const firstItem = data[0];
          setBalance(
            firstItem.fundingAmount - firstItem.fundingused || balance
          );
          setAmountUsed(firstItem.fundingused || amountUsed);
        } else {
          console.warn("No data received or data is empty");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (monthlyApprovals.length > 0) {
      const labels = monthlyApprovals.map((item) => item.key);
      const data = monthlyApprovals.map((item) => item.value);

      myChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Approval Count",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
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
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [monthlyApprovals]);

  const downloadPDF = () => {
    const input = reportRef.current;
    const button = buttonRef.current;
    button.classList.add(styles.hidden); // Hide the button

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Set to A4 size with portrait orientation
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
      button.classList.remove(styles.hidden); // Show the button again
    });
  };

  return (
    <div className={styles.main} ref={reportRef}>
      <h1 className="txt">Budget and Report</h1>
      <div className={styles.balanceContainer}>
        <h2 className="txt">Available Balance: R{balance}</h2>
      </div>
      <div className={styles.amountUsedContainer}>
        <h2>Amount Given: R{indAmt * successfulRecipients}</h2>
      </div>
      <div className={styles.barGraphContainer}>
        <h2 className="txt">Spending in the Last 6 Months</h2>
        <canvas className="barGraph" ref={chartRef}></canvas>
      </div>
      <div className={styles.recipientsContainer}>
        <h2>Number of applications: {totalApplications}</h2>
      </div>
      <div className={styles.recipientsContainer}>
        <h2>Number of Successful Applications: {successfulRecipients}</h2>
      </div>
      <div className={styles.recipientsContainer}>
        <h2>Number of Pending Applications: {pending}</h2>
      </div>
      <div className={styles.recipientsContainer}>
        <h2>Number of Rejected Applications: {rejected}</h2>
      </div>

      <div className={styles.recipientsContainer}>
        <GeneratePiChart
          labels={labels}
          data={[pending, successfulRecipients, rejected]}
        />
      </div>

      <button className={styles.button} ref={buttonRef} onClick={downloadPDF}>
        Download report as a pdf
      </button>
    </div>
  );
}