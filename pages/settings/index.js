import React, { useState, useEffect } from 'react';
import { CgArrowLeft } from 'react-icons/cg';
import { PiPlugsConnectedFill } from 'react-icons/pi';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
    const [url, setUrl] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        const storedUrl = localStorage.getItem('serverAPI');
        const storedModel = localStorage.getItem('serverModel');
        if (storedUrl) {
            setUrl(storedUrl);
        }
        if (storedModel) {
            setModel(storedModel);
        }
    }, []);

    const handleConnect = () => {
        localStorage.setItem('serverAPI', url);
        localStorage.setItem('serverModel', model);
        toast.success('API and model set successfully!');
    };

    return (
        <div id="newCharacterForm">
            <Link href="/" className="back-link">
                <CgArrowLeft size="30" /> Back
            </Link>
            <PiPlugsConnectedFill size="40" color="var(--next-background-color)" style={{ background: 'linear-gradient(135deg, #8EC5FC, #E0C3FC, #8ED2C9)', borderRadius: '50%', padding: '10px' }} />
            <h1>Let's connect your API!</h1>
            <div className="form-group">
                <label htmlFor="url">Url:</label>
                <input 
                    type="text" 
                    id="url" 
                    name="url" 
                    placeholder="http://127.0.0.1:3000" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="model">Model:</label>
                <input 
                    type="text" 
                    id="model" 
                    name="model" 
                    placeholder="llama3:8b-instruct-q8_0" 
                    value={model} 
                    onChange={(e) => setModel(e.target.value)} 
                />
            </div>

            <button className="submit-button" onClick={handleConnect}>
                Connect
            </button>
        </div>
    );
}
