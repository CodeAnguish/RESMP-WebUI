
    export const addNewCharacter = (newCharacter) => {
        try {
            let characters = JSON.parse(localStorage.getItem('characters')) || [];
            
            // Obter o ID do último personagem
            const id = characters.length > 0 ? characters.length + 1 : 1;
            newCharacter.id = id;
            
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

    export const getModelName = () => process.env.SERVER_MODEL;