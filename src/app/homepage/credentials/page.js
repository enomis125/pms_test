"use client";

import { useState } from 'react';
import { Input, Button } from "@nextui-org/react";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/json') {
            setFile(selectedFile);
            setErrorMessage('');
        } else {
            setFile(null);
            setErrorMessage('Please upload a valid .json file');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('No file selected or invalid file type');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/v1/upload-credentials', {
            method: 'POST',
            body: formData,
        });

        console.log(response);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    const showEmailUpload = () => {
        setFile(null); // Reset file state if switching from Outlook to Email
        setShowForm(false);
    };

    const showOutlookForm = () => {
        setShowForm(true);
    };

    return (
        <div>
            <div>
                <Button onClick={showEmailUpload}>Email</Button>
                <Button onClick={showOutlookForm}>Outlook</Button>
            </div>

            {!showForm && (
                <div>
                    <input type="file" accept=".json" onChange={handleFileChange} />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <Button onClick={handleUpload}>Upload Credentials</Button>
                </div>
            )}

            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <Input label="Field 1" placeholder="Enter something" />
                    <Input label="Field 2" placeholder="Enter something else" />
                    <Input label="Field 3" placeholder="Enter something more" />
                    <Button type="submit">Submit Form</Button>
                </form>
            )}
        </div>
    );
}
