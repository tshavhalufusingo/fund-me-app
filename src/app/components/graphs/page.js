'use client'
import React, { Fragment, useEffect, useState } from "react";
import GeneratePiChart from "./generateGraph";

function Graph() {
  const [companyNames, setCompanyNames] = useState([]);
  const [fundingAmounts, setFundingAmounts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/graphdata");
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
      <GeneratePiChart labels={companyNames} data={fundingAmounts} />
    </Fragment>
  );
}

function approvedStudents(){

}


export default Graph;


