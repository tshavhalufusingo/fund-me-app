import React, { useState } from 'react';

export default function ApplicationForm() {
    // State variables to hold form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [documentType, setDocumentType] = useState('Identity Document');
    const [attachmentUrl, setAttachmentUrl] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to send form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('amount', amount);
        formData.append('description', description);
        formData.append('attachment', attachment);
        formData.append('documentType', documentType);

        try {
            // Make POST request to the API endpoint
            const response = await fetch('/api/application', {
                method: 'POST',
                body: formData,
            });

            // Assuming the server responds with the URL of the uploaded attachment
            if (response.ok) {
                const data = await response.json();
                alert(data);
                setAttachmentUrl(data.attachmentUrl); // Set the attachment URL if available
            } else {
                alert('failed  to submit application');
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAttachment(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* Your existing form fields */}

            <label htmlFor="attachment">Attachments:</label>
            <input type="file" id="attachment" name="attachment" onChange={handleFileChange} required />

            {/* Download link/button */}
            {attachmentUrl && (
                <div>
                    <label>Attachment:</label>
                    <a href={attachmentUrl} download>Download Attachment</a>
                </div>
            )}

            {/* Submit button */}
            <button type="submit">Submit</button>
        </form>
    );
}
