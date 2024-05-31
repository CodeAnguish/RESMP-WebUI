import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, history } = req.body;
        const charactersFilePath = path.resolve(__dirname, "../../../../characters/allCharacters.json");

        try {
            // Read the current data from the file
            const data = await fs.promises.readFile(charactersFilePath, 'utf8');
            let characters = JSON.parse(data);

            // Find the character by id and update its history
            const updatedCharacters = characters.map((char) => {
                if (char.id === id) {
                    char.history = history;
                }
                return char;
            });

            // Write the updated data back to the file
            await fs.promises.writeFile(charactersFilePath, JSON.stringify(updatedCharacters, null, 2));

            console.log('Character history updated successfully');
            res.json({ message: 'Character history updated successfully' });
        } catch (err) {
            console.error('Error updating character history:', err);
            res.status(500).json({ error: 'Failed to update character history', err });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
