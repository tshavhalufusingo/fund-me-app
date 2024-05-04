
import { useSession } from "next-auth/react";
import "../../styles.css"

export default function getProfile(){

    const user = session?.user.role;




    const person = {
        email : "moloi ",
        firstName : " ",
        lastName : " "

    }

    return (

    <h1 className="profileheader">
        // To implement
    </h1>

    );
}