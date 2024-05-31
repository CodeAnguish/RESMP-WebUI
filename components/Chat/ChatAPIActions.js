export const updateCharacterHistory = async (character) => {
    try {
        const response = await fetch('/api/updateCharacterHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character),
        });
        if (!response.ok) {
            throw new Error('Failed to update character history');
        }
    } catch (error) {
        console.error('Error updating character history:', error);
    }
};

export const fetchAssistantResponse = async (messages) => {
    try {
        const model     =  localStorage.getItem('serverModel') || "";
        const serverAPI =  localStorage.getItem('serverAPI')   || "";
        const response = await fetch(serverAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                stream: false
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get response from the assistant');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error getting response from the assistant:', error);
        return 'Sorry, I am unable to respond at the moment.';
    }
};

export const removeCharacter = async (characterId) => {
    try {
        const response = await fetch('/api/removeCharacter', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ characterId }),
        });
        if (!response.ok) {
            throw new Error('Failed to remove character');
        }

        console.log('Character removed successfully');
    } catch (error) {
        console.error('Error removing character:', error);
    }
};
