import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function MerchantSection() {
    const features = [
        {
            icon: <StorefrontRoundedIcon />,
            title: "Gérez vos livraisons",
            text: "Créez et organisez vos livraisons en quelques clics.",
            color: "#FF6B00",
            bg: "#FFF2E8",
        },
        {
            icon: <LocalShippingRoundedIcon />,
            title: "Suivez vos commandes",
            text: "Restez informé à chaque étape de la livraison.",
            color: "#247BFF",
            bg: "#EAF2FF",
        },
        {
            icon: <GroupsRoundedIcon />,
            title: "Gagnez en efficacité",
            text: "Une gestion plus simple entre commerçants et livreurs.",
            color: "#16B86A",
            bg: "#E9F9F1",
        },
        {
            icon: <BarChartRoundedIcon />,
            title: "Des statistiques claires",
            text: "Analysez vos performances depuis votre tableau de bord.",
            color: "#7C3AED",
            bg: "#F2EAFF",
        },
    ];

    return (
        <Box
            component="section"
            id="merchant"
            sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                py: { xs: 8, md: 11 },
            }}
        >

            <Box
                sx={{
                    position: "absolute",

                    width: {
                        xs: "220px",
                        md: "340px",
                    },

                    height: {
                        xs: "220px",
                        md: "340px",
                    },

                    borderRadius: "50%",
                    border: "80px solid transparent",
                    background:
                        "linear-gradient(#fff, #fff) padding-box, linear-gradient(145deg, #FF934F 0%, #FF6B00 65%, #F45A00 100%) border-box",


                    right: {
                        xs: "-155px",
                        md: "-215px",
                    },

                    bottom: {
                        xs: "-100px",
                        md: "-120px",
                    },

                    zIndex: 0,

                    boxShadow: "0 25px 70px rgba(255,107,0,0.20)",
                }}
            />


            <Box
                sx={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#FF6B00",
                    right: "11%",
                    top: "14%",
                    opacity: 0.4,
                }}
            />


            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1.05fr 0.95fr",
                        },

                        gap: {
                            xs: 7,
                            md: 8,
                        },

                        alignItems: "center",
                    }}
                >

                    <Box
                        sx={{
                            position: "relative",

                            minHeight: {
                                xs: "430px",
                                sm: "520px",
                                md: "550px",
                            },
                        }}
                    >

                        <Box
                            component="img"
                            src="/merchant.png"
                            alt="Commerçant utilisant NexaDelivery"
                            sx={{
                                position: "absolute",
                                inset: 0,

                                width: "100%",
                                height: "100%",

                                objectFit: "cover",

                                borderRadius: {
                                    xs: "20px",
                                    md: "24px",
                                },

                                boxShadow: "0 25px 65px rgba(11,31,58,0.15)",
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,

                                borderRadius: {
                                    xs: "20px",
                                    md: "24px",
                                },

                                background:
                                    "linear-gradient(180deg, rgba(5,20,35,0.02) 40%, rgba(5,20,35,0.35) 100%)",

                                pointerEvents: "none",
                            }}
                        />


                        <Box
                            sx={{
                                position: "absolute",

                                top: {
                                    xs: 18,
                                    md: 30,
                                },

                                left: {
                                    xs: 15,
                                    md: 25,
                                },

                                width: {
                                    xs: "145px",
                                    md: "165px",
                                },

                                p: 2,

                                borderRadius: "16px",

                                background:
                                    "linear-gradient(145deg, rgba(8,25,45,0.95), rgba(14,42,68,0.90))",

                                border: "1px solid rgba(255,255,255,0.15)",

                                backdropFilter: "blur(14px)",

                                boxShadow: "0 15px 40px rgba(0,0,0,0.20)",

                                color: "#FFFFFF",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.7}
                                sx={{
                                    mb: 1,
                                }}
                            >
                                <TrendingUpRoundedIcon
                                    sx={{
                                        color: "#28D17C",
                                        fontSize: "18px",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontSize: "9px",
                                        color: "rgba(255,255,255,0.65)",
                                    }}
                                >
                                    Livraisons aujourd'hui
                                </Typography>
                            </Stack>

                            <Typography
                                sx={{
                                    fontSize: "34px",
                                    fontWeight: 800,
                                    lineHeight: 1,
                                }}
                            >
                                48
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#28D17C",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    mt: 1,
                                }}
                            >
                                ↗ +28% cette semaine
                            </Typography>
                        </Box>


                        <Stack
                            spacing={1.2}
                            sx={{
                                position: "absolute",

                                top: {
                                    xs: 120,
                                    md: 115,
                                },

                                right: {
                                    xs: 10,
                                    md: -22,
                                },
                            }}
                        >
                            <MiniOrder
                                icon={<Inventory2RoundedIcon />}
                                color="#FF6B00"
                                title="Nouvelle livraison"
                                value="#NX2048"
                                time="2 min"
                            />

                            <MiniOrder
                                icon={<LocationOnRoundedIcon />}
                                color="#247BFF"
                                title="Colis récupéré"
                                value="#NX2048"
                                time="8 min"
                            />

                            <MiniOrder
                                icon={<LocalShippingRoundedIcon />}
                                color="#16B86A"
                                title="En route"
                                value="#NX2048"
                                time="20 min"
                            />
                        </Stack>


                        <Box
                            sx={{
                                position: "absolute",

                                left: {
                                    xs: 15,
                                    md: 27,
                                },

                                bottom: {
                                    xs: 18,
                                    md: 25,
                                },

                                width: {
                                    xs: "250px",
                                    md: "290px",
                                },

                                backgroundColor: "rgba(255,255,255,0.97)",

                                backdropFilter: "blur(10px)",

                                borderRadius: "15px",

                                p: 2,

                                boxShadow: "0 15px 40px rgba(11,31,58,0.20)",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#334155",
                                    fontSize: "10px",
                                    lineHeight: 1.6,
                                    mb: 1.3,
                                }}
                            >
                                “NexaDelivery m'aide à mieux organiser mes livraisons et à
                                gagner du temps au quotidien.”
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Box
                                    sx={{
                                        width: "30px",
                                        height: "30px",

                                        borderRadius: "50%",

                                        backgroundColor: "#FFF0E5",

                                        color: "#FF6B00",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        fontWeight: 800,
                                        fontSize: "10px",
                                    }}
                                >
                                    ZO
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#0B1F3A",
                                            fontSize: "9px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Zakria O.
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#FFB800",
                                            fontSize: "10px",
                                            letterSpacing: "1px",
                                        }}
                                    >
                                        ★★★★★
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>



                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >

                        <Box
                            sx={{
                                display: "inline-flex",

                                px: 1.5,
                                py: 0.6,

                                borderRadius: "50px",

                                border: "1px solid #BDD2FF",

                                backgroundColor: "#F5F8FF",

                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#247BFF",

                                    fontSize: "9px",
                                    fontWeight: 800,

                                    letterSpacing: "1.2px",
                                }}
                            >
                                POUR LES COMMERÇANTS
                            </Typography>
                        </Box>


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
                            Développez votre activité,
                            <Box
                                component="span"
                                sx={{
                                    display: "block",
                                    color: "#FF6B00",
                                }}
                            >
                                sans limites.
                            </Box>
                        </Typography>


                        <Typography
                            sx={{
                                color: "#64748B",

                                fontSize: "14px",

                                lineHeight: 1.75,

                                maxWidth: "500px",

                                mb: 3,
                            }}
                        >
                            Gérez vos livraisons facilement, suivez leur progression et
                            gardez une vision claire de votre activité depuis un seul espace.
                        </Typography>


                        <Stack spacing={1.3}>
                            {features.map((feature) => (
                                <Box
                                    key={feature.title}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",

                                        border: "1px solid #E9EEF5",

                                        borderRadius: "14px",

                                        px: 1.6,
                                        py: 1.35,

                                        backgroundColor: "#FFFFFF",

                                        transition: "all 0.25s ease",

                                        "&:hover": {
                                            transform: "translateX(5px)",

                                            borderColor: `${feature.color}55`,

                                            boxShadow:
                                                "0 10px 30px rgba(11,31,58,0.07)",
                                        },
                                    }}
                                >

                                    <Box
                                        sx={{
                                            width: "43px",
                                            height: "43px",

                                            minWidth: "43px",

                                            borderRadius: "12px",

                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",

                                            backgroundColor: feature.bg,

                                            color: feature.color,

                                            mr: 1.7,

                                            "& svg": {
                                                fontSize: "22px",
                                            },
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>


                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "#0B1F3A",

                                                fontSize: "12px",

                                                fontWeight: 800,

                                                mb: 0.25,
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#8490A2",

                                                fontSize: "10px",

                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {feature.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>


                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardRoundedIcon />}
                            disableElevation
                            sx={{
                                mt: 3,

                                backgroundColor: "#FF6B00",

                                color: "#FFFFFF",

                                textTransform: "none",

                                fontWeight: 700,

                                fontSize: "12px",

                                px: 3,
                                py: 1.4,

                                borderRadius: "11px",

                                transition: "all 0.2s ease",

                                "&:hover": {
                                    backgroundColor: "#E85F00",

                                    transform: "translateY(-2px)",

                                    boxShadow:
                                        "0 10px 25px rgba(255,107,0,0.25)",
                                },
                            }}
                        >
                            Commencer comme commerçant
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}



function MiniOrder({
                       icon,
                       color,
                       title,
                       value,
                       time,
                   }) {
    return (
        <Box
            sx={{
                width: {
                    xs: "180px",
                    md: "205px",
                },

                display: "flex",

                alignItems: "center",

                backgroundColor: "rgba(255,255,255,0.96)",

                backdropFilter: "blur(10px)",

                border: "1px solid #EDF1F5",

                borderRadius: "11px",

                px: 1.2,
                py: 1,

                boxShadow:
                    "0 10px 30px rgba(11,31,58,0.15)",
            }}
        >

            <Box
                sx={{
                    width: "31px",
                    height: "31px",

                    minWidth: "31px",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    borderRadius: "8px",

                    backgroundColor: `${color}15`,

                    color,

                    mr: 1,

                    "& svg": {
                        fontSize: "17px",
                    },
                }}
            >
                {icon}
            </Box>


            <Box
                sx={{
                    flex: 1,
                }}
            >
                <Typography
                    sx={{
                        color: "#0B1F3A",

                        fontSize: "8px",

                        fontWeight: 800,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        color: "#64748B",

                        fontSize: "7px",
                    }}
                >
                    {value}
                </Typography>
            </Box>


            <Typography
                sx={{
                    color: "#94A3B8",

                    fontSize: "7px",

                    whiteSpace: "nowrap",
                }}
            >
                {time}
            </Typography>
        </Box>
    );
}

export default MerchantSection;