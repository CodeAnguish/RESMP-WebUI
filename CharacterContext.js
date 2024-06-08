import { createContext, useState, useContext } from "react";

const CharacterContext = createContext();

export function CharacterProvider({ children }) {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    return (
        <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacter() {
    return useContext(CharacterContext);
}
