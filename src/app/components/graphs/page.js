'use client'
import React, { Fragment, useEffect, useState } from "react";
import GeneratePiChart from "./generateGraph";

function Graph() {
  const [companyNames, setCompanyNames] = useState([]);
  const [fundingAmounts, setFundingAmounts] = useState([]);
  
  let dist = [0,0,0];

  for(let x in companyNames){
    if(x === 1){
      dist[0] += 1;
    }
    else if(x === 2){
      dist[1] += 1;
    }
    else{
      dist[2] += 1;
    }
  }

  const status =  generateAprovedStudentsGraph()[0];
  const statusFlag =  generateAprovedStudentsGraph()[1];
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
    <Fragment>

      <div>

        <h2 className="graphH">
          Amount per company
        </h2>

      <GeneratePiChart labels={companyNames} data={fundingAmounts} />



      </div>


    <div>

    <h1>
        Applications 
      </h1>
      <GeneratePiChart labels={statusFlag} data={dist} />


    </div>
     
    </Fragment>
  );
}

function generateAprovedStudentsGraph(){


  const [status, setStatus] = useState([1,3,5]);
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

