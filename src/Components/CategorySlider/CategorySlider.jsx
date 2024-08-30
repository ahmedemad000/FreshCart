import axios from 'axios';
import Style from './CategorySlider.module.css'
import {useState} from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import Loading from '../Loading/Loading';

export default function CategorySlider() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows:false,
      //to make it responsive
      responsive: [
        {
          breakpoint: 1024, // desktop
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768, // tablet
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480, // mobile
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    const [categories, setCategories] = useState([])
    //function to get categories
    async function getCategories(){
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(data);
    setCategories(data?.data)
    }
    useEffect(() => {
      console.log('Mounting CategorySlider');
      getCategories();
      }, []);
      
      if(categories.length === 0){
        return <Loading/>;
      }
      
    return (
    <Slider {...settings} className='mb-9'>
      {
        categories.map((c)=> <div key={c._id} className='p-2'>
          <img src={c.image} className='h-[250px] w-full object-cover'  />
          <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>
        </div>)
      }
    </Slider>
  )
}
