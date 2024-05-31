import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBaloon = ({ type, text, noBg = false }) => {
    const isUser = type === 'user';
    const className = isUser ? 'user-baloon' : 'assistant-baloon';
    const justifyContent = isUser ? 'flex-start' : 'flex-end';

    const baloonStyle = {
        margin: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '15px',
        maxWidth: '400px',
        wordWrap: 'break-word',
        backgroundColor: noBg ? 'none' : isUser ? '#000000ab' : '#f1f1f1',
        color: noBg ? "var(--text-color)" : isUser ? 'white' : '#333',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: justifyContent,
    };

    return (
        <div style={containerStyle}>
            <div className={`chat-baloon ${className}`} style={baloonStyle}>
                <ReactMarkdown style={{ padding: 0, margin: 0}}>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatBaloon;
