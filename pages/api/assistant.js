export default async function handler(req, res) {
    try {
        const serverAPI = process.env.SERVER_API;
        const token     = process.env.TOKEN;
        const model     = process.env.SERVER_MODEL;
        const APIType   = process.env.API_TYPE; 

        const response = await fetch(serverAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model: "gemma2:latest",
                messages: req.body.messages,
                stream: false
            }),
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(response);
        }

        const data = await response.json();

        let responseMessage = "";

        switch(APIType) { 
            case "ollama":
                responseMessage = data.message?.content;
                break;  
            default:
                responseMessage = data.choices?.[0]?.message?.content;
                break; 
        }
        res.status(200).json({ message: responseMessage });

    } catch (e) {
        console.error('Error getting response from the assistant:', e);
        res.status(500).json({ error: e });
    }
}
