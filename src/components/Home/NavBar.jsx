import { useState } from "react";

import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        {
            label: "Accueil",
            path: "/",
            section: "home",
        },
        {
            label: "Fonctionnalités",
            path: "/",
            section: "features",
        },
        {
            label: "Comment ça marche",
            path: "/",
            section: "how-it-works",
        },
        {
            label: "Suivi colis",
            path: "/tracking",
        },
        {
            label: "Contact",
            path: "/",
            section: "contact",
        },
    ];

    const handleNavigation = (link) => {
        setOpen(false);

        if (!link.section) {
            navigate(link.path);
            return;
        }

        if (window.location.pathname === "/") {
            const section = document.getElementById(link.section);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }

            return;
        }

        navigate(`/#${link.section}`);

        setTimeout(() => {
            const section = document.getElementById(link.section);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 100);
    };

    const handleLogoClick = () => {
        setOpen(false);

        if (window.location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        navigate("/");
    };

    return (
        <>
            <AppBar
                position="absolute"
                elevation={0}
                sx={{
                    backgroundColor: {
                        xs: "#061220",
                        md: "transparent",
                    },
                    boxShadow: {
                        xs: "0 4px 20px rgba(0,0,0,0.15)",
                        md: "none",
                    },
                    zIndex: 9999,
                    left: 0,
                    right: 0,
                    width: "100%",
                }}
            >
                <Toolbar
                    sx={{
                        width: "100%",
                        maxWidth: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "1150px",
                            xl: "1380px",
                        },
                        mx: "auto",
                        minHeight: {
                            xs: "78px !important",
                            md: "88px !important",
                        },
                        px: {
                            xs: 2.5,
                            sm: 3,
                            md: 4,
                            lg: 5,
                            xl: 6,
                        },
                        display: "flex",
                        alignItems: "center",
                        boxSizing: "border-box",
                    }}
                >
                    <Box
                        component="img"
                        src="/logonexadelivry.png"
                        alt="NexaDelivery"
                        onClick={handleLogoClick}
                        sx={{
                            width: {
                                xs: "155px",
                                sm: "175px",
                                md: "195px",
                                lg: "210px",
                                xl: "220px",
                            },
                            height: "auto",
                            display: "block",
                            objectFit: "contain",
                            flexShrink: 0,
                            cursor: "pointer",
                        }}
                    />

                    <Stack
                        direction="row"
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            alignItems: "center",
                            ml: "auto",
                            mr: {
                                md: 2.5,
                                lg: 4,
                                xl: 5,
                            },
                            gap: {
                                md: 1.8,
                                lg: 2.8,
                                xl: 3.5,
                            },
                        }}
                    >
                        {navLinks.map((link) => (
                            <Button
                                key={link.label}
                                onClick={() => handleNavigation(link)}
                                disableRipple
                                sx={{
                                    position: "relative",
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    fontSize: {
                                        md: "11px",
                                        lg: "12px",
                                        xl: "13px",
                                    },
                                    minWidth: "auto",
                                    px: 0.4,
                                    py: 1,
                                    whiteSpace: "nowrap",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "#FF6B00",
                                    },
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.2}
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            alignItems: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Button
                            component={NavLink}
                            to="/login"
                            variant="outlined"
                            sx={{
                                color: "#FFFFFF",
                                borderColor: "rgba(255,255,255,0.55)",
                                textTransform: "none",
                                fontSize: {
                                    md: "10px",
                                    lg: "11px",
                                    xl: "12px",
                                },
                                fontWeight: 500,
                                px: {
                                    md: 1.6,
                                    lg: 2,
                                    xl: 2.5,
                                },
                                py: 1,
                                borderRadius: "10px",
                                minWidth: {
                                    md: "95px",
                                    lg: "100px",
                                    xl: "110px",
                                },
                                "&:hover": {
                                    borderColor: "#FFFFFF",
                                    backgroundColor:
                                        "rgba(255,255,255,0.08)",
                                },
                            }}
                        >
                            Se connecter
                        </Button>

                        <Button
                            component={NavLink}
                            to="/register"
                            variant="contained"
                            disableElevation
                            sx={{
                                backgroundColor: "#FF6B00",
                                color: "#FFFFFF",
                                textTransform: "none",
                                fontSize: {
                                    md: "10px",
                                    lg: "11px",
                                    xl: "12px",
                                },
                                fontWeight: 600,
                                px: {
                                    md: 1.6,
                                    lg: 2,
                                    xl: 2.5,
                                },
                                py: 1,
                                borderRadius: "10px",
                                minWidth: {
                                    md: "90px",
                                    lg: "95px",
                                    xl: "105px",
                                },
                                "&:hover": {
                                    backgroundColor: "#E85F00",
                                },
                            }}
                        >
                            Commencer
                        </Button>
                    </Stack>

                    <IconButton
                        onClick={() => setOpen(true)}
                        aria-label="Ouvrir le menu"
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                            color: "#FFFFFF",
                            ml: "auto",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: {
                                xs: "82%",
                                sm: "340px",
                            },
                            maxWidth: "340px",
                            height: "100%",
                            backgroundColor: "#061220",
                            backgroundImage: "none",
                            color: "#FFFFFF",
                            px: 3,
                            py: 2.5,
                            boxSizing: "border-box",
                        },
                    },
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.65)",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/logonexadelivry.png"
                        alt="NexaDelivery"
                        onClick={handleLogoClick}
                        sx={{
                            width: "150px",
                            height: "auto",
                            display: "block",
                            cursor: "pointer",
                        }}
                    />

                    <IconButton
                        onClick={() => setOpen(false)}
                        aria-label="Fermer le menu"
                        sx={{
                            color: "#FFFFFF",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack
                    spacing={0.8}
                    sx={{
                        width: "100%",
                    }}
                >
                    {navLinks.map((link) => (
                        <Button
                            key={link.label}
                            onClick={() => handleNavigation(link)}
                            sx={{
                                width: "100%",
                                justifyContent: "flex-start",
                                color: "#FFFFFF",
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "15px",
                                px: 1.5,
                                py: 1.3,
                                borderRadius: "8px",
                                "&:hover": {
                                    color: "#FF6B00",
                                    backgroundColor:
                                        "rgba(255,255,255,0.05)",
                                },
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Stack>

                <Box
                    sx={{
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.12)",
                        my: 3,
                    }}
                />

                <Stack spacing={1.5}>
                    <Button
                        component={NavLink}
                        to="/login"
                        onClick={() => setOpen(false)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            color: "#FFFFFF",
                            borderColor: "rgba(255,255,255,0.5)",
                            textTransform: "none",
                            borderRadius: "10px",
                            py: 1.2,
                            "&:hover": {
                                borderColor: "#FFFFFF",
                                backgroundColor:
                                    "rgba(255,255,255,0.06)",
                            },
                        }}
                    >
                        Se connecter
                    </Button>

                    <Button
                        component={NavLink}
                        to="/register"
                        onClick={() => setOpen(false)}
                        variant="contained"
                        fullWidth
                        disableElevation
                        sx={{
                            backgroundColor: "#FF6B00",
                            color: "#FFFFFF",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "10px",
                            py: 1.2,
                            "&:hover": {
                                backgroundColor: "#E85F00",
                            },
                        }}
                    >
                        Commencer
                    </Button>
                </Stack>
            </Drawer>
        </>
    );
}

export default Navbar;