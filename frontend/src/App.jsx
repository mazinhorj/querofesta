
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {
  

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
