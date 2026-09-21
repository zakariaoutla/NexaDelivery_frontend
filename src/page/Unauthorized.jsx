import { Box, Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Config/AuthContext.jsx";
import Navbar from "../components/Home/NavBar.jsx";
import Footer from "../components/Home/Footer.jsx";

const dashboardByRole = {
    ADMIN: "/admin",
    DRIVER: "/driver",
    MERCHANT: "/merchant",
};

export default function Unauthorized() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleBack = () => {
        const dashboardPath =
            dashboardByRole[user?.role] ?? "/";

        navigate(dashboardPath);
    };

    return (
        <>
            <Navbar />

            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#061220",
                    px: 2,
                    py: {
                        xs: 7,
                        md: 9,
                    },
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: {
                            xs: "180px",
                            md: "320px",
                        },
                        height: {
                            xs: "180px",
                            md: "320px",
                        },
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 107, 0, 0.06)",
                        top: "-120px",
                        right: "-90px",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        width: {
                            xs: "160px",
                            md: "280px",
                        },
                        height: {
                            xs: "160px",
                            md: "280px",
                        },
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 107, 0, 0.06)",
                        bottom: "-110px",
                        left: "-80px",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 107, 0, 0.08)",
                        top: "50%",
                        left: "12%",
                        transform: "translateY(-50%)",
                        display: {
                            xs: "none",
                            md: "block",
                        },
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        top: "25%",
                        right: "15%",
                        display: {
                            xs: "none",
                            md: "block",
                        },
                    }}
                />

                <Box
                    sx={{
                        textAlign: "center",
                        maxWidth: "560px",
                        width: "100%",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "64px",
                                sm: "78px",
                                md: "92px",
                            },
                            lineHeight: 1,
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: "-3px",
                        }}
                    >
                        403
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: {
                                xs: "22px",
                                md: "28px",
                            },
                            fontWeight: 800,
                            color: "#FFFFFF",
                        }}
                    >
                        Accès refusé
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.5,
                            mx: "auto",
                            maxWidth: "470px",
                            color: "#94A3B8",
                            fontSize: {
                                xs: "14px",
                                md: "15px",
                            },
                            lineHeight: 1.8,
                        }}
                    >
                        Vous n'avez pas l'autorisation d'accéder
                        à cette page.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{
                            mt: 4,
                            bgcolor: "#FF6B00",
                            color: "#FFFFFF",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: 700,
                            borderRadius: "10px",
                            px: 3.5,
                            py: 1.3,
                            boxShadow:
                                "0 8px 24px rgba(255, 107, 0, 0.18)",
                            transition: "all 0.2s ease",

                            "&:hover": {
                                bgcolor: "#E65F00",
                                boxShadow:
                                    "0 10px 28px rgba(255, 107, 0, 0.28)",
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        Retour au tableau de bord
                    </Button>
                </Box>
            </Box>

            <Footer />
        </>
    );
}