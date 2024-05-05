import styles from "./../../../page.module.css"
import { useSession } from "next-auth/react";
export default function(){

    const session = useSession();

    const userID =session?.user.id;

    //fetch the applicatipons with this userID




    const company_name = " ";
    const status = " ";
    const application_data = " ";



    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch("../../api/graphdata/graphapplicants");
          
    
        
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);
    
    



    return(


        <main style={styles.main}>


            <div>
                <h1></h1>
            </div>


        </main>


    );
}