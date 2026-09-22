import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

function ContactSection() {
    const contactInfo = [
        {
            icon: <EmailRoundedIcon />,
            title: "Email",
            value: "contact@nexadelivery.ma",
        },
        {
            icon: <PhoneRoundedIcon />,
            title: "Téléphone",
            value: "+212 6 07523048",
        },
        {
            icon: <LocationOnRoundedIcon />,
            title: "Localisation",
            value: "Maroc",
        },
        {
            icon: <AccessTimeRoundedIcon />,
            title: "Disponibilité",
            value: "Lun - Sam · 08:00 - 18:00",
        },
    ];

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            bgcolor: "#F8FAFC",
            fontSize: "12px",
            color: "#0B1F3A",

            "& fieldset": {
                borderColor: "#E4EAF2",
            },

            "&:hover fieldset": {
                borderColor: "#C9D2DF",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#FF6B00",
                borderWidth: "1px",
            },
        },

        "& .MuiInputLabel-root": {
            fontSize: "12px",
            color: "#8995A7",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "#FF6B00",
        },
    };

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                pt: 4,
                pb: {
                    xs: 8,
                    md: 10,
                },
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
                        textAlign: "center",
                        maxWidth: "700px",
                        mx: "auto",
                        mb: {
                            xs: 5,
                            md: 6,
                        },
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
                            CONTACTEZ-NOUS
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
                        Une question ?
                        <Box
                            component="span"
                            sx={{
                                color: "#FF6B00",
                                display: "block",
                            }}
                        >
                            Parlons-en.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: "#7B8799",
                            fontSize: "13px",
                            mt: 2,
                            lineHeight: 1.7,
                            maxWidth: "580px",
                            mx: "auto",
                        }}
                    >
                        Notre équipe est à votre écoute pour répondre à vos
                        questions et vous accompagner dans l'utilisation de
                        NexaDelivery.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "0.85fr 1.15fr",
                        },
                        gap: {
                            xs: 3,
                            md: 4,
                        },
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#0B1F3A",
                            borderRadius: "18px",
                            p: {
                                xs: 3,
                                md: 3.5,
                            },
                            position: "relative",
                            overflow: "hidden",
                            boxShadow:
                                "0 12px 35px rgba(11,31,58,0.10)",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                width: "180px",
                                height: "180px",
                                borderRadius: "50%",
                                bgcolor: "rgba(255,107,0,0.10)",
                                right: "-80px",
                                bottom: "-70px",
                            }}
                        />

                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#FFFFFF",
                                    fontSize: {
                                        xs: "22px",
                                        md: "25px",
                                    },
                                    fontWeight: 800,
                                    mb: 1,
                                }}
                            >
                                Restons en contact
                            </Typography>

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.65)",
                                    fontSize: "12px",
                                    lineHeight: 1.7,
                                    mb: 4,
                                }}
                            >
                                Besoin d'informations sur NexaDelivery ?
                                Contactez-nous, notre équipe vous répondra dans
                                les meilleurs délais.
                            </Typography>

                            <Stack spacing={2.2}>
                                {contactInfo.map((item) => (
                                    <Stack
                                        key={item.title}
                                        direction="row"
                                        spacing={1.6}
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                bgcolor:
                                                    "rgba(255,107,0,0.12)",
                                                color: "#FF6B00",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,

                                                "& svg": {
                                                    fontSize: "20px",
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    color:
                                                        "rgba(255,255,255,0.55)",
                                                    fontSize: "9px",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.8px",
                                                    mb: 0.3,
                                                }}
                                            >
                                                {item.title}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#FFFFFF",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Box>

                    <Box
                        component="form"
                        sx={{
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E7ECF3",
                            borderRadius: "18px",
                            p: {
                                xs: 2.5,
                                sm: 3,
                                md: 3.5,
                            },
                            boxShadow:
                                "0 12px 35px rgba(11,31,58,0.06)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#0B1F3A",
                                fontSize: "18px",
                                fontWeight: 800,
                                mb: 0.7,
                            }}
                        >
                            Envoyez-nous un message
                        </Typography>

                        <Typography
                            sx={{
                                color: "#8995A7",
                                fontSize: "11px",
                                lineHeight: 1.6,
                                mb: 3,
                            }}
                        >
                            Remplissez le formulaire et nous vous répondrons
                            dès que possible.
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                },
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <TextField
                                label="Nom complet"
                                placeholder="Votre nom"
                                fullWidth
                                sx={inputStyle}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                placeholder="votre@email.com"
                                fullWidth
                                sx={inputStyle}
                            />
                        </Box>

                        <TextField
                            label="Sujet"
                            placeholder="Comment pouvons-nous vous aider ?"
                            fullWidth
                            sx={{
                                ...inputStyle,
                                mb: 2,
                            }}
                        />

                        <TextField
                            label="Message"
                            placeholder="Écrivez votre message..."
                            multiline
                            rows={5}
                            fullWidth
                            sx={{
                                ...inputStyle,
                                mb: 2.5,
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation
                            endIcon={<SendRoundedIcon />}
                            sx={{
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "12px",
                                borderRadius: "10px",
                                px: 3,
                                py: 1.3,

                                "&:hover": {
                                    bgcolor: "#E85F00",
                                },
                            }}
                        >
                            Envoyer le message
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ContactSection;