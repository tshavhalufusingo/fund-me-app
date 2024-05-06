import { Fragment } from "react";
import styles from "../../page.module.css"

export default function(){



    return (

        <Fragment>


<main>



<div className="container">
        <h1>Contact Us</h1>
        <div className="contact-form">
            <form action="submit_form.php" method="POST">
                <div className="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>
                <div className="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div className="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>




</main>


        </Fragment>

        



    );
}