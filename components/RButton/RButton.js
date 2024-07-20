export default function RButton({title, onClick}){
    return (
        <button className="submit-button" onClick={onClick}>{title}</button>
    )
}