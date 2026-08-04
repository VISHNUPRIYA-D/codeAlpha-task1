import { useState } from 'react'
import heroImg from './assets/hero.png'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Categories from './components/Categories'
import Brands from './components/Brands'
import BestSellers from './pages/BestSellers'
import NewArrivals from './pages/NewArrivals'
import SignUp from './pages/SignUp'
import UserAccount from './pages/userAccount'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import SingleProduct from './pages/SingleProduct'
import Payment from './pages/Payment'
import BuyAll from './pages/BuyAll'

function App() {

  return (
    <>
      <Navbar />
      <div className='top-20'>
        <Categories />
        <Brands />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/bestSeller' element={<BestSellers />} />
          <Route path='/newArrivals' element={<NewArrivals />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/profile' element={<UserAccount />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/product/:id' element={<SingleProduct />}/>
          <Route path='/payment' element={<Payment />} />
          <Route path='/buyallcart' element={<BuyAll />}/>

        </Routes>
      </div>
      
    </>
  )
}

export default App
