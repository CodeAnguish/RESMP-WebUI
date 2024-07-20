import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CgArrowLeft } from 'react-icons/cg';
import { TbGhostFilled } from 'react-icons/tb';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Content from '@/components/Layout/Content/Content';
import Header from '@/components/Layout/Header/Header';
import Body from '@/components/Layout/Body/Body';
import BackButton from '@/components/Layout/BackButton/BackButton';
import Bottom from '@/components/Layout/Bottom/Bottom';

export default function EditCharacter() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [photo, setPhoto] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const character = getCharacterById(parseInt(id));
            if (character) {
                setName(character.name);
                setDescription(character.description);
                setSystemPrompt(character.systemPrompt);
                setPhoto(character.photo);
            }
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            updateCharacter({ id: parseInt(id), name, description, systemPrompt, photo });
            toast.success('Character updated successfully');
        } catch (error) {
            console.error('Failed to update character:', error);
            toast.error('Failed to update character');
        }
    };

    const getCharacterById = (id) => {
        try {
            const characters = JSON.parse(localStorage.getItem('characters')) || [];
            return characters.find(char => char.id === id);
        } catch (error) {
            console.error('Error getting character by ID:', error);
            return null;
        }
    };

    const updateCharacter = (updatedCharacter) => {
        try {
            let characters = JSON.parse(localStorage.getItem('characters')) || [];
            const index = characters.findIndex(char => char.id === updatedCharacter.id);

            if (index !== -1) {
                characters[index] = { ...characters[index], ...updatedCharacter };
                localStorage.setItem('characters', JSON.stringify(characters));
                console.log('Character updated successfully');
            }
        } catch (error) {
            console.error('Error updating character:', error);
        }
    };

    return (
            <Content>
                <Header
                    title="Edit"
                    subTitle="Edit character"
                >
                    <BackButton />
                </Header>
                <Body>
 
                <div className="form-group">
                <label htmlFor="name">Name:</label>
                <br />
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter the character's name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                   
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
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="photo">Photo (URL):</label><br />
                <input 
                    type="text" 
                    id="photo" 
                    name="photo" 
                    placeholder="Enter the character's photo URL" 
                    value={photo} 
                    onChange={(e) => setPhoto(e.target.value)} 
                    
                />
            </div>
      
      
                </Body>
                <Bottom>
                <button className="submit-button" onClick={handleSubmit}>Update character</button>
                </Bottom>
            </Content>
    );
}
