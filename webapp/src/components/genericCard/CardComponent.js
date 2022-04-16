import './CardComponent.scss';

function CardComponent(props){

    return(<div className="card" onClick={props.onClick}>
        {props.children}
    </div>)
}

export default CardComponent;