import Style from './About.module.css'
import {useState} from 'react';
import { useEffect } from 'react';

export default function About() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
    console.log('Mounting About');
    
    }, []);
    return (
    <div>
        <h2>About</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime distinctio cupiditate laborum architecto quidem repellendus!</p>
    </div>
  )
}
