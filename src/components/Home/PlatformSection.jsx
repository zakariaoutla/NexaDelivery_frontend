import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

function PlatformSection() {
    const features = [
        {
            icon: <Inventory2RoundedIcon />,
            title: "Gestion des livraisons",
            text: "Créez, organisez et gérez vos livraisons facilement.",
            color: "#FF6B00",
            bg: "#FFF2E8",
        },
        {
            icon: <LocationOnRoundedIcon />,
            title: "Suivi en temps réel",
            text: "Suivez la position et la progression de vos livraisons.",
            color: "#247BFF",
            bg: "#EAF2FF",
        },
        {
            icon: <LockRoundedIcon />,
            title: "Accès sécurisés",
            text: "Chaque utilisateur dispose d'un espace adapté à son rôle.",
            color: "#7C3AED",
            bg: "#F2EAFF",
        },
        {
            icon: <BarChartRoundedIcon />,
            title: "Rapports et statistiques",
            text: "Gardez une vision claire des performances de votre activité.",
            color: "#16B86A",
            bg: "#E9F9F1",
        },
    ];

    return (
        <Box
            id="features"
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#F8FAFC",
                pt: 0,
                pb: { xs: 8, md: 11 },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "0.85fr 1.15fr",
                        },
                        gap: { xs: 6, md: 4 },
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            component="h2"
                            sx={{
                                color: "#0B1F3A",
                                fontSize: {
                                    xs: "34px",
                                    sm: "40px",
                                    md: "43px",
                                },
                                fontWeight: 800,
                                lineHeight: 1.08,
                                letterSpacing: "-1.5px",
                                mb: 2,
                            }}
                        >
                            Tout ce dont vous avez
                            <Box component="span" sx={{ display: "block" }}>
                                besoin, sur{" "}
                                <Box component="span" sx={{ color: "#FF6B00" }}>
                                    une seule
                                </Box>
                            </Box>

                            <Box component="span" sx={{ color: "#FF6B00" }}>
                                plateforme.
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                color: "#64748B",
                                fontSize: "14px",
                                lineHeight: 1.75,
                                maxWidth: "500px",
                                mb: 4,
                            }}
                        >
                            NexaDelivery vous offre un écosystème complet pour gérer,
                            livrer et suivre vos opérations en toute simplicité.
                        </Typography>

                        {/* FEATURES */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                },
                                gap: 1.5,
                            }}
                        >
                            {features.map((feature) => (
                                <Box
                                    key={feature.title}
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #E8EDF3",
                                        borderRadius: "14px",
                                        p: 1.5,
                                        minHeight: "92px",
                                        transition: "0.25s ease",

                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                            boxShadow: "0 12px 30px rgba(11,31,58,0.07)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "38px",
                                            height: "38px",
                                            minWidth: "38px",
                                            borderRadius: "10px",
                                            backgroundColor: feature.bg,
                                            color: feature.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mr: 1.2,

                                            "& svg": {
                                                fontSize: "20px",
                                            },
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "#0B1F3A",
                                                fontSize: "11px",
                                                fontWeight: 800,
                                                mb: 0.5,
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#8490A2",
                                                fontSize: "9px",
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {feature.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* RIGHT VISUAL */}
                    <Box
                        sx={{
                            position: "relative",
                            minHeight: {
                                xs: "400px",
                                md: "530px",
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* BLUE GLOW */}
                        <Box
                            sx={{
                                position: "absolute",
                                width: "430px",
                                height: "430px",
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle, rgba(36,123,255,0.12), rgba(36,123,255,0) 68%)",
                            }}
                        />

                        <Box
                            component="img"
                            src="/Platform-tracking.png"
                            alt="Suivi des livraisons NexaDelivery"
                            sx={{
                                position: "relative",
                                zIndex: 2,
                                width: {
                                    xs: "115%",
                                    sm: "100%",
                                    md: "112%",
                                },
                                maxWidth: "720px",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />

                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default PlatformSection;