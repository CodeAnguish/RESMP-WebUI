import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatBaloon = ({ type, text, noBg = false }) => {
    const isUser = type === 'user';
    const baloonClass = isUser ? 'baloonStyle userBaloon' : `baloonStyle assistantBaloon ${noBg && 'noBg'}`;
    const justifyContent = !isUser ? 'flex-start' : 'flex-end';
    const [syntaxStyle, setSyntaxStyle] = useState({});

    useEffect(() => {
        const loadSyntaxStyle = async () => {
            const { default: style } = await import('react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus');
            setSyntaxStyle(style);
        };
        loadSyntaxStyle();
    }, []);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            toast.success('Code copied to clipboard!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }, (err) => {
            console.error('Failed to copy code: ', err);
        });
    };

    return (
        <div className={'baloonContainer'} style={{ justifyContent }}>
            <div className={baloonClass}>
                <ReactMarkdown
                    style={{ padding: 0, margin: 0 }}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div style={{ position: 'relative' }}>
                                    <button
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '10px',
                                            zIndex: 1,
                                            background: 'none',
                                            border: '1px solid white',
                                            color: 'white',
                                            padding: '5px',
                                            cursor: 'pointer',
                                            borderRadius: '10px'
                                        }}
                                        onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                                    >
                                        Copy
                                    </button>
                                    <SyntaxHighlighter
                                        style={syntaxStyle}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChatBaloon;
