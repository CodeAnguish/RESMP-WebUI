
    export const addNewCharacter = (newCharacter) => {
        try {
            let characters = JSON.parse(localStorage.getItem('characters')) || [];
            
            // Obter o ID do último personagem
            const lastId = characters.length > 0 ? characters[characters.length - 1].id : 0;
            
            // Definir o ID do novo personagem como o ID do último personagem + 1
            newCharacter.id = lastId + 1;
            
            // Adicionar o novo personagem no topo do array
            characters.unshift({...newCharacter, history: []});
            
            // Atualizar o localStorage com os personagens atualizados
            localStorage.setItem('characters', JSON.stringify(characters));
            
            console.log('New character added successfully');
        } catch (error) {
            console.error('Error adding new character:', error);
        }
    };

    export const updateCharacterHistory = (character) => {
        try {
            const characters = JSON.parse(localStorage.getItem('characters')) || [];
            const index = characters.findIndex(char => char.id === character.id);

            if (index !== -1) {
                characters[index].history = character.history;
                localStorage.setItem('characters', JSON.stringify(characters));
            }
        } catch (error) {
            console.error('Error updating character history:', error);
        }
    };

    export const fetchAssistantResponse = async (messages) => {
        try {
            const serverAPI = process.env.SERVER_API;
            const token = process.env.TOKEN;
            const model = process.env.SERVER_MODEL;

            alert(serverAPI);

            const response = await fetch(serverAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

    export const removeCharacter = (characterId) => {
        try {
            let characters = JSON.parse(localStorage.getItem('characters')) || [];
            characters = characters.filter(char => char.id !== characterId);
            localStorage.setItem('characters', JSON.stringify(characters));
            console.log('Character removed successfully');
        } catch (error) {
            console.error('Error removing character:', error);
        }
    };
