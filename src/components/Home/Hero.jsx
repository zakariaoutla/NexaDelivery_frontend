import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function Hero() {
    const benefits = [
        {
            icon: <BoltRoundedIcon />,
            title: "Plus rapide",
            text: "Affectation et suivi\nsimplifiés",
            color: "#FF6B00",
            background: "rgba(255,107,0,0.12)",
            border: "rgba(255,107,0,0.55)",
        },
        {
            icon: <ShieldRoundedIcon />,
            title: "Plus sécurisé",
            text: "Accès et données protégés",
            color: "#27D17F",
            background: "rgba(39,209,127,0.12)",
            border: "rgba(39,209,127,0.45)",
        },
        {
            icon: <GroupsRoundedIcon />,
            title: "Plus humain",
            text: "Commerçants et livreurs\nconnectés",
            color: "#2684FF",
            background: "rgba(38,132,255,0.12)",
            border: "rgba(38,132,255,0.5)",
        },
    ];

    return (
        <Box
            id="home"
            component="section"
            sx={{
                position: "relative",

                minHeight: {
                    xs: "760px",
                    sm: "760px",
                    md: "720px",
                    lg: "760px",
                    xl: "820px",
                },

                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                bgcolor: "#03101E",
            }}
        >
            <Box
                component="img"
                src="/Hero_bg.png"
                alt=""
                sx={{
                    position: "absolute",
                    inset: 0,

                    width: "100%",
                    height: "100%",

                    objectFit: "cover",

                    objectPosition: {
                        xs: "72% 58%",
                        sm: "68% 58%",
                        md: "62% 58%",
                        lg: "60% 42%",
                        xl: "40% 30%",
                    },

                    zIndex: 0,
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents:"none",

                    background: {
                        xs: `
              linear-gradient(
                90deg,
                rgba(3,16,30,0.98) 0%,
                rgba(3,16,30,0.94) 45%,
                rgba(3,16,30,0.65) 75%,
                rgba(3,16,30,0.35) 100%
              )
            `,

                        md: `
              linear-gradient(
                90deg,
                rgba(3,16,30,0.98) 0%,
                rgba(3,16,30,0.94) 28%,
                rgba(3,16,30,0.68) 52%,
                rgba(3,16,30,0.12) 78%,
                rgba(3,16,30,0.05) 100%
              )
            `,
                    },
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,

                    display: {
                        xs: "block",
                        md: "none",
                    },

                    bgcolor: "rgba(2,14,27,0.25)",
                }}
            />

            <Container
                maxWidth={false}
                sx={{
                    position: "relative",
                    zIndex: 2,
                    px: {
                        xs: 2.5,
                        sm: 4,
                        md: 6,
                        lg: 8,
                        xl: 10,
                    },

                    pt: {
                        xs: 14,
                        md: 10,
                    },

                    pb: {
                        xs: 8,
                        md: 4,
                    },
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "620px",
                            md: "570px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",

                            border: "1px solid rgba(135,190,230,0.5)",
                            borderRadius: "50px",

                            px: 2,
                            py: 0.7,
                            mb: 2.5,

                            bgcolor: "rgba(7,27,45,0.45)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#C8D4DF",
                                fontSize: "10px",
                                fontWeight: 500,
                                letterSpacing: "0.3px",
                                textTransform: "uppercase",
                            }}
                        >
                            Des livraisons plus simples, pour tous
                        </Typography>
                    </Box>

                    <Typography
                        component="h1"
                        sx={{
                            color: "#FFFFFF",

                            fontSize: {
                                xs: "42px",
                                sm: "52px",
                                md: "55px",
                                lg: "58px",
                            },

                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: "-2px",

                            mb: 3,
                        }}
                    >
                        Plus qu’une livraison,

                        <Box
                            component="span"
                            sx={{
                                display: "block",
                                color: "#FF6B00",
                            }}
                        >
                            une confiance
                        </Box>

                        à chaque étape.
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: "500px",

                            color: "rgba(255,255,255,0.68)",

                            fontSize: {
                                xs: "14px",
                                md: "14px",
                            },

                            lineHeight: 1.8,

                            mb: 4,
                        }}
                    >
                        NexaDelivery rapproche les commerçants et les livreurs grâce à une
                        technologie simple, rapide et sécurisée.
                    </Typography>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={{
                            xs: 2,
                            sm: 3,
                        }}
                        sx={{
                            mb: 4,
                        }}
                    >
                        {benefits.map((item) => (
                            <Box
                                key={item.title}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",

                                    minWidth: {
                                        sm: "150px",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "42px",
                                        height: "42px",
                                        minWidth: "42px",

                                        borderRadius: "12px",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        color: item.color,
                                        bgcolor: item.background,
                                        border: `1px solid ${item.border}`,

                                        "& svg": {
                                            fontSize: "23px",
                                        },
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <Box sx={{ ml: 1.3 }}>
                                    <Typography
                                        sx={{
                                            color: "#FFFFFF",
                                            fontWeight: 700,
                                            fontSize: "11px",
                                            mb: 0.5,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "rgba(255,255,255,0.5)",
                                            fontSize: "9px",
                                            lineHeight: 1.45,
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {item.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={1.5}
                        sx={{
                            alignItems: {
                                xs: "stretch",
                                sm: "center",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardRoundedIcon />}
                            disableElevation
                            sx={{
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",

                                textTransform: "none",

                                fontSize: "13px",
                                fontWeight: 600,

                                borderRadius: "11px",

                                px: 2.7,
                                py: 1.35,

                                "&:hover": {
                                    bgcolor: "#E85F00",
                                },
                            }}
                        >
                            Découvrir la plateforme
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                color: "#FFFFFF",

                                borderColor: "rgba(255,255,255,0.5)",

                                textTransform: "none",

                                fontSize: "13px",
                                fontWeight: 500,

                                borderRadius: "11px",

                                px: 3,
                                py: 1.25,

                                "&:hover": {
                                    color: "#FFFFFF",
                                    borderColor: "#FFFFFF",
                                    bgcolor: "rgba(255,255,255,0.07)",
                                },
                            }}
                        >
                            Se connecter
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default Hero;