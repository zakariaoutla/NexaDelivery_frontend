import {
    Box,
    Chip,
    Paper,
    Typography,
} from "@mui/material";

import AssignmentOutlinedIcon
    from "@mui/icons-material/AssignmentOutlined";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import CheckCircleOutlinedIcon
    from "@mui/icons-material/CheckCircleOutlined";

import PersonPinCircleOutlinedIcon
    from "@mui/icons-material/PersonPinCircleOutlined";


const DriverDashboard = () => {

    // TEMPORAIRE
    // من بعد نجيبوهم من API
    const statistics = {
        assigned: 0,
        inProgress: 0,
        delivered: 0,
    };

    const driverStatus = "DISPONIBLE";


    const cards = [
        {
            title: "Livraisons assignées",
            value: statistics.assigned,
            icon: <AssignmentOutlinedIcon />,
        },
        {
            title: "Livraison en cours",
            value: statistics.inProgress,
            icon: <LocalShippingOutlinedIcon />,
        },
        {
            title: "Livraisons terminées",
            value: statistics.delivered,
            icon: <CheckCircleOutlinedIcon />,
        },
    ];


    const statusConfig = {
        DISPONIBLE: {
            label: "Disponible",
            bg: "#ECFDF5",
            color: "#059669",
        },

        EN_LIVRAISON: {
            label: "En livraison",
            bg: "#FFF7ED",
            color: "#FF6B00",
        },

        HORS_SERVICE: {
            label: "Hors service",
            bg: "#FEF2F2",
            color: "#DC2626",
        },
    };


    const currentStatus =
        statusConfig[driverStatus] ||
        statusConfig.HORS_SERVICE;


    return (
        <Box>

            {/* HEADER */}

            <Box
                sx={{
                    mb: 4,

                    display: {
                        xs: "block",
                        sm: "flex",
                    },

                    alignItems: "center",
                    justifyContent:
                        "space-between",

                    gap: 2,
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        color="#0B1F3A"
                    >
                        Tableau de bord
                    </Typography>

                    <Typography
                        sx={{
                            color: "#6B7280",
                            mt: 0.5,
                        }}
                    >
                        Suivez vos livraisons et
                        votre activité.
                    </Typography>

                </Box>


                {/* DRIVER STATUS */}

                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,

                        px: 2,
                        py: 1.3,

                        mt: {
                            xs: 2,
                            sm: 0,
                        },

                        borderRadius: 3,

                        border:
                            "1px solid #E5E7EB",

                        bgcolor: "#FFFFFF",
                    }}
                >

                    <PersonPinCircleOutlinedIcon
                        sx={{
                            color: "#FF6B00",
                        }}
                    />

                    <Box>

                        <Typography
                            sx={{
                                fontSize: "11px",
                                color: "#94A3B8",
                            }}
                        >
                            Mon statut
                        </Typography>

                        <Chip
                            size="small"
                            label={
                                currentStatus.label
                            }
                            sx={{
                                mt: 0.4,

                                bgcolor:
                                currentStatus.bg,

                                color:
                                currentStatus.color,

                                fontWeight: 700,

                                fontSize: "11px",
                            }}
                        />

                    </Box>

                </Paper>

            </Box>


            {/* STATISTICS */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },

                    gap: 2.5,

                    mb: 4,
                }}
            >

                {cards.map((card) => (

                    <Paper
                        key={card.title}
                        elevation={0}
                        sx={{
                            p: 3,

                            borderRadius: 3,

                            border:
                                "1px solid #E5E7EB",

                            bgcolor: "#FFFFFF",

                            display: "flex",

                            alignItems: "center",

                            justifyContent:
                                "space-between",
                        }}
                    >

                        <Box>

                            <Typography
                                sx={{
                                    fontSize: "13px",

                                    color: "#6B7280",

                                    mb: 1,
                                }}
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight={800}
                                color="#0B1F3A"
                            >
                                {card.value}
                            </Typography>

                        </Box>


                        <Box
                            sx={{
                                width: 52,
                                height: 52,

                                display: "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                borderRadius: 3,

                                bgcolor:
                                    "#FFF4EC",

                                color:
                                    "#FF6B00",

                                "& svg": {
                                    fontSize: 27,
                                },
                            }}
                        >
                            {card.icon}
                        </Box>

                    </Paper>

                ))}

            </Box>


            {/* ACTIVE DELIVERY */}

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,

                    border:
                        "1px solid #E5E7EB",

                    bgcolor: "#FFFFFF",

                    p: {
                        xs: 2.5,
                        md: 3,
                    },
                }}
            >

                <Typography
                    sx={{
                        fontSize: "17px",

                        fontWeight: 800,

                        color: "#0B1F3A",

                        mb: 0.5,
                    }}
                >
                    Livraison actuelle
                </Typography>

                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#6B7280",
                    }}
                >
                    Votre livraison active
                    apparaîtra ici.
                </Typography>


                {/* EMPTY STATE */}

                <Box
                    sx={{
                        minHeight: "230px",

                        display: "flex",

                        flexDirection:
                            "column",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        textAlign: "center",
                    }}
                >

                    <Box
                        sx={{
                            width: 70,
                            height: 70,

                            display: "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            borderRadius: "50%",

                            bgcolor:
                                "#FFF4EC",

                            mb: 2,
                        }}
                    >

                        <LocalShippingOutlinedIcon
                            sx={{
                                fontSize: 34,

                                color:
                                    "#FF6B00",
                            }}
                        />

                    </Box>


                    <Typography
                        fontWeight={700}
                        color="#0B1F3A"
                    >
                        Aucune livraison en cours
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,

                            fontSize: "13px",

                            color: "#94A3B8",

                            maxWidth: "350px",
                        }}
                    >
                        Lorsqu'une livraison vous
                        sera assignée, elle
                        apparaîtra ici.
                    </Typography>

                </Box>

            </Paper>

        </Box>
    );
};

export default DriverDashboard;