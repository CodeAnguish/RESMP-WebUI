import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const charactersFilePath = path.resolve(__dirname, '../../../../characters/allCharacters.json');

    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            // Read the current data from the file
            const data = await fs.promises.readFile(charactersFilePath, 'utf8');
            let characters = JSON.parse(data);

            // Find the index of the character with the given id
            const index = characters.findIndex((character) => character.id === parseInt(id));

            if (index === -1) {
                return res.status(404).json({ error: 'Character not found' });
            }

            // Remove the character from the array
            const removedCharacter = characters.splice(index, 1)[0];

            // Write the updated data back to the file
            await fs.promises.writeFile(charactersFilePath, JSON.stringify(characters, null, 2));

            console.log('Character removed successfully');
            res.json({ message: 'Character removed successfully', character: removedCharacter });
        } catch (err) {
            console.error('Error removing character:', err);
            res.status(500).json({ error: 'Failed to remove character', err });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
