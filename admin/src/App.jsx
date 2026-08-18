import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Route,Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Navbar from './componets/Navbar.jsx';
import Search from './pages/Search.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar className="sticky z-100"/>
     <Routes>
       <Route path='/home' element={<Home/>}/>
       <Route path='/orders' element={<Orders/>}/>
       <Route path='/' element={<Login/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/products' element={<Products/>}/>
       <Route path='/search' element={<Search />}/>
     </Routes>
    
    </>
  )
}

export default App
