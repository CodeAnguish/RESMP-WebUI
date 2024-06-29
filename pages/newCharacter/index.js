import React, { useState } from 'react';
import { CgArrowLeft } from 'react-icons/cg';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { addNewCharacter } from "../../components/Chat/CharacterActions";

export default function NewCharacter() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [photo, setPhoto] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
            setPhotoFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
            setPhotoFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSubmit = async () => {
        if (!name || !systemPrompt) {
            toast.error('Name and System Prompt are required');
            return;
        }
        try {
            await addNewCharacter({ name, description, systemPrompt, photo });
            toast.success('Character created successfully');
        } catch (error) {
            console.error('Failed to create character:', error);
            toast.error('Failed to create character');
        }
    };

    return (
        <div id="newCharacterForm">
            <Link href="/" className="back-link">
                <CgArrowLeft size="30" /> Back
            </Link>
            <div className="photo-preview">
                {photo ? (
                    <img src={photo} alt="Character" className="photo-preview-img" />
                ) : (
                    <div className="photo-placeholder">No Photo</div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter the character's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Describe the character"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="systemPrompt">System Prompt:</label>
                <textarea
                    id="systemPrompt"
                    name="systemPrompt"
                    rows="4"
                    placeholder="Enter the system prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="photo" style={{ color: 'var(--text-color)' }}>Photo (URL):</label>
                <input
                    type="text"
                    id="photo"
                    name="photo"
                    placeholder="Enter the character's photo URL"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
            </div>
            <div
                className="form-group photo-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <label htmlFor="photoUpload" className="upload-label">
                    <div className="upload-content">
                        <p>Drag & Drop your photo here or click to select a file</p>
                    </div>
                    <input
                        type="file"
                        id="photoUpload"
                        className="file-input"
                        name="photoUpload"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Create character</button>
            <style jsx>{`
                .photo-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .photo-preview-img {
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }

                .photo-placeholder {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background-color: var(--background-color);
                    border: 2px dashed var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-color);
                }

                .photo-upload {
                    border: 2px dashed var(--border-color);
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    cursor: pointer;
                    background-color: var(--background-color);
                }

                .upload-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .upload-content p {
                    margin: 0;
                    color: var(--text-color);
                }

                .file-input {
                    display: none;
                }

                .upload-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}
