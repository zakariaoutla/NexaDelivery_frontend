import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

function FinalCTASection() {
    return (
        <Box
            component="section"
            sx={{
                bgcolor: "#FFFFFF",
                py: { xs: 5, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: { xs: "20px", md: "24px" },

                        // BACKGROUND IMAGE
                        backgroundImage: `
              linear-gradient(
                90deg,
                rgba(5, 18, 35, 0.96) 0%,
                rgba(7, 29, 52, 0.90) 42%,
                rgba(7, 29, 52, 0.50) 72%,
                rgba(7, 29, 52, 0.25) 100%
              ),
              url("/cta-bg.jpg")
            `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",

                        minHeight: { xs: "320px", md: "285px" },

                        display: "flex",
                        alignItems: "center",

                        px: { xs: 3, sm: 5, md: 7 },
                        py: { xs: 4.5, md: 4 },

                        boxShadow: "0 20px 50px rgba(11,31,58,0.14)",
                    }}
                >
                    {/* ORANGE GLOW */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "260px",
                            height: "260px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(255,107,0,0.20), transparent 68%)",
                            right: "-80px",
                            bottom: "-130px",
                            pointerEvents: "none",
                        }}
                    />

                    {/* CONTENT */}
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 2,
                            maxWidth: "620px",
                        }}
                    >
                        {/* SMALL LABEL */}
                        <Box
                            sx={{
                                display: "inline-flex",
                                px: 1.4,
                                py: 0.55,
                                borderRadius: "50px",
                                bgcolor: "rgba(255,107,0,0.12)",
                                border: "1px solid rgba(255,107,0,0.30)",
                                mb: 1.8,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#FF8A3D",
                                    fontSize: "8px",
                                    fontWeight: 800,
                                    letterSpacing: "1.2px",
                                }}
                            >
                                COMMENCEZ DÈS AUJOURD’HUI
                            </Typography>
                        </Box>

                        {/* TITLE */}
                        <Typography
                            component="h2"
                            sx={{
                                color: "#FFFFFF",
                                fontSize: {
                                    xs: "30px",
                                    sm: "35px",
                                    md: "39px",
                                },
                                fontWeight: 800,
                                lineHeight: 1.08,
                                letterSpacing: "-1.2px",
                            }}
                        >
                            Prêt à simplifier{" "}
                            <Box
                                component="span"
                                sx={{
                                    color: "#FF6B00",
                                }}
                            >
                                vos livraisons ?
                            </Box>
                        </Typography>

                        {/* DESCRIPTION */}
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.70)",
                                fontSize: { xs: "11px", md: "12px" },
                                lineHeight: 1.7,
                                maxWidth: "510px",
                                mt: 1.5,
                            }}
                        >
                            Gérez vos commandes, suivez vos livraisons et développez
                            votre activité avec NexaDelivery.
                        </Typography>

                        {/* BUTTONS */}
                        <Stack
                            direction="row"
                            spacing={1.2}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{ mt: 2.7 }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardRoundedIcon />}
                                sx={{
                                    bgcolor: "#FF6B00",
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    borderRadius: "10px",
                                    px: 2.4,
                                    py: 1.05,
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    boxShadow: "0 8px 20px rgba(255,107,0,0.25)",

                                    "&:hover": {
                                        bgcolor: "#E85F00",
                                    },
                                }}
                            >
                                Commencer maintenant
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<LoginRoundedIcon />}
                                sx={{
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    borderRadius: "10px",
                                    px: 2.4,
                                    py: 1.05,
                                    fontSize: "10px",
                                    fontWeight: 700,

                                    borderColor: "rgba(255,255,255,0.35)",
                                    bgcolor: "rgba(255,255,255,0.05)",

                                    "&:hover": {
                                        borderColor: "#FFFFFF",
                                        bgcolor: "rgba(255,255,255,0.10)",
                                    },
                                }}
                            >
                                Se connecter
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default FinalCTASection;