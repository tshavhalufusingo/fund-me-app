"use client";
import React from "react";
import styles from "../../page.module.css";

// Component for printing content
const PrintButton = ( htmlContent ) => {
  const handlePrint = (e) => {
    e.preventDefault();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <main className={styles.main}>
      <h1>Print Preview</h1>
      <button onClick={handlePrint} className={styles.button}>Print</button>
    </main>
  );
};

export default PrintButton;
