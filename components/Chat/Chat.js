import React, { useState, useRef, useEffect } from 'react';
import ChatBaloon from '../ChatBaloon/ChatBaloon';
import { updateCharacterHistory, removeCharacter } from "./ChatAPIActions";

export default function Chat(props) {
    const [isAssistantResponding, setIsAssistantResponding] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const chatBodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setChatHistory([...props.character.history]);
    }, [props.character]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatHistory, isAssistantResponding]);

    useEffect(() => {
        if (!isAssistantResponding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAssistantResponding]);

    const handleSendMessage = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            inputRef.current.style.height = '40px';
            event.preventDefault();
            const messageText = event.target.value.trim();
            if (messageText !== '') {
                const newMessage = { type: 'user', text: messageText };
                setChatHistory(prevHistory => [...prevHistory, newMessage]);
                event.target.value = '';
                setIsAssistantResponding(true);

                props.character.history.push(newMessage);
                await updateCharacterHistory(props.character);

                const messages = [
                    {
                        role: 'system',
                        content: props.character.systemPrompt
                    },
                    ...props.character.history.map(msg => ({
                        role: msg.type === 'user' ? 'user' : 'assistant',
                        content: msg.text
                    }))
                ];

                try {
                    const response = await fetch('/api/assistant', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ messages })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to get response from the assistant');
                    }

                    const data = await response.json();
                    const assistantMessage = { type: 'assistant', text: data.response };

                    setChatHistory(prevHistory => [...prevHistory, assistantMessage]);

                    props.character.history.push(assistantMessage);
                    await updateCharacterHistory(props.character);

                } catch (error) {
                    console.error('Error getting response from the assistant:', error);
                    const errorMessage =  { type: 'assistant', text: 'Sorry, I am unable to respond at the moment.' };
                    setChatHistory(prevHistory => [...prevHistory, errorMessage]);
                    props.character.history.push(errorMessage);
                    await updateCharacterHistory(props.character);
                }

                setIsAssistantResponding(false);
            }
        }
    };

    const handleClearHistory = async () => {
        const updatedCharacter = { ...props.character, history: [] };
        await updateCharacterHistory(updatedCharacter);
        setChatHistory([]);
    };

    const handleRemoveCharacter = async () => {
        await removeCharacter(props.character.id);
        await props.onRemoveCharacter(props.character.id);
    };

    useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
            const resizeTextarea = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            };

            textarea.addEventListener('input', resizeTextarea);
            resizeTextarea();

            return () => {
                textarea.removeEventListener('input', resizeTextarea);
            };
        }
    }, [inputRef]);

    return (
        <div id="chat">
            <div id="chat-header">
                <div className="csb-character-photo chat-profile">
                     <img src={props.character?.photo ? props.character?.photo : "/img/default.png"} alt={props.character.name} />
                </div>
                <div>
                    <p>Talking with</p>
                    <h1 style={{ color: 'var(--text-color)' }}>{props.character?.name ?? ':)'}</h1>
                </div>
                <button className="chat-character-delete" onClick={handleRemoveCharacter}>Delete character</button>
                <button className="chat-history-clear" onClick={handleClearHistory}>Clear history</button>
            </div>
            <div id="chat-body" ref={chatBodyRef}>
                {chatHistory.map((message, index) => (
                    <ChatBaloon key={index} type={message.type} text={message.text} />
                ))}
                {chatHistory.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <h1>😊</h1>
                        <p style={{ color: "var(--text-color)", opacity: 0.5}}>
                            Talk with {props.character.name}!
                        </p>
                    </div>
                )}

                {isAssistantResponding && <ChatBaloon type="assistant" noBg={true} text="Typing..." />}
            </div>
            <div id="chat-talk">
                <div id="chat-talk-input" style={{ opacity: isAssistantResponding ? 0.3 : 1, transition: 'ease all 0.5s' }}>
                    <textarea
                        placeholder={isAssistantResponding ? `${props.character.name} is typing...` : "Write your message here!"}
                        onKeyPress={handleSendMessage}
                        disabled={isAssistantResponding}
                        ref={inputRef}
                        rows={1}
                    />
                </div>
            </div>
        </div>
    );
}
