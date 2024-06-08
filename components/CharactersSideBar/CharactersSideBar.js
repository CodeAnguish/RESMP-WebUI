import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { FaSun } from 'react-icons/fa';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import Logo from '../../public/teste.svg';

export default function CharactersSideBar(props) {

    const [theme, setTheme] = useState('light');
    const [themeIcon, setThemeIcon] = useState(
        theme === 'light' ? <BsFillMoonStarsFill /> : <FaSun />
    );
    const [animate, setAnimate] = useState(false);
    const data = props.data;
    const model = "Dolphin8X22B";

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
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

    const Character = (character) => {
        return (
            <div className="csb-character" onClick={() => props.onSelect(character)}>
                <div className="csb-character-photo">
                    <img src={character.photo ? character.photo : "/img/default.png"} alt={character.name} />
                </div>
                <div className="csb-character-details">
                    <h1>{character.name}</h1>
                    <p>{character.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div id="charactersSideBar" style={{ transform: props.visible ? 'translateX(0)' : 'translateX(-999px)' }}>
            <div
                className={`theme-selector ${animate ? 'animate' : ''}`}
                onClick={toggleTheme}
            >
                {themeIcon}
            </div>
            <div id="csb-header">
                <div id="csb-title" className="csb-title">
                    <Link href="/">
                        <div className="logo-container">
                            <Logo className="logo" />
                        </div>
                    </Link>
                    <div className="title-details">
                        <div className="model-name">
                            <p>{model}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/newCharacter" id="csb-new-character">
  
                    <span>
                        <CiCirclePlus size={30} />
                    </span>
                    <p>Create a <b>new character</b></p>
                
            </Link>
            <div id="csb-content">
                {data.length >= 1 ? data.map((e, index) => <Character key={index} {...e} />) : (
                    <Link href="/newCharacter" style={{ color: 'var(--text-color)', textAlign: 'center' }}>
                        <p>Oh, no character. Create one here.</p>
                    </Link>
                )}
            </div>
        </div>
    );
}
