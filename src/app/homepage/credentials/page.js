"use client";

import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

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

        console.log(response)
    };

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileChange} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleUpload}>Upload Credentials</button>
        </div>
    );
}
