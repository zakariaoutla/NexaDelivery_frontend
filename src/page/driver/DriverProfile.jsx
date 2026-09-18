import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Rating,
    Typography,
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import PersonOutlineRoundedIcon
    from "@mui/icons-material/PersonOutlineRounded";

import EmailOutlinedIcon
    from "@mui/icons-material/EmailOutlined";

import PhoneOutlinedIcon
    from "@mui/icons-material/PhoneOutlined";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import LocationOnOutlinedIcon
    from "@mui/icons-material/LocationOnOutlined";

import StarRoundedIcon
    from "@mui/icons-material/StarRounded";

import {
    updateMyDriverStatus,
    getMyDriverProfile
} from "../../api/driverService.js";


export default function DriverProfile() {

    const [driver, setDriver] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {

        const fetchProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const res =
                    await getMyDriverProfile();

                setDriver(res.data);

            } catch (err) {

                console.error(
                    "Erreur profil driver:",
                    err
                );

                setError(
                    "Impossible de charger votre profil."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchProfile();

    }, []);


    if (loading) {

        return (
            <Box
                sx={{
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress
                    sx={{
                        color: "#FF6B00",
                    }}
                />
            </Box>
        );
    }


    if (error) {

        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }


    if (!driver) {
        return null;
    }


    const statusConfig = {

        DISPONIBLE: {
            label: "Disponible",
            bgcolor: "#F0FDF4",
            color: "#16A34A",
        },

        EN_LIVRAISON: {
            label: "En livraison",
            bgcolor: "#FFF7ED",
            color: "#EA580C",
        },

        HORS_SERVICE: {
            label: "Hors service",
            bgcolor: "#FEF2F2",
            color: "#DC2626",
        },

    };


    const status =
        statusConfig[driver.driverStatus] || {
            label: driver.driverStatus || "-",
            bgcolor: "#F1F5F9",
            color: "#64748B",
        };

    const handleStatusChange = async () => {

        const newStatus =
            driver.driverStatus === "DISPONIBLE"
                ? "HORS_SERVICE"
                : "DISPONIBLE";

        try {

            setUpdatingStatus(true);

            const res = await updateMyDriverStatus(
                newStatus
            );

            setDriver(res.data);

        } catch (err) {

            console.error(
                "Erreur modification statut:",
                err
            );

        } finally {

            setUpdatingStatus(false);
        }
    };


    return (

        <Box>


            <Box sx={{ mb: 4 }}>

                <Typography
                    sx={{
                        fontSize: {
                            xs: "24px",
                            md: "28px",
                        },
                        fontWeight: 800,
                        color: "#0B1F3A",
                    }}
                >
                    Mon profil
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "13px",
                        color: "#64748B",
                    }}
                >
                    Consultez vos informations personnelles
                    et professionnelles.
                </Typography>

            </Box>



            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2.5,
                        md: 3,
                    },
                    mb: 3,
                    border:
                        "1px solid #E5E7EB",
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                    }}
                >

                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: "#FFF4EC",
                            color: "#FF6B00",
                            fontSize: "24px",
                            fontWeight: 800,
                        }}
                    >
                        {driver.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </Avatar>


                    <Box sx={{ flex: 1 }}>

                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 800,
                                color: "#0B1F3A",
                            }}
                        >
                            {driver.name}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.3,
                                fontSize: "13px",
                                color: "#64748B",
                            }}
                        >
                            Chauffeur NexaDelivery
                        </Typography>

                    </Box>


                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexWrap: "wrap",
                        }}
                    >

                        <Chip
                            label={status.label}
                            sx={{
                                bgcolor: status.bgcolor,
                                color: status.color,
                                fontSize: "11px",
                                fontWeight: 700,
                                borderRadius: "8px",
                            }}
                        />


                        {driver.driverStatus !== "EN_LIVRAISON" && (

                            <Button
                                variant="outlined"
                                size="small"
                                disabled={updatingStatus}
                                onClick={handleStatusChange}
                                sx={{
                                    borderColor: "#FF6B00",
                                    color: "#FF6B00",
                                    textTransform: "none",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    borderRadius: "8px",

                                    "&:hover": {
                                        borderColor: "#E85F00",
                                        bgcolor: "#FFF4EC",
                                    },
                                }}
                            >
                                {updatingStatus
                                    ? "Modification..."
                                    : driver.driverStatus === "DISPONIBLE"
                                        ? "Passer hors service"
                                        : "Se rendre disponible"
                                }
                            </Button>

                        )}

                    </Box>

                </Box>

            </Paper>



            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "2fr 1fr",
                    },
                    gap: 3,
                }}
            >


                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                            mb: 3,
                        }}
                    >
                        Informations du chauffeur
                    </Typography>


                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                            },
                            gap: 3,
                        }}
                    >

                        <InfoItem
                            icon={
                                <PersonOutlineRoundedIcon />
                            }
                            label="Nom complet"
                            value={driver.name}
                        />


                        <InfoItem
                            icon={
                                <EmailOutlinedIcon />
                            }
                            label="Adresse e-mail"
                            value={driver.email}
                        />


                        <InfoItem
                            icon={
                                <PhoneOutlinedIcon />
                            }
                            label="Téléphone"
                            value={driver.telephone}
                        />


                        <InfoItem
                            icon={
                                <LocalShippingOutlinedIcon />
                            }
                            label="Véhicule"
                            value={
                                driver.vehicleType ||
                                "Non assigné"
                            }
                        />


                        <InfoItem
                            icon={
                                <LocationOnOutlinedIcon />
                            }
                            label="Zone"
                            value={
                                driver.zoneName ||
                                "Non assignée"
                            }
                        />

                    </Box>

                </Paper>



                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 3,
                        }}
                    >

                        <StarRoundedIcon
                            sx={{
                                color: "#FF6B00",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            Évaluation
                        </Typography>

                    </Box>


                    <Divider sx={{ mb: 3 }} />


                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#64748B",
                            mb: 1,
                        }}
                    >
                        Note moyenne
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: "34px",
                            lineHeight: 1,
                            fontWeight: 800,
                            color: "#0B1F3A",
                            mb: 1.5,
                        }}
                    >
                        {Number(
                            driver.averageRating || 0
                        ).toFixed(1)}

                        <Typography
                            component="span"
                            sx={{
                                ml: 0.5,
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#94A3B8",
                            }}
                        >
                            / 5
                        </Typography>

                    </Typography>


                    <Rating
                        value={Number(
                            driver.averageRating || 0
                        )}
                        precision={0.1}
                        readOnly
                    />

                </Paper>

            </Box>

        </Box>
    );
}


/*
 * REUSABLE INFO ITEM
 */

function InfoItem({
                      icon,
                      label,
                      value
                  }) {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
            }}
        >

            <Box
                sx={{
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    borderRadius: "9px",
                    bgcolor: "#FFF4EC",
                    color: "#FF6B00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& svg": {
                        fontSize: "19px",
                    },
                }}
            >
                {icon}
            </Box>


            <Box sx={{ minWidth: 0 }}>

                <Typography
                    sx={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#94A3B8",
                        mb: 0.4,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#0B1F3A",
                        wordBreak: "break-word",
                    }}
                >
                    {value || "-"}
                </Typography>

            </Box>

        </Box>
    );
}