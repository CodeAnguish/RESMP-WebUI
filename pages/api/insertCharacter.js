import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, photo, systemPrompt, history = [] } = req.body;
        const charactersFilePath = path.resolve(__dirname, '../../../../characters/allCharacters.json');

        try {
            // Read the current data from the file
            const data = await fs.promises.readFile(charactersFilePath, 'utf8');
            let characters = JSON.parse(data);

            // Generate a new ID for the character
            const id = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;

            // Create the new character object
            const newCharacter = {
                id,
                name,
                description,
                photo,
                systemPrompt,
                history,
            };

            // Add the new character to the array
            characters.push(newCharacter);

            // Write the updated data back to the file
            await fs.promises.writeFile(charactersFilePath, JSON.stringify(characters, null, 2));

            console.log('Character added successfully');
            res.json({ message: 'Character added successfully', character: newCharacter });
        } catch (err) {
            console.error('Error adding character:', err);
            res.status(500).json({ error: 'Failed to add character', err });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
