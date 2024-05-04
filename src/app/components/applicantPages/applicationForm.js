export default function applicationForm(){

    //create an application form to request for funding

    // Mock data for attachment
    const attachmentUrl = ""; // Add URL to the uploaded file here

    return (
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="amount">Amount Requested:</label>
            <input type="number" id="amount" name="amount" required />



            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required></textarea>

            <label htmlFor="attachment">Attachments:</label>
            <input type="file" id="attachment" name="attachment" required />

            {/* Download link/button */}
            {attachmentUrl && (
                <div>
                    <label>Attachment:</label>
                    <a href={attachmentUrl} download>Download Attachment</a>
                </div>
            )}

            <label htmlFor="documentType">Document Type:</label>
            <select id="documentType" name="documentType" required>
                <option value="Identity Document">ID</option>
                <option value="2">CV</option>
                <option value="other">Other</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    );
}
