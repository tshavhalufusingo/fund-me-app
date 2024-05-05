'use client'
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import styles from "./../../../page.module.css"
import { useSession } from "next-auth/react";
import GeneratePiChart from "./../../graphs/generateGraph";
export default function getAmountUsed() {
  const { data: session } = useSession(); // Destructure the data property from useSession

  const userid = session?.user.id;
  const labelsForBalance = ["Amount Used", "Amount available"]
  const amounts = [10000, 0];
  const [usedAmount, setUsedAmount] = useState(0.00);
  let funcdingused;
  let totalFunding;

  const funds = {

  }

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/graphdata/graphcompanies");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setJsonData(jsonData); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);   
      }
    }

    fetchData();
  }, [session]); 



  const results =jsonData;


  try{
    for(let i = 0; i < jsonData.length; i++){
      let companyname = jsonData[i];
      let fundingAmo = jsonData[i].fundingAmount;
      console.log(jsonData[i]);
    }
  
  }
  catch(e){
    console.log(e);
  }
  
  return (
    <main className={styles.main}>
      <h1>
        Budget
      </h1>

      <GeneratePiChart labels={labelsForBalance} data={amounts}/>
     
    </main>
  );
}
