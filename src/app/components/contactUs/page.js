import { Fragment } from "react"; // Import Fragment component from React
import styles from "../../page.module.css"; // Import CSS module for styling

// Define the Contact component
export default function Contact() {
    return (
        <Fragment> {/* Fragment wrapper */}
            <main> {/* Main content section */}
                <div className="container"> {/* Container for contact form */}
                    <h1>Contact Us</h1> {/* Heading */}
                    <div className="contact-form"> {/* Contact form container */}
                        <form action="submit_form.php" method="POST"> {/* Form for submitting contact details */}
                            <div className="form-group"> {/* Form group for name */}
                                <label htmlFor="name">Name:</label> {/* Label for name input */}
                                <input type="text" id="name" name="name" required/> {/* Name input */}
                            </div>
                            <div className="form-group"> {/* Form group for email */}
                                <label htmlFor="email">Email:</label> {/* Label for email input */}
                                <input type="email" id="email" name="email" required/> {/* Email input */}
                            </div>
                            <div className="form-group"> {/* Form group for message */}
                                <label htmlFor="message">Message:</label> {/* Label for message textarea */}
                                <textarea id="message" name="message" required></textarea> {/* Message textarea */}
                            </div>
                            <div className="form-group"> {/* Form group for submit button */}
                                <button type="submit">Submit</button> {/* Submit button */}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Fragment> 
    );
}
