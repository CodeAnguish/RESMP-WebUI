import { ToastContainer } from 'react-toastify';
import { CharacterProvider } from '@/CharacterContext';
import 'react-toastify/dist/ReactToastify.css';
import "@/components/Layout/Style.css";
import "@/components/CharactersSideBar/Style.css";
import "@/pages/newCharacter/Style.css";
import "@/components/Layout/Theme/light-dark-v3.css";
import "@/components/Chat/Style.css";
import "@/components/ChatBaloon/Style.css";


export default function App({Component, pageProps}){
    return (
        <>
        <CharacterProvider>
            <ToastContainer
                position={"bottom-center"}
            />
            <Component {...pageProps} className="dark" />
        </CharacterProvider>
        </>
    );
}
