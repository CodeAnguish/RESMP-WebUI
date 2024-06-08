import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBaloon = ({ type, text, noBg = false }) => {

    const isUser         = type === 'user';
    const baloonClass    = isUser ? 'baloonStyle userBaloon' : `baloonStyle assistantBaloon ${noBg && 'noBg'}`;
    const justifyContent = !isUser ? 'flex-start' : 'flex-end';

    return (
        <div className={'baloonContainer'} style={{justifyContent}}>
            <div className={baloonClass}>
                <ReactMarkdown style={{ padding: 0, margin: 0}}>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatBaloon;
