import Chat from "@/components/Chat/Chat";
import { useCharacter } from "@/CharacterContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ChatPage() {
    const { selectedCharacter } = useCharacter();
    const router = useRouter();

    useEffect(() => {
        if (!selectedCharacter) {
            // Se não houver personagem selecionado, redirecionar de volta para a página inicial
            router.push("/");
        }
    }, [selectedCharacter, router]);

    if (!selectedCharacter) {
        return <div>Loading...</div>;
    }

    return (
        <Chat
            character={selectedCharacter}
            onRemoveCharacter={() => {
                // Implementar lógica para remover personagem se necessário
            }}
        />
    );
}
