import Style from './MainSlider.module.css'
import {useState} from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import img_1 from '../../assets/main-slider-1.jpeg'
import img_2 from '../../assets/main-slider-2.jpeg'
import img_3 from '../../assets/main-slider-3.jpeg'
import img_4 from '../../assets/slide-1.jpeg'
import img_5 from '../../assets/slide-2.jpeg'

export default function MainSlider() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
    console.log('Mounting MainSlider');
    
    }, []);
    var settings = {
      dots: false,
      arrows:false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

    };
    return (
    <div className='grid grid-cols-12 mb-4'>
      {/* <div className='lg:col-span-8 '> */}
      <Slider {...settings} className=' col-span-12 md:col-span-8 '>
       <img className='h-[400px] w-full object-cover object-right' src={img_1} alt="" />
       <img className='h-[400px] w-full object-cover object-right' src={img_4} alt="" />
       <img className='h-[400px] w-full object-cover object-right' src={img_5} alt="" />
      </Slider>
      {/* </div> */}
      <div className=" col-span-12 md:col-span-4   bg-sky-400">
        <img className='h-[200px] w-full' src={img_2} alt="" />
        <img className='h-[200px] w-full' src={img_3} alt="" />
      </div>
    </div>
  )
}
