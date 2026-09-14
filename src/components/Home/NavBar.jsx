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

function Navbar() {
    const [open, setOpen] = useState(false);

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
                    zIndex: 1000,
                }}
            >
                <Toolbar
                    sx={{
                        maxWidth: "1200px",
                        width: "100%",
                        mx: "auto",
                        minHeight: "78px !important",
                        px: { xs: 2, md: 3 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        component="img"
                        src="/logonexadelivry.png"
                        alt="NexaDelivery"
                        sx={{
                            width: {
                                xs: "145px",
                                sm: "160px",
                                md: "175px",
                            },
                            height: "auto",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    />

                    {/* DESKTOP NAVIGATION */}
                    <Stack
                        direction="row"
                        spacing={3.5}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            ml: "auto",
                            mr: 5,
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
                                    fontSize: "13px",
                                    minWidth: "auto",
                                    px: 0,
                                    py: 1,

                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        color: "#FF6B00",
                                    },

                                    ...(link.active && {
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: "2px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "100%",
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

                    {/* DESKTOP ACTIONS */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#FFFFFF",
                                borderColor: "rgba(255,255,255,0.55)",
                                textTransform: "none",
                                fontSize: "13px",
                                fontWeight: 500,
                                px: 2.5,
                                py: 1,
                                borderRadius: "10px",
                                minWidth: "110px",

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
                                fontSize: "13px",
                                fontWeight: 600,
                                px: 2.7,
                                py: 1,
                                borderRadius: "10px",
                                minWidth: "105px",

                                "&:hover": {
                                    backgroundColor: "#E85F00",
                                },
                            }}
                        >
                            Commencer
                        </Button>
                    </Stack>

                    {/* MOBILE BUTTON */}
                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{
                            display: { xs: "flex", md: "none" },
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
                        justifyContent: "flex-end",
                        mb: 3,
                    }}
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: "#FFFFFF",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack spacing={1.5}>
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
                                py: 1,

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
                        variant="outlined"
                        sx={{
                            color: "#FFFFFF",
                            borderColor: "rgba(255,255,255,0.5)",
                            textTransform: "none",
                            borderRadius: "10px",

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