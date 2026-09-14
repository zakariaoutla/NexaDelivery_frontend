import { Box, Container, Typography } from "@mui/material";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: <StorefrontRoundedIcon />,
            title: "Le commerçant crée une commande",
            description:
                "Il ajoute les détails, l'adresse et prépare la commande.",
            color: "#FF5B1A",
            lightColor: "#FFE1D3",
            label: "Commande créée",
        },
        {
            number: "02",
            icon: <TwoWheelerRoundedIcon />,
            title: "Un livreur accepte la livraison",
            description:
                "Le livreur le plus proche est notifié et récupère la commande.",
            color: "#247BFF",
            lightColor: "#DDEBFF",
            label: "En route",
        },
        {
            number: "03",
            icon: <LocationOnRoundedIcon />,
            title: "Suivi en temps réel",
            description:
                "Suivez le trajet de votre commande sur la carte en toute simplicité.",
            color: "#12B76A",
            lightColor: "#D9F8E9",
            label: "À proximité",
        },
        {
            number: "04",
            icon: <Inventory2RoundedIcon />,
            title: "Livraison réussie",
            description:
                "Le client reçoit sa commande et profite de son expérience.",
            color: "#7C2CF3",
            lightColor: "#EAD9FF",
            label: "Livré !",
        },
    ];

    return (
        <Box
            component="section"
            id="how-it-works"
            sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                pt: { xs: 1, md: 2 },
                pb: { xs: 8, md: 10 },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "420px",
                    height: "420px",
                    borderRadius: "50%",
                    bgcolor: "#F6F9FF",
                    right: "-300px",
                    top: "20px",
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    bgcolor: "#F8FAFF",
                    left: "-230px",
                    bottom: "-120px",
                    zIndex: 0,
                }}
            />

            <Container
                maxWidth="xl"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >

                <Box
                    sx={{
                        textAlign: "center",
                        mb: { xs: 5, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",

                            px: 2,
                            py: 0.65,

                            border: "1px solid #FFD2BD",
                            bgcolor: "#FFF8F4",

                            borderRadius: "50px",

                            mb: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FF5B1A",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "1px",
                            }}
                        >
                            COMMENT ÇA MARCHE ?
                        </Typography>
                    </Box>

                    <Typography
                        component="h2"
                        sx={{
                            color: "#0B1F3A",

                            fontSize: {
                                xs: "32px",
                                sm: "39px",
                                md: "44px",
                            },

                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-1.5px",
                        }}
                    >
                        De la commande à la livraison,
                        <Box
                            component="span"
                            sx={{
                                display: "block",
                                color: "#FF5B1A",
                            }}
                        >
                            en quelques étapes.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: "#7583A3",
                            fontSize: { xs: "12px", md: "14px" },
                            mt: 2,
                        }}
                    >
                        Un processus simple et transparent, de la création de la livraison
                        jusqu'à sa destination.
                    </Typography>
                </Box>


                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)",
                        },

                        gap: {
                            xs: 2,
                            md: 2,
                        },

                        position: "relative",
                        zIndex: 3,
                    }}
                >
                    {steps.map((step) => (
                        <Box
                            key={step.number}
                            sx={{
                                bgcolor: "#FFFFFF",

                                border: "1px solid #E6EDF7",

                                borderRadius: "14px",

                                minHeight: {
                                    xs: "155px",
                                    md: "145px",
                                },

                                p: {
                                    xs: 2,
                                    md: 2.2,
                                },

                                display: "flex",
                                gap: 2,

                                boxShadow: "0 8px 28px rgba(40,75,130,0.07)",

                                transition: "all 0.25s ease",

                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 15px 35px rgba(40,75,130,0.12)",
                                },
                            }}
                        >

                            <Box
                                sx={{
                                    width: {
                                        xs: "62px",
                                        md: "65px",
                                    },

                                    height: {
                                        xs: "62px",
                                        md: "65px",
                                    },

                                    minWidth: {
                                        xs: "62px",
                                        md: "65px",
                                    },

                                    borderRadius: "14px",

                                    bgcolor: step.lightColor,
                                    color: step.color,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    "& svg": {
                                        fontSize: "31px",
                                    },
                                }}
                            >
                                {step.icon}
                            </Box>


                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        color: "#B7C9EF",

                                        fontSize: {
                                            xs: "27px",
                                            md: "30px",
                                        },

                                        fontWeight: 800,

                                        lineHeight: 1,

                                        mb: 0.8,
                                    }}
                                >
                                    {step.number}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#071B48",

                                        fontSize: {
                                            xs: "12px",
                                            md: "11px",
                                        },

                                        fontWeight: 800,

                                        lineHeight: 1.35,

                                        mb: 0.8,
                                    }}
                                >
                                    {step.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#7583A3",

                                        fontSize: {
                                            xs: "10px",
                                            md: "9px",
                                        },

                                        lineHeight: 1.55,
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>



                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "block",
                        },

                        position: "relative",

                        height: "115px",

                        mt: "-2px",
                    }}
                >

                    <Box
                        component="svg"
                        viewBox="0 0 1200 100"
                        preserveAspectRatio="none"
                        sx={{
                            position: "absolute",

                            top: 0,
                            left: 0,

                            width: "100%",
                            height: "85px",

                            overflow: "visible",
                        }}
                    >
                        <path
                            d="
                M 70 35
                C 150 5, 210 75, 300 40
                S 450 10, 540 48
                S 700 80, 790 35
                S 930 10, 1010 43
                S 1120 65, 1170 45
              "
                            fill="none"
                            stroke="#8EB0F7"
                            strokeWidth="2"
                            strokeDasharray="5 6"
                        />
                    </Box>


                    <RoutePoint
                        left="6%"
                        top="19px"
                        color={steps[0].color}
                        lightColor={steps[0].lightColor}
                        label={steps[0].label}
                    />


                    <RoutePoint
                        left="31%"
                        top="25px"
                        color={steps[1].color}
                        lightColor={steps[1].lightColor}
                        label={steps[1].label}
                    />


                    <RoutePoint
                        left="64%"
                        top="18px"
                        color={steps[2].color}
                        lightColor={steps[2].lightColor}
                        label={steps[2].label}
                    />


                    <RoutePoint
                        left="89%"
                        top="24px"
                        color={steps[3].color}
                        lightColor={steps[3].lightColor}
                        label={steps[3].label}
                    />
                </Box>


                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            md: "none",
                        },

                        justifyContent: "space-between",
                        alignItems: "center",

                        mt: 4,
                    }}
                >
                    {steps.map((step, index) => (
                        <Box
                            key={step.number}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flex: index === steps.length - 1 ? "initial" : 1,
                            }}
                        >
                            <Box
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        bgcolor: step.color,

                                        border: "5px solid #FFFFFF",

                                        boxShadow: `0 0 0 5px ${step.lightColor}`,

                                        mx: "auto",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: step.color,

                                        fontSize: "8px",
                                        fontWeight: 700,

                                        mt: 1.5,

                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {step.label}
                                </Typography>
                            </Box>

                            {index < steps.length - 1 && (
                                <Box
                                    sx={{
                                        flex: 1,

                                        borderTop: "2px dashed #A9BFF0",

                                        mx: 1,

                                        mb: 2.5,
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

function RoutePoint({
                        left,
                        top,
                        color,
                        lightColor,
                        label,
                    }) {
    return (
        <Box
            sx={{
                position: "absolute",

                left,
                top,

                transform: "translateX(-50%)",

                textAlign: "center",
            }}
        >

            <Box
                sx={{
                    width: "21px",
                    height: "21px",

                    borderRadius: "50%",

                    bgcolor: color,

                    border: "6px solid #FFFFFF",

                    boxShadow: `0 0 0 7px ${lightColor}`,

                    mx: "auto",
                }}
            />


            <Typography
                sx={{
                    color,

                    fontSize: "15px",

                    fontWeight: 500,

                    fontFamily: "cursive",

                    fontStyle: "italic",

                    whiteSpace: "nowrap",

                    mt: 1.5,

                    transform: "rotate(-4deg)",
                }}
            >
                {label}
            </Typography>
        </Box>
    );
}

export default HowItWorks;