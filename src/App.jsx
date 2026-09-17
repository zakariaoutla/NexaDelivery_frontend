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
import MerchantDashboard from "./page/merchant/MerchantDashboard.jsx";
import DriverDashboard from "./page/DriverDashboard.jsx";
import MerchantLayout from "./layout/MerchantLayout.jsx";
import CreateDelivery from "./page/merchant/CreateDelivery.jsx";
import MyDeliveries from "./page/merchant/MyDeliveries.jsx";
import MerchantProfile from "./page/merchant/MerchantProfile.jsx";
import DeliveryDetails from "./page/merchant/DeliveryDetails.jsx";
import DeliveryTracking from "./page/merchant/DeliveryTracking.jsx";

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


            <Route path="/admin" element={
                <RouteGuard allowedRoles={["ADMIN"]}>
                    <AdminDashboard/>
                </RouteGuard>
            }/>

            <Route path="/merchant" element={<>
               <RouteGuard allowedRoles={["MERCHANT"]}>
                   <MerchantLayout/>
               </RouteGuard>
            </>}>
                <Route index element={<MerchantDashboard/>}/>
                <Route path="deliveries/create" element={<CreateDelivery/>}/>
                <Route path="deliveries" element={<MyDeliveries/>}/>
                <Route path="profile" element={<MerchantProfile/>}/>
                <Route path="deliveries/:id" element={<DeliveryDetails />}
                />
                <Route
                    path="deliveries/:id/tracking"
                    element={<DeliveryTracking />}
                />

            </Route>


            <Route path="/driver" element={<>
            <RouteGuard allowedRoles={["DRIVER"]}>
                <DriverDashboard/>
            </RouteGuard>
            </>}>
                </Route>

        </Routes>

        <ToastContainer position="bottom-right" />

    </>
  )
}

export default App
