import './CardComponent.scss';

function CardComponent(props){

    return(<div className={`card ${props.className}` } onClick={props.onClick}>
        {props.children}
    </div>)
}

export default CardComponent;