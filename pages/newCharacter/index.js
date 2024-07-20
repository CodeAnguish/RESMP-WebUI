import React, { useState } from 'react';
import { CgArrowLeft } from 'react-icons/cg';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { addNewCharacter } from "../../components/Chat/CharacterActions";
import Body from '@/components/Layout/Body/Body';
import Content from '@/components/Layout/Content/Content';
import BackButton from '@/components/Layout/BackButton/BackButton';
import Header from '@/components/Layout/Header/Header';
import Bottom from '@/components/Layout/Bottom/Bottom';

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
        <Content>

            <Header title="Create" subTitle="Create a new character">
              <BackButton />
            </Header>
            <Body>
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

 
            </Body>
            <Bottom>
            <button className="submit-button" onClick={handleSubmit}>Create character</button>
            </Bottom>
        </Content>
    );
}
