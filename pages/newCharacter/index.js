import React, { useState } from 'react';
import { CgArrowLeft } from 'react-icons/cg';
import { TbGhostFilled } from 'react-icons/tb';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function NewCharacter() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/insertCharacter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, systemPrompt, photo }),
            });

            if (!response.ok) {
                throw new Error('Failed to create character');
            }

            toast.success('Character created successfully');
        } catch (error) {
            toast.error('Failed to create character');
        }
    };

    return (
        <div id="newCharacterForm">
            <Link href="/" className="back-link">
                <CgArrowLeft size="30" /> Back
            </Link>
            <TbGhostFilled size="40" color="white" style={{ background: 'linear-gradient(135deg, #8EC5FC, #E0C3FC, #8ED2C9)', borderRadius: '50%', padding: '10px' }} />
            <h1>Welcome a new being.</h1>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter the character's name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows="4" placeholder="Describe the character" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="systemPrompt">System Prompt:</label>
                <textarea id="systemPrompt" name="systemPrompt" rows="4" placeholder="Enter the system prompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="photo">Photo (URL):</label>
                <input type="text" id="photo" name="photo" placeholder="Enter the character's photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>Create character</button>
        </div>
    );
}
