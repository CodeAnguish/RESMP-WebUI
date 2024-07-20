export default function Header(props){

    return (
    <div id="pageHeader">
        <div id="pageTitles">
            <h1>{props.title}</h1>
            <h3>{props.subTitle}</h3>
        </div>
        {props.children}
    </div>
    );

}