import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/components/Layout/Style.css";
import "@/components/CharactersSideBar/Style.css";
import "@/pages/newCharacter/Style.css";
import "@/components/Layout/Theme/Light-Dark.css";
import "@/components/Chat/Style.css";

export default function App({Component, pageProps}){
    return (
        <>
            <ToastContainer
                position={"bottom-center"}
            />
            <Component {...pageProps} className="dark" />
        </>
    );
}
