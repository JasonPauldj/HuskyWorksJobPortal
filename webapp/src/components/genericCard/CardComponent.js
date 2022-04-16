import './CardComponent.scss';

function CardComponent(props){
    return(<div className="card">
        {props.children}
    </div>)
}

export default CardComponent;