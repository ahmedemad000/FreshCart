import Style from './NotFound.module.css'
import {useState} from 'react';
import { useEffect } from 'react';

export default function NotFound() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
    console.log('Mounting NotFound');
    
    }, []);
    return (
    <div>
        <h2>NotFound</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime distinctio cupiditate laborum architecto quidem repellendus!</p>
    </div>
  )
}
