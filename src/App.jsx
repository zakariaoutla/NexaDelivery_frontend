import './App.css'
import Navbar from "./components/Home/NavBar.jsx";
import Hero from "./components/Home/Hero.jsx";
import MerchantSection from "./components/Home/MerchantSection.jsx";
import PlatformSection from "./components/Home/PlatformSection.jsx";
import HowItWorks from "./components/Home/HowItWorks.jsx";
import ImpactSection from "./components/Home/ImpactSection.jsx";
import TestimonialsSection from "./components/Home/TestimonialsSection.jsx";
import FinalCTASection from "./components/Home/FinalCTASection.jsx";

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
        <MerchantSection/>
        <PlatformSection/>
        <HowItWorks/>
        <ImpactSection/>
        <TestimonialsSection/>
        <FinalCTASection/>
    </>
  )
}

export default App
