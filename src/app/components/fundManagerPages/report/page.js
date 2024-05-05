'use client'
import React, { Fragment, useEffect, useState } from "react";
import GeneratePiChart from "./../../graphs/generateGraph";
import { useSession } from "next-auth/react";
import styles from ".//..//..//../page.module.css"

function Graph() {
  const [companyNames, setCompanyNames] = useState([]);
  const [fundingAmounts, setFundingAmounts] = useState([]);

  
  const status =  generateAprovedStudentsGraph()[0];
  const statusFlag =  generateAprovedStudentsGraph()[1];
  
  let dist = [0,0,0];

  for(let x = 0; x < status.length; x++){
    console.log("x = ",status[x]);  
    if( status[x]=== 1){
      dist[0] += 1;
    }
    else if(status[x] === 2){
      dist[1] += 1;
    }
    else{
      dist[2] += 1;
    }
  }

  console.log(status);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/graphdata/graphcompanies");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        const names = [];
        const amounts = [];

        for (let key in jsonData) {
          names.push(jsonData[key].companyName);
          amounts.push(jsonData[key].fundingAmount);
        }

        setCompanyNames(names);
        setFundingAmounts(amounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
      <main className={styles.main}>

      <div>

        <h2 className="graphH">
          Amount used 
        </h2>

      <GeneratePiChart labels={companyNames} data={fundingAmounts} />



      </div>


    <div>

    <h1>
        Applications 
      </h1>
      <GeneratePiChart labels={statusFlag} data={dist} />

      <p>
        Pending : {dist[0]}      </p> 


       <p> Approved : {dist[1]} </p> 
      <p>  Rejected : {dist[2]} </p>


    </div>
     
    </main>
  );
}

function generateAprovedStudentsGraph(){


  const [status, setStatus] = useState([0,0,0]);
  const statusFlag = ["pending", "Approved", "Rejected"];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/graphdata/graphapplicants");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();


        for (let key in jsonData) {
          status.push(jsonData[key].statusId);
        }

    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);


  return [status, statusFlag];
   
}


export default Graph;

