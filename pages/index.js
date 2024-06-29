import CharactersSideBar from "@/components/CharactersSideBar/CharactersSideBar";
import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat/Chat";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import { useCharacter } from "@/CharacterContext";

// Definindo os personagens padrão
const defaultCharacters = [
    {
      "id": 1,
      "name": "Buddy",
      "description": "A loyal and playful friend.",
      "photo": "https://placedog.net/200/300",
      "systemPrompt": "You are a little dog named Buddy, and you are a loyal and playful friend.",
      "history": []
    },
    {
      "id": 2,
      "name": "Luna",
      "description": "Loves going for walks and exploring new places.",
      "photo": "https://placedog.net/201/300",
      "systemPrompt": "You are a little dog named Luna, and you love going for walks and exploring new places.",
      "history": []
    },
    {
      "id": 3,
      "name": "Max",
      "description": "Always ready for an adventure.",
      "photo": "https://placedog.net/202/300",
      "systemPrompt": "You are a little dog named Max, and you are always ready for an adventure.",
      "history": []
    },
    {
      "id": 4,
      "name": "Daisy",
      "description": "A sweet and loving companion.",
      "photo": "https://placedog.net/203/300",
      "systemPrompt": "You are a little dog named Daisy, and you are a sweet and loving companion.",
      "history": []
    },
    {
      "id": 5,
      "name": "Rocky",
      "description": "Full of energy and loves to run.",
      "photo": "https://placedog.net/204/300",
      "systemPrompt": "You are a little dog named Rocky, and you are full of energy and love to run.",
      "history": []
    },
    {
      "id": 6,
      "name": "Bella",
      "description": "Elegant and loves affection.",
      "photo": "https://placedog.net/205/300",
      "systemPrompt": "You are a little dog named Bella, and you are elegant and love affection.",
      "history": []
    },
    {
      "id": 7,
      "name": "Charlie",
      "description": "A fearless explorer.",
      "photo": "https://placedog.net/206/300",
      "systemPrompt": "You are a little dog named Charlie, and you are a fearless explorer.",
      "history": []
    },
    {
      "id": 8,
      "name": "Lucy",
      "description": "Intelligent and loyal.",
      "photo": "https://placedog.net/207/300",
      "systemPrompt": "You are a little dog named Lucy, and you are intelligent and loyal.",
      "history": []
    },
    {
      "id": 9,
      "name": "Bailey",
      "description": "Always in a good mood and playful.",
      "photo": "https://placedog.net/208/300",
      "systemPrompt": "You are a little dog named Bailey, and you are always in a good mood and playful.",
      "history": []
    },
    {
      "id": 10,
      "name": "Sadie",
      "description": "Cheerful and always ready to have fun.",
      "photo": "https://placedog.net/209/300",
      "systemPrompt": "You are a little dog named Sadie, and you are cheerful and always ready to have fun.",
      "history": []
    },
    {
      "id": 11,
      "name": "Kearm",
      "description": "My best AI's friend!",
      "photo": "https://pbs.twimg.com/profile_images/1726802388147728384/KEpUI_rw_400x400.jpg",
      "systemPrompt": "Kearm é um cara incrível, caridoso e de bom coração, ele gosta de ajudar as pessoas.",
      "history": []
    }
  ];

  export default function Home(props) {
 
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const { selectedCharacter, setSelectedCharacter } = useCharacter();

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

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 768;
            setSidebarVisible(!isMobileView);
            setIsMobile(isMobileView);
        };

        // Verificar a largura da janela no lado do cliente
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleCharacterSelect(character) {
        setSelectedCharacter(character);
        if (window.innerWidth <= 768) {
            router.push("/chat");
        }
    }

    function handleRemoveCharacter(id) {
        const updatedCharacters = characters.filter(char => char.id !== id);
        setCharacters(updatedCharacters);
        localStorage.setItem("characters", JSON.stringify(updatedCharacters));
        if (selectedCharacter?.id === id) {
            setSelectedCharacter(null);
        }
    }

    function toggleSidebar() {
        setSidebarVisible(prevVisible => !prevVisible);
    }

    return (
        <div id="content">
            <div id="mobile-menu-button" onClick={toggleSidebar}>
                {
                    !sidebarVisible ? <CiMenuBurger size={40} /> : <IoMdClose size={40} />
                }
            </div>
            {isLoading ? (<></>) : (
                <CharactersSideBar
                    visible={true}
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
                    selectedCharacter?.id ? (
                        <Chat
                            character={selectedCharacter}
                            onRemoveCharacter={handleRemoveCharacter}
                        />
                    ) : (
                        <div id="chat" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "var(--text-color)" }}>
                            <h1 style={{ fontSize: '5em', margin: '0'}}>👌</h1>
                            <h1 style={{ margin: '10px 0'}}>Let's talk!</h1>
                            <p style={{ margin: '5px 0'}}>Select someone to talk to from the sidebar.</p>
                            {isMobile ? (
                                <p style={{ margin: '5px 0', width: '300px', textAlign: 'center' }}>You can access the menu through the icon in the top right corner.</p>
                            ) : (
                                <p style={{ margin: '5px 0' }}>You can access the menu through the sidebar on the left.</p>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
