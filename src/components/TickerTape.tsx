import { useNavigate } from 'react-router-dom';
import '../css/ticker.css';

interface TickerProps{
    title:string,
    id?: string,
    direction?: 'normal' | 'reverse',
    link?: string
}

//TODO: looping could be better
const TickerTape = (props:TickerProps) => {
    const nav = useNavigate();
    const custom_style:any = {
        animationDirection: props.direction,

        '&:hover':{ //FIXME: ticker hover
            background: 'white'
        }
    };
    
    return(
        <div className="ticker" 
        id={props.id}
        onClick = {() => {
            if(!props.link) return;
            if(props.link.includes('http')){ 
                window.location.href = props.link;
            } else{
                nav(props.link);
            }
        }}>
				<div style = {custom_style}>
					{(props.title +" ").repeat(6)} 
				</div>
                <div style = {custom_style}>
					{(props.title +" ").repeat(6)} 
				</div>
		</div>
    );
}
export default TickerTape;


