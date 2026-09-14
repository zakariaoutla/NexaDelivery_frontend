import {
    Box,
    Container,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

function TestimonialsSection() {
    const testimonials = [
        {
            name: "Yassine B.",
            role: "Commerçant",
            initials: "YB",
            text: "NexaDelivery m’aide à mieux organiser mes livraisons et à suivre chaque commande plus facilement.",
            rating: 5,
        },
        {
            name: "Sara A.",
            role: "Commerçante",
            initials: "SA",
            text: "La plateforme est simple, rapide et très pratique pour garder une vision claire de mes livraisons.",
            rating: 5,
        },
        {
            name: "Mehdi R.",
            role: "Partenaire",
            initials: "MR",
            text: "Le suivi en temps réel apporte beaucoup de confiance et améliore vraiment l’expérience de livraison.",
            rating: 5,
        },
    ];

    return (
        <Box
            component="section"
            id="testimonials"
            sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                pt:4,
                pb: { xs: 8, md: 10 },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    bgcolor: "#FFF6EF",
                    left: "-180px",
                    top: "40px",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: "350px",
                    height: "350px",
                    borderRadius: "50%",
                    bgcolor: "#F4F8FF",
                    right: "-240px",
                    bottom: "-100px",
                }}
            />

            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        mb: { xs: 5, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            maxWidth: "700px",
                            mx: "auto",
                        }}
                    >
                        <Box
                            sx={{
                                display: "inline-flex",
                                px: 1.6,
                                py: 0.6,
                                borderRadius: "50px",
                                border: "1px solid #FFD2BD",
                                bgcolor: "#FFF8F3",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#FF6B00",
                                    fontSize: "9px",
                                    fontWeight: 800,
                                    letterSpacing: "1.2px",
                                }}
                            >
                                ILS NOUS FONT CONFIANCE
                            </Typography>
                        </Box>

                        <Typography
                            component="h2"
                            sx={{
                                color: "#0B1F3A",
                                fontSize: {
                                    xs: "34px",
                                    sm: "40px",
                                    md: "44px",
                                },
                                fontWeight: 800,
                                lineHeight: 1.08,
                                letterSpacing: "-1.5px",
                            }}
                        >
                            Ce qu’ils disent de
                            <Box
                                component="span"
                                sx={{
                                    color: "#FF6B00",
                                    display: "block",
                                }}
                            >
                                NexaDelivery.
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                color: "#7B8799",
                                fontSize: "13px",
                                mt: 2,
                                lineHeight: 1.7,
                            }}
                        >
                            Des retours qui reflètent une expérience plus simple,
                            plus fluide et plus rassurante.
                        </Typography>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            position: {
                                xs: "static",
                                md: "absolute",
                            },
                            right: 0,
                            bottom: 0,
                            justifyContent: {
                                xs: "center",
                                md: "flex-end",
                            },
                            mt: {
                                xs: 3,
                                md: 0,
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid #E4EAF2",
                                bgcolor: "#FFFFFF",
                                color: "#0B1F3A",

                                "&:hover": {
                                    bgcolor: "#F7F9FC",
                                },
                            }}
                        >
                            <ArrowBackRoundedIcon sx={{ fontSize: "19px" }} />
                        </IconButton>

                        <IconButton
                            sx={{
                                width: "40px",
                                height: "40px",
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",

                                "&:hover": {
                                    bgcolor: "#E85F00",
                                },
                            }}
                        >
                            <ArrowForwardRoundedIcon sx={{ fontSize: "19px" }} />
                        </IconButton>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 2.2,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <Box
                            key={testimonial.name}
                            sx={{
                                position: "relative",
                                bgcolor: "#FFFFFF",
                                border: "1px solid #E7ECF3",
                                borderRadius: "18px",
                                p: { xs: 2.4, md: 2.7 },
                                minHeight: "250px",
                                boxShadow: "0 12px 35px rgba(11,31,58,0.06)",
                                transition: "0.25s ease",

                                ...(index === 1 && {
                                    transform: {
                                        md: "translateY(-10px)",
                                    },
                                }),

                                "&:hover": {
                                    transform: {
                                        xs: "translateY(-5px)",
                                        md:
                                            index === 1
                                                ? "translateY(-15px)"
                                                : "translateY(-5px)",
                                    },
                                    boxShadow: "0 18px 40px rgba(11,31,58,0.10)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "12px",
                                    bgcolor: "#FFF1E7",
                                    color: "#FF6B00",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,

                                    "& svg": {
                                        fontSize: "22px",
                                    },
                                }}
                            >
                                <FormatQuoteRoundedIcon />
                            </Box>

                            <Stack
                                direction="row"
                                spacing={0.2}
                                sx={{ mb: 1.7 }}
                            >
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <StarRoundedIcon
                                        key={i}
                                        sx={{
                                            color: "#FFB800",
                                            fontSize: "18px",
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Typography
                                sx={{
                                    color: "#41506A",
                                    fontSize: "12px",
                                    lineHeight: 1.8,
                                    mb: 3,
                                }}
                            >
                                “{testimonial.text}”
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1.3}
                            >
                                <Box
                                    sx={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg, #0B1F3A, #247BFF)",
                                        color: "#FFFFFF",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 800,
                                        fontSize: "11px",
                                    }}
                                >
                                    {testimonial.initials}
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#0B1F3A",
                                            fontSize: "11px",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {testimonial.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#8995A7",
                                            fontSize: "9px",
                                            mt: 0.2,
                                        }}
                                    >
                                        {testimonial.role}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default TestimonialsSection;