import {
    Box,
    Container,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function Footer() {
    const links = {
        navigation: [
            "Accueil",
            "Fonctionnalités",
            "Comment Ça Marche",
            "Suivi colis",
            "Contact",
        ],
        platform: [
            "Se connecter",
            "Commencer",
            "Suivi des livraisons",
            "Espace commerçant",
            "Espace livreur",
        ],
    };

    return (
        <Box
            component="footer"
            sx={{
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(115deg, #061426 0%, #0B1F3A 55%, #0D2948 100%)",
                color: "#FFFFFF",
                pt: { xs: 6, md: 7 },
                pb: 2.5,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "320px",
                    height: "320px",
                    borderRadius: "50%",
                    right: "-180px",
                    top: "-160px",
                    background:
                        "radial-gradient(circle, rgba(255,107,0,0.18), transparent 68%)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    left: "-170px",
                    bottom: "-160px",
                    background:
                        "radial-gradient(circle, rgba(36,123,255,0.14), transparent 68%)",
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1.4fr 1fr",
                            md: "1.5fr 0.8fr 0.9fr 1.2fr",
                        },
                        gap: { xs: 4, md: 5 },
                        pb: 5,
                    }}
                >
                    <Box>
                        <Box
                            component="img"
                            src="/logonexadelivry.png"
                            alt="NexaDelivery"
                            sx={{
                                width: { xs: "180px", md: "210px" },
                                height: "auto",
                                objectFit: "contain",
                                mb: 2,
                            }}
                        />

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                                fontSize: "11px",
                                lineHeight: 1.8,
                                maxWidth: "330px",
                            }}
                        >
                            Une plateforme simple et moderne pour gérer, suivre et
                            optimiser vos livraisons en toute confiance.
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
                            {[FacebookRoundedIcon, InstagramIcon, LinkedInIcon].map(
                                (Icon, index) => (
                                    <IconButton
                                        key={index}
                                        sx={{
                                            width: "36px",
                                            height: "36px",
                                            color: "#FFFFFF",
                                            border: "1px solid rgba(255,255,255,0.13)",
                                            bgcolor: "rgba(255,255,255,0.05)",

                                            "&:hover": {
                                                bgcolor: "#FF6B00",
                                                borderColor: "#FF6B00",
                                            },
                                        }}
                                    >
                                        <Icon sx={{ fontSize: "17px" }} />
                                    </IconButton>
                                )
                            )}
                        </Stack>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Navigation
                        </Typography>

                        <Stack spacing={1.3}>
                            {links.navigation.map((item) => (
                                <Typography
                                    key={item}
                                    component="a"
                                    href=""
                                    sx={{
                                        color: "rgba(255,255,255,0.60)",
                                        fontSize: "10px",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        width: "fit-content",
                                        transition: "0.2s ease",

                                        "&:hover": {
                                            color: "#FF6B00",
                                            transform: "translateX(3px)",
                                        },
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Plateforme
                        </Typography>

                        <Stack spacing={1.3}>
                            {links.platform.map((item) => (
                                <Typography
                                    key={item}
                                    component="a"
                                    href="#"
                                    sx={{
                                        color: "rgba(255,255,255,0.60)",
                                        fontSize: "10px",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        width: "fit-content",
                                        transition: "0.2s ease",

                                        "&:hover": {
                                            color: "#FF6B00",
                                            transform: "translateX(3px)",
                                        },
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Contact
                        </Typography>

                        <Stack spacing={1.7}>
                            <Stack direction="row" spacing={1.2} alignItems="center">
                                <MailOutlineRoundedIcon
                                    sx={{
                                        color: "#FF6B00",
                                        fontSize: "17px",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.62)",
                                        fontSize: "10px",
                                    }}
                                >
                                    contact@nexadelivery.ma
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1.2} alignItems="center">
                                <PhoneRoundedIcon
                                    sx={{
                                        color: "#FF6B00",
                                        fontSize: "17px",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.62)",
                                        fontSize: "10px",
                                    }}
                                >
                                    +212 6 07523048
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1.2} alignItems="center">
                                <LocationOnRoundedIcon
                                    sx={{
                                        color: "#FF6B00",
                                        fontSize: "17px",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.62)",
                                        fontSize: "10px",
                                    }}
                                >
                                    Maroc
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        borderColor: "rgba(255,255,255,0.09)",
                    }}
                />

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1.5}
                    sx={{
                        pt: 2.5,
                    }}
                >
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.45)",
                            fontSize: "9px",
                        }}
                    >
                        © 2026 NexaDelivery. Tous droits réservés.
                    </Typography>

                    <Stack direction="row" spacing={2.5}>
                        <Typography
                            component="a"
                            href="#"
                            sx={{
                                color: "rgba(255,255,255,0.45)",
                                fontSize: "9px",
                                textDecoration: "none",

                                "&:hover": {
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            Confidentialité
                        </Typography>

                        <Typography
                            component="a"
                            href="#"
                            sx={{
                                color: "rgba(255,255,255,0.45)",
                                fontSize: "9px",
                                textDecoration: "none",

                                "&:hover": {
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            Conditions d’utilisation
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}

export default Footer;