"use client";
import React from "react";
import styles from "../../page.module.css";

const PrintButton = (htmlContent) => {
  const handlePrint = (e) => {
    e.preventDefault();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <main className={styles.main}>
      <h1>x</h1>

      <button onClick={handlePrint}>Press</button>
    </main>
  );
};

export default PrintButton;
