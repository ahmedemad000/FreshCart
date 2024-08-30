import axios from 'axios';
import Style from './Home.module.css'
import {useState} from 'react';
import { useEffect } from 'react';
import MainSlider from '../MainSlider/MainSlider';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Home() {

    return (
   <>
   <MainSlider />
   <CategorySlider/>
   <RecentProducts/>

   </>
  );
}
