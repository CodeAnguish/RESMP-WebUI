import CharactersSideBar from "@/components/CharactersSideBar/CharactersSideBar";
import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat/Chat";
import charactersData from "../characters/allCharacters.json";

export default function Home(props) {
    const [selectedCharacter, setSelectedCharacter] = useState({});
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCharacters(charactersData);
            setIsLoading(false);
        }, 2000); // Simulating a delay of 2 seconds to load the JSON data
    }, []);

    function handleCharacterSelect(character) {
        setSelectedCharacter(character);
    }

    return (
        <div id="content">
            {
                isLoading ? (<></>) :  (
                    <CharactersSideBar
                    data={characters}
                    onSelect={handleCharacterSelect}
                />
                )
            }
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
                        <Chat character={selectedCharacter} />
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
