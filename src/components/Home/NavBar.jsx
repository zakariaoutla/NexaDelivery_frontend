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
import {NavLink, useNavigate} from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { label: "Accueil", href: "#home", active: true },
        { label: "Fonctionnalités", href: "#features" },
        { label: "Pourquoi ?", href: "#why-us" },
        { label: "À propos", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <AppBar
                position="absolute"
                elevation={0}
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    zIndex: 9999,
                    left: 0,
                    right: 0,
                    width: "100%",
                    pointerEvents: "auto",
                }}
            >
                <Toolbar
                    sx={{
                        width: "100%",
                        maxWidth: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "1200px",
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
                    }}
                >
                    <Box
                        component="img"
                        src="/logonexadelivry.png"
                        alt="NexaDelivery"
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
                                href={link.href}
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

                                    ...(link.active && {
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",

                                            bottom: "1px",
                                            left: "50%",

                                            transform: "translateX(-50%)",

                                            width: "80%",
                                            height: "2px",

                                            borderRadius: "10px",

                                            backgroundColor: "#FF6B00",
                                        },
                                    }),
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
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                },
                            }}
                        >
                            Se connecter
                        </Button>

                        <Button
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
                PaperProps={{
                    sx: {
                        width: "280px",
                        backgroundColor: "#08182C",
                        color: "#FFFFFF",
                        p: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Box
                        component="img"
                        src="/logonexadelivry.png"
                        alt="NexaDelivery"
                        sx={{
                            width: "155px",
                            height: "auto",
                        }}
                    />

                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: "#FFFFFF",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack spacing={1.3}>
                    {navLinks.map((link) => (
                        <Button
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            sx={{
                                justifyContent: "flex-start",

                                color: "#FFFFFF",

                                textTransform: "none",

                                fontWeight: 500,
                                fontSize: "15px",

                                py: 1.1,
                                px: 1,

                                borderRadius: "8px",

                                "&:hover": {
                                    color: "#FF6B00",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                },
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}

                    <Box
                        sx={{
                            height: "1px",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            my: 2,
                        }}
                    />

                    <Button
                        to="/login"
                        variant="outlined"
                        sx={{
                            color: "#FFFFFF",

                            borderColor: "rgba(255,255,255,0.5)",

                            textTransform: "none",

                            borderRadius: "10px",

                            py: 1.2,

                            "&:hover": {
                                borderColor: "#FFFFFF",
                                backgroundColor: "rgba(255,255,255,0.06)",
                            },
                        }}
                    >
                        Se connecter
                    </Button>

                    <Button

                        variant="contained"
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