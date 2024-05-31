import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { FaSun } from 'react-icons/fa';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { TbHexagonLetterN } from 'react-icons/tb';

export default function CharactersSideBar(props) {
    const [theme, setTheme] = useState('light');
    const [themeIcon, setThemeIcon] = useState(
        theme === 'light' ? <BsFillMoonStarsFill /> : <FaSun />
    );
    const [animate, setAnimate] = useState(false);
    const [model, setModel] = useState('llama3:8b-instruct-q8_0');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }

        const savedModel = localStorage.getItem('serverModel') || 'llama3:8b-instruct-q8_0';
        setModel(savedModel);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-mode');
        setThemeIcon(newTheme === 'light' ? <BsFillMoonStarsFill /> : <FaSun />);
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 1000);
    };

    function Character(character) {
        return (
            <div className="csb-character" onClick={() => props.onSelect(character)}>
                <div className="csb-character-photo">
                    <img src={character.photo} alt={character.name} />
                </div>
                <div className="csb-character-details">
                    <h1>{character.name}</h1>
                    <p>{character.description}</p>
                </div>
            </div>
        );
    }

    const themeGradient = theme === 'light' ? '#a9a2da' : 'linear-gradient(226deg, #946ee9, #b094e9)';
    const themeColor = theme === 'light' ? '#31263a' : 'white';

    const data = props.data;

    return (
        <div id="charactersSideBar">
            <Link href="/settings" style={{ color: themeColor }}>
                <div className={`settings-button ${animate ? 'animate' : ''}`}>
                    <IoMdSettings size={20} />
                </div>
            </Link>
            <div
                className={`theme-selector ${animate ? 'animate' : ''}`}
                onClick={toggleTheme}
                style={{ background: themeGradient, color: themeColor }}
            >
                {themeIcon}
            </div>
            <div id="csb-title" className="csb-title">
                <Link href="/" className="text-title">
                    <h1 className="title-container">
                        <div className="hexagon">
                            <TbHexagonLetterN />
                        </div>
                        <span className="kearm-text">kearm</span>
                    </h1>
                <div style={{ display: "flex", justifyContent: "center", alignItems:"center", flexDirection: "column", marginTop: "-30px"}}> 
                    <p style={{ opacity: 0.7}}>Running:</p>
                    <p style={{ marginTop: "-10px"}}>{model}</p>
                </div>
                </Link>
            </div>
            <div id="csb-header">
                <p>
                    <Link href="/newCharacter" style={{ color: 'white' }}>
                        <span style={{ verticalAlign: 'middle', color: 'white' }}>
                            <CiCirclePlus size={30} />
                        </span>{' '}
                        Create a new character
                    </Link>
                </p>
            </div>
            <div id="csb-content">{data.map((e, index) => <Character key={index} {...e} />)}</div>
            <style jsx>{`
                .theme-selector {
                    background: ${themeGradient};
                    padding: 5px 10px;
                    border-radius: 20px;
                    position: absolute;
                    top: 8px;
                    right: 10px;
                    font-size: 15px;
                    opacity: 1;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: background 0.3s, color 0.3s;
                }

                .settings-button {
                    padding: 5px 10px;
                    border-radius: 20px;
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    font-size: 15px;
                    opacity: 1;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: background 0.3s, color 0.3s;
                }

                .theme-selector.animate {
                    animation: pulse 1s;
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                #csb-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .title-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .hexagon {
                    font-size: 50px;
                    transition: transform 0.5s;
                }

                .kearm-text {
                    opacity: 0;
                    font-size: 40px;
                    position: absolute;
                    left: 100%;
                    margin-left: -110px;
                    transition: opacity 0.5s, transform 0.5s;
                    transform: translateX(-50px);
                }

                .title-container:hover .hexagon {
                    transform: translateX(-50px);
                }

                .title-container:hover .kearm-text {
                    opacity: 1;
                    transform: translateX(0);
                }
            `}</style>
        </div>
    );
}
