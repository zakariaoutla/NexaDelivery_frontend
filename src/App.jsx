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
import Register from "./page/Register.jsx";
import {ToastContainer} from "react-toastify";
import RouteGuard from "./Config/RouteGuard.jsx";
import AdminDashboard from "./page/AdminDashboard.jsx";
import MerchantDashboard from "./page/MerchantDashboard.jsx";
import DriverDashboard from "./page/DriverDashboard.jsx";

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
            <Route path="/register" element={<Register/>}/>


            <Route path="/admin" element={<>
                <RouteGuard allowedRoles={["ADMIN"]}>
                    <AdminDashboard/>
                </RouteGuard>

            </>}/>

            <Route path="/merchant" element={<>
               <RouteGuard allowedRoles={["MERCHANT"]}>
                   <MerchantDashboard/>
               </RouteGuard>
            </>}/>

            <Route path="/driver" element={<>
            <RouteGuard allowedRoles={["DRIVER"]}>
                <DriverDashboard/>
            </RouteGuard>
            </>}/>
        </Routes>

        <ToastContainer position="bottom-right" />

    </>
  )
}

export default App
