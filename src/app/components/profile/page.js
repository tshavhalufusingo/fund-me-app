import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function getProfile(){

    const session = useSession();

    const myId = session?.id;


  

    useEffect(() => {



        async function fetchData() {
            try {
                //create an API To fetch a specific user's informationa another one to allow them to change some information
              const response = await fetch("../../api/users");
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const jsonData = await response.json();

              
            }catch(Exeption){
                console.log(Exeption);
            }
        }


        

    }, []);




    return (

    <h1 className="profileheader">

    </h1>

    );
}