
import Link from 'next/link';
import { CgArrowLeft } from 'react-icons/cg';

export default function BackButton(){
    return (
        <Link href="/" className="back-link">
            <CgArrowLeft size="30" /> Back
        </Link>
    );
}