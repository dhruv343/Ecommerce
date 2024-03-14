import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'

import HeroSection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonials from '../../components/testimonials/Testimonials'
import Track from '../../components/track/Track'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
function Home() {
  const dispatch=useDispatch();
  const cartItems=useSelector((state)=>state.cart);
  
  console.log(cartItems);


  return (
    
    
    <Layout>
    
    <HeroSection/>
    <Filter/>
    <ProductCard/>
    <Track/>
    <Testimonials/>
    </Layout>
  )
}

export default Home