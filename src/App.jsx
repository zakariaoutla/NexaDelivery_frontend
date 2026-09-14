import './App.css'
import Navbar from "./components/Home/NavBar.jsx";
import Hero from "./components/Home/Hero.jsx";
import MerchantSection from "./components/Home/MerchantSection.jsx";
import PlatformSection from "./components/Home/PlatformSection.jsx";
import HowItWorks from "./components/Home/HowItWorks.jsx";
import ImpactSection from "./components/Home/ImpactSection.jsx";
import TestimonialsSection from "./components/Home/TestimonialsSection.jsx";
import FinalCTASection from "./components/Home/FinalCTASection.jsx";
import Footer from "./components/Home/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./page/Login.jsx";

function App() {

  return (
    <>


        <Routes>
            <Route path="/" element={<>
                <Navbar/>
                <Hero/>
                <MerchantSection/>
                <PlatformSection/>
                <HowItWorks/>
                <ImpactSection/>
                <TestimonialsSection/>
                <FinalCTASection/>
                <Footer/>
            </>}/>
            <Route path="/login" element={<Login/>}/>


        </Routes>
    </>
  )
}

export default App
