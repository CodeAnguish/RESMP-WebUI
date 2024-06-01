import CharactersSideBar from "@/components/CharactersSideBar/CharactersSideBar";
import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat/Chat";

// Definindo os personagens padrão
const defaultCharacters = [
  {
    "id": 11,
    "name": "Kearm",
    "description": "Your best AI friend!",
    "photo": "https://pbs.twimg.com/profile_images/1726802388147728384/KEpUI_rw_400x400.jpg",
    "systemPrompt": "Kearm is a good guy, with hearts set on helping others through technology. He create intelligent AI solutions and open-source models that benefit the entire community, and possibly, the world.",
    "history": []
  },
  {
    "id": 2,
    "name": "CodeAnguish",
    "description": "Kearm's friend and an Amazing Developer",
    "photo": "",
    "systemPrompt": "CodeAnguish is a intelligent developer, it made solutions to AI and anything. Its expert in NodeJS, JavaScript, PHP, Laravel, PostgreSQL and more. Its really fun and love use emojis",
    "history": []
  }
];

export default function Home(props) {
    const [selectedCharacter, setSelectedCharacter] = useState({});
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar se os personagens existem no localStorage
        const storedCharacters = localStorage.getItem("characters");
        if (storedCharacters) {
            // Se existirem, carregue-os do localStorage
            setCharacters(JSON.parse(storedCharacters));
        } else {
            // Caso contrário, use os personagens padrão
            setCharacters(defaultCharacters);
            // Grave os personagens padrão no localStorage
            localStorage.setItem("characters", JSON.stringify(defaultCharacters));
        }
        setIsLoading(false);
    }, []);

    function handleCharacterSelect(character) {
        setSelectedCharacter(character);
    }

    function handleRemoveCharacter(id) {
        const updatedCharacters = characters.filter(char => char.id !== id);
        setCharacters(updatedCharacters);
        localStorage.setItem("characters", JSON.stringify(updatedCharacters));
        if (selectedCharacter.id === id) {
            setSelectedCharacter({});
        }
    }

    return (
        <div id="content">
            {isLoading ? (<></>) :  (
                <CharactersSideBar
                    data={characters}
                    onSelect={handleCharacterSelect}
                />
            )}
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isLoading ? (
                      <div className="spinner"></div>
                ) : (
                    selectedCharacter.id ? (
                        <Chat 
                            character={selectedCharacter}
                            onRemoveCharacter={handleRemoveCharacter}
                         />
                    ) : (
                        <div id="chat" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "var(--text-color)" }}>
                            <h1 style={{ fontSize: '5em', margin: '0'}}>👌</h1>
                            <h1 style={{ margin: '10px 0'}}>Let's talk!</h1>
                            <p style={{ margin: '5px 0'}}>Select someone to talk to from the sidebar.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
