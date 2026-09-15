import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Topbar from "../components/Dashboard/Topbar.jsx";

const MerchantLayout = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F7F9FB",
            }}
        >
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
                <Outlet />
            </Box>
        </Box>
    );
};

export default MerchantLayout;