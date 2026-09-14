import {
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function ImpactSection() {
    const stats = [
        {
            value: "10K+",
            label: "Commandes livrées",
            growth: "+32% ce mois",
            icon: <Inventory2RoundedIcon />,
            color: "#FF5B1A",
            glow: "rgba(255,91,26,0.30)",
        },
        {
            value: "2K+",
            label: "Livreurs actifs",
            growth: "+18% ce mois",
            icon: <GroupsRoundedIcon />,
            color: "#247BFF",
            glow: "rgba(36,123,255,0.30)",
        },
        {
            value: "500+",
            label: "Commerçants partenaires",
            growth: "+25% ce mois",
            icon: <StorefrontRoundedIcon />,
            color: "#19C774",
            glow: "rgba(25,199,116,0.30)",
        },
        {
            value: "4.8/5",
            label: "Satisfaction client",
            growth: "+12% ce mois",
            icon: <StarRoundedIcon />,
            color: "#8B2CF5",
            glow: "rgba(139,44,245,0.30)",
        },
    ];

    return (
        <Box
            component="section"
            id="impact"
            sx={{
                position: "relative",
                overflow: "hidden",

                background:
                    "linear-gradient(115deg, #061426 0%, #08213D 55%, #07182D 100%)",

                py: { xs: 7, md: 8 },

                borderRadius: {
                    xs: 0,
                    md: "18px",
                },

                mx: {
                    xs: 0,
                    md: 1.5,
                },

                color: "#FFFFFF",
            }}
        >

            <Box
                sx={{
                    position: "absolute",
                    top: "-20px",
                    right: "-40px",

                    width: {
                        xs: "520px",
                        md: "850px",
                    },

                    height: {
                        xs: "420px",
                        md: "520px",
                    },

                    opacity: 0.42,

                    backgroundImage:
                        "radial-gradient(circle, #1685D8 1.4px, transparent 1.4px)",

                    backgroundSize: "10px 10px",

                    maskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 78%)",

                    WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                }}
            />


            <Box
                sx={{
                    position: "absolute",

                    width: "550px",
                    height: "550px",

                    borderRadius: "50%",

                    right: "8%",
                    top: "-270px",

                    background:
                        "radial-gradient(circle, rgba(0,119,255,0.18), transparent 68%)",
                }}
            />

            <Container
                maxWidth="xl"
                sx={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "0.75fr 1.6fr",
                        },

                        gap: {
                            xs: 5,
                            md: 4,
                        },
                    }}
                >

                    <Box>

                        <Box
                            sx={{
                                display: "inline-flex",

                                px: 1.6,
                                py: 0.55,

                                borderRadius: "50px",

                                border: "1px solid rgba(130,183,255,0.45)",

                                bgcolor: "rgba(255,255,255,0.03)",

                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#B8CBE8",
                                    fontSize: "9px",
                                    fontWeight: 700,
                                    letterSpacing: "1.1px",
                                }}
                            >
                                NOTRE IMPACT
                            </Typography>
                        </Box>


                        <Typography
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: "34px",
                                    sm: "39px",
                                    md: "42px",
                                },

                                lineHeight: 1.05,

                                fontWeight: 800,

                                letterSpacing: "-1.2px",

                                maxWidth: "480px",

                                mb: 2,
                            }}
                        >
                            Des chiffres qui
                            <Box
                                component="span"
                                sx={{
                                    display: "block",
                                    color: "#FF651C",
                                }}
                            >
                                parlent d'eux-mêmes.
                            </Box>
                        </Typography>


                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.72)",

                                fontSize: "12px",

                                lineHeight: 1.7,

                                maxWidth: "500px",

                                mb: 4,
                            }}
                        >
                            Chaque jour, nous rapprochons les gens et créons de nouvelles
                            opportunités à travers des livraisons plus rapides et plus fiables.
                        </Typography>


                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardRoundedIcon />}
                            sx={{
                                textTransform: "none",

                                px: 3,
                                py: 1.45,

                                borderRadius: "10px",

                                fontSize: "12px",
                                fontWeight: 700,

                                color: "#FFFFFF",

                                background:
                                    "linear-gradient(90deg, #FF8A24 0%, #FF5526 100%)",

                                boxShadow:
                                    "0 10px 35px rgba(255,101,28,0.28)",

                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg, #FF7717 0%, #F8481D 100%)",

                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            Rejoindre NexaDelivery
                        </Button>
                    </Box>

                    <Box>

                        <Box
                            sx={{
                                display: "grid",

                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(4, 1fr)",
                                },

                                gap: 1.5,
                            }}
                        >
                            {stats.map((stat) => (
                                <Box
                                    key={stat.label}
                                    sx={{
                                        position: "relative",

                                        minHeight: "185px",

                                        p: 1.7,

                                        borderRadius: "13px",

                                        border: "1px solid rgba(101,165,226,0.28)",

                                        background:
                                            "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",

                                        backdropFilter: "blur(12px)",

                                        boxShadow:
                                            "inset 0 1px 0 rgba(255,255,255,0.04)",

                                        transition: "0.25s ease",

                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            borderColor: `${stat.color}80`,
                                        },
                                    }}
                                >

                                    <Box
                                        sx={{
                                            width: "48px",
                                            height: "48px",

                                            borderRadius: "12px",

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            color: "#FFFFFF",

                                            bgcolor: stat.color,

                                            boxShadow: `0 0 22px ${stat.glow}`,

                                            mb: 1.4,

                                            "& svg": {
                                                fontSize: "25px",
                                            },
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>


                                    <Typography
                                        sx={{
                                            fontSize: "28px",
                                            fontWeight: 800,
                                            lineHeight: 1,
                                            mb: 0.7,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>


                                    <Typography
                                        sx={{
                                            fontSize: "10px",
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            mb: 1.1,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        <TrendingUpRoundedIcon
                                            sx={{
                                                fontSize: "15px",
                                                color: "#00E58A",
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: "9px",
                                                color: "#00E58A",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {stat.growth}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>


                        <Box
                            sx={{
                                position: "relative",

                                height: {
                                    xs: "190px",
                                    md: "170px",
                                },

                                mt: 1,
                            }}
                        >

                            <Box
                                component="svg"
                                viewBox="0 0 900 170"
                                preserveAspectRatio="none"
                                sx={{
                                    position: "absolute",

                                    left: 0,
                                    top: 0,

                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="routeGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#FF9A3C" />
                                        <stop offset="50%" stopColor="#FFB867" />
                                        <stop offset="100%" stopColor="#FF651C" />
                                    </linearGradient>

                                    <filter id="routeGlow">
                                        <feGaussianBlur
                                            stdDeviation="4"
                                            result="coloredBlur"
                                        />

                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <path
                                    d="
                    M 120 95
                    C 260 5, 340 150, 480 100
                    S 680 10, 760 75
                  "
                                    fill="none"
                                    stroke="url(#routeGradient)"
                                    strokeWidth="3"
                                    filter="url(#routeGlow)"
                                />
                            </Box>


                            <Box
                                sx={{
                                    position: "absolute",

                                    left: "6%",
                                    bottom: "35px",

                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.7,
                                }}
                            >
                                <LocationOnRoundedIcon
                                    sx={{
                                        color: "#55B7FF",
                                        fontSize: "23px",

                                        filter:
                                            "drop-shadow(0 0 7px rgba(85,183,255,.7))",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                    }}
                                >
                                    Dakhla
                                </Typography>
                            </Box>


                            <Box
                                sx={{
                                    position: "absolute",

                                    right: "27%",
                                    top: "50px",

                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.7,
                                }}
                            >
                                <LocationOnRoundedIcon
                                    sx={{
                                        color: "#FF7A1C",
                                        fontSize: "23px",

                                        filter:
                                            "drop-shadow(0 0 7px rgba(255,122,28,.7))",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                    }}
                                >
                                    Tanger
                                </Typography>
                            </Box>


                            <Box
                                sx={{
                                    position: "absolute",

                                    right: {
                                        xs: "0",
                                        md: "0",
                                    },

                                    bottom: {
                                        xs: "10px",
                                        md: "8px",
                                    },

                                    textAlign: "right",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#FFFFFF",

                                        fontFamily: "cursive",

                                        fontStyle: "italic",

                                        fontSize: {
                                            xs: "16px",
                                            md: "19px",
                                        },

                                        lineHeight: 1.1,

                                        transform: "rotate(-5deg)",
                                    }}
                                >
                                    Des livraisons qui
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",

                                        fontFamily: "cursive",

                                        fontStyle: "italic",

                                        fontSize: {
                                            xs: "16px",
                                            md: "19px",
                                        },

                                        lineHeight: 1.1,

                                        transform: "rotate(-5deg)",
                                    }}
                                >
                                    connectent le Maroc
                                </Typography>

                                <Box
                                    sx={{
                                        width: "110px",
                                        height: "4px",

                                        bgcolor: "#FF651C",

                                        borderRadius: "10px",

                                        ml: "auto",
                                        mt: 1,

                                        transform: "rotate(-9deg)",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ImpactSection;