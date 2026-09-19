import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Topbar from "../components/Dashboard/Topbar.jsx";
import DriverLocationTracker from "../components/Dashboard/DriverLocationTracker.jsx";

import { AuthContext } from "../Config/AuthContext.jsx";
import { getMyDriverProfile } from "../api/driverService.js";

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);

    const [driverStatus, setDriverStatus] =
        useState(null);


    useEffect(() => {

        if (user?.role !== "DRIVER") {
            setDriverStatus(null);
            return;
        }

        const fetchDriverStatus = async () => {

            try {

                const response =
                    await getMyDriverProfile();

                setDriverStatus(
                    response.data.driverStatus
                );

            } catch (error) {

                console.error(
                    "Erreur récupération statut driver:",
                    error
                );
            }
        };

        fetchDriverStatus();

    }, [user?.role]);


    return (

        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F7F9FB",
            }}
        >

            {user?.role === "DRIVER" && (

                <DriverLocationTracker
                    driverStatus={driverStatus}
                />

            )}

            <Sidebar />

            <Topbar />

            <Box
                component="main"
                sx={{
                    ml: {
                        xs: 0,
                        md: "260px",
                    },

                    pt: {
                        xs: "92px",
                        md: "96px",
                    },

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    pb: {
                        xs: "90px",
                        md: 4,
                    },

                    minHeight: "100vh",
                    boxSizing: "border-box",
                }}
            >

                <Outlet
                    context={{
                        driverStatus,
                        setDriverStatus,
                    }}
                />

            </Box>

        </Box>
    );
};

export default DashboardLayout;