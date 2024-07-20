import React, { useState, useEffect, select, option } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/Layout/Header/Header';
import BackButton from '@/components/Layout/BackButton/BackButton';
import Body from '@/components/Layout/Body/Body';
import Content from '@/components/Layout/Content/Content';
import RButton from '@/components/RButton/RButton';
import Bottom from '@/components/Layout/Bottom/Bottom';
import RSelector from '@/components/RSelector/RSelector';

export default function Config() {
    // Initialize state for selected model and models list
    const [selectedModel, setSelectedModel] = useState('');
    const [models, setModels] = useState([]);

    // On component mount, fetch models from environment variables
    useEffect(() => {
        const modelsString = process.env.NEXT_PUBLIC_MODELS;
        if (modelsString) {
            const modelsArray = modelsString.split(',');
            setModels(modelsArray);
        }

        // Check if there's a previously selected model in localStorage
        const storedModel = localStorage.getItem('server_model');
        if (storedModel) {
            setSelectedModel(storedModel);
        }
    }, []);

    // Function to handle model selection
    const handleModelSelect = (event) => {
        setSelectedModel(event.target.value);
    };

    // Function to save selected model to localStorage
    const saveModel = () => {
        if (selectedModel) {
            localStorage.setItem('server_model', selectedModel);
            toast.success('Model selection saved successfully.');
        } else {
            toast.error('Please select a model.');
        }
    };

    return (
        <Content>
            <Header
                title="Configuration" 
                subTitle="Choose your model!"
            >
                <BackButton />
            </Header>
            <Body>
                <h3>Select your model</h3>
                <div>
                    <RSelector
                        selectedModel={selectedModel}
                        onChange = {handleModelSelect}
                        models={models}
                    />
                </div>
            </Body>
            <Bottom>
                <RButton
                    title="Save changes"
                    onClick={saveModel}
                />
            </Bottom>
        </Content>
    );
}
