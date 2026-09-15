import Sidebar from "../components/Dashboard/Sidebar.jsx";
import {Box} from "@mui/material";

export default function MerchantDashboard(){
    return(
        <>

            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F5F7FB",
                }}
            >
                <Sidebar />

                <Box
                    sx={{
                        ml: {
                            xs: 0,
                            md: "260px",
                        },

                        pb: {
                            xs: "85px",
                            md: 0,
                        },

                        p: {
                            xs: 2,
                            md: 4,
                        },
                    }}
                >
                    Merchant Dashboard
                </Box>
            </Box>
        </>
    )
}