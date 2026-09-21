import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Typography,
} from "@mui/material";

import ArrowBackRoundedIcon
    from "@mui/icons-material/ArrowBackRounded";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import PersonOutlineRoundedIcon
    from "@mui/icons-material/PersonOutlineRounded";

import StorefrontOutlinedIcon
    from "@mui/icons-material/StorefrontOutlined";

import LocationOnOutlinedIcon
    from "@mui/icons-material/LocationOnOutlined";

import CalendarTodayOutlinedIcon
    from "@mui/icons-material/CalendarTodayOutlined";

import PhoneOutlinedIcon
    from "@mui/icons-material/PhoneOutlined";

import { getDeliveryById }
    from "../../api/deliveryService.js";


const statusConfig = {
    EN_ATTENTE: {
        label: "En attente",
        bgcolor: "#FFF7ED",
        color: "#EA580C",
    },
    ASSIGNEE: {
        label: "Assignée",
        bgcolor: "#EFF6FF",
        color: "#2563EB",
    },
    ACCEPTEE: {
        label: "Acceptée",
        bgcolor: "#ECFDF5",
        color: "#059669",
    },
    RECUPEREE: {
        label: "Récupérée",
        bgcolor: "#F5F3FF",
        color: "#7C3AED",
    },
    EN_ROUTE: {
        label: "En route",
        bgcolor: "#ECFEFF",
        color: "#0891B2",
    },
    LIVREE: {
        label: "Livrée",
        bgcolor: "#F0FDF4",
        color: "#16A34A",
    },
    ANNULEE: {
        label: "Annulée",
        bgcolor: "#FEF2F2",
        color: "#DC2626",
    },
};


const AdminDeliveryDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [delivery, setDelivery] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const fetchDelivery = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getDeliveryById(id);

                setDelivery(response.data);

            } catch (error) {

                console.error(
                    "Erreur chargement livraison:",
                    error
                );

                setError(
                    "Impossible de charger cette livraison."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchDelivery();

    }, [id]);


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Intl.DateTimeFormat(
            "fr-FR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        ).format(new Date(date));
    };


    if (loading) {

        return (
            <Box
                sx={{
                    minHeight: "400px",
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


    if (error || !delivery) {

        return (
            <Box>

                <Button
                    startIcon={
                        <ArrowBackRoundedIcon />
                    }
                    onClick={() =>
                        navigate(
                            "/admin/deliveries"
                        )
                    }
                    sx={{
                        mb: 3,
                        color: "#0B1F3A",
                        textTransform: "none",
                    }}
                >
                    Retour aux livraisons
                </Button>

                <Alert severity="error">
                    {error ||
                        "Livraison introuvable."}
                </Alert>

            </Box>
        );
    }


    const status =
        statusConfig[
            delivery.deliveryStatus
            ] ?? {
            label:
            delivery.deliveryStatus,
            bgcolor: "#F1F5F9",
            color: "#64748B",
        };


    return (

        <Box>


            <Button
                startIcon={
                    <ArrowBackRoundedIcon />
                }
                onClick={() =>
                    navigate(
                        "/admin/deliveries"
                    )
                }
                sx={{
                    mb: 2,
                    color: "#64748B",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                        bgcolor: "#F8FAFC",
                        color: "#0B1F3A",
                    },
                }}
            >
                Retour aux livraisons
            </Button>



            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                    justifyContent:
                        "space-between",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    gap: 2,
                }}
            >

                <Box>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "24px",
                                md: "28px",
                            },
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        Détails de la livraison
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            color: "#6B7280",
                            fontSize: "14px",
                        }}
                    >
                        Tracking :{" "}
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            {delivery.trackingCode}
                        </Box>
                    </Typography>

                </Box>


                <Chip
                    label={status.label}
                    sx={{
                        bgcolor:
                        status.bgcolor,
                        color:
                        status.color,
                        fontWeight: 700,
                        borderRadius: "8px",
                    }}
                />

            </Box>



            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
                        md: 3,
                    },
                    border:
                        "1px solid #E5E7EB",
                    borderRadius: "14px",
                    mb: 2.5,
                }}
            >

                <SectionTitle
                    icon={
                        <LocalShippingOutlinedIcon />
                    }
                    title="Informations de la livraison"
                />

                <Divider sx={{ my: 2.5 }} />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                        },
                        gap: 3,
                    }}
                >

                    <Info
                        label="Code de suivi"
                        value={
                            delivery.trackingCode
                        }
                    />

                    <Info
                        label="Date de création"
                        value={formatDate(
                            delivery.createdAt
                        )}
                        icon={
                            <CalendarTodayOutlinedIcon />
                        }
                    />

                    <Info
                        label="Adresse de collecte"
                        value={
                            delivery.pickupAddress
                        }
                        icon={
                            <LocationOnOutlinedIcon />
                        }
                    />

                    <Info
                        label="Destination"
                        value={
                            delivery.dropAddress
                        }
                        icon={
                            <LocationOnOutlinedIcon />
                        }
                    />

                </Box>


                <Box sx={{ mt: 3 }}>

                    <Info
                        label="Description"
                        value={
                            delivery.description ||
                            "Aucune description"
                        }
                    />

                </Box>

            </Paper>



            <Paper
                elevation={0}
                sx={cardStyle}
            >

                <SectionTitle
                    icon={
                        <PersonOutlineRoundedIcon />
                    }
                    title="Client"
                />

                <Divider sx={{ my: 2.5 }} />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                        },
                        gap: 3,
                    }}
                >

                    <Info
                        label="Nom"
                        value={
                            delivery.clientName
                        }
                    />

                    <Info
                        label="Téléphone"
                        value={
                            delivery.clientPhone
                        }
                        icon={
                            <PhoneOutlinedIcon />
                        }
                    />

                </Box>

            </Paper>



            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                    },
                    gap: 2.5,
                }}
            >

                <Paper
                    elevation={0}
                    sx={cardStyle}
                >

                    <SectionTitle
                        icon={
                            <LocalShippingOutlinedIcon />
                        }
                        title="Chauffeur"
                    />

                    <Divider
                        sx={{ my: 2.5 }}
                    />

                    <Info
                        label="Nom du chauffeur"
                        value={
                            delivery.driverName ||
                            "Non assigné"
                        }
                    />

                </Paper>


                <Paper
                    elevation={0}
                    sx={cardStyle}
                >

                    <SectionTitle
                        icon={
                            <StorefrontOutlinedIcon />
                        }
                        title="Commerçant"
                    />

                    <Divider
                        sx={{ my: 2.5 }}
                    />

                    <Info
                        label="Nom du commerçant"
                        value={
                            delivery.businessName ||
                            "-"
                        }
                    />

                </Paper>

            </Box>

        </Box>
    );
};


const SectionTitle = ({
                          icon,
                          title,
                      }) => (

    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
        }}
    >

        <Box
            sx={{
                display: "flex",
                color: "#FF6B00",
            }}
        >
            {icon}
        </Box>

        <Typography
            sx={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#0B1F3A",
            }}
        >
            {title}
        </Typography>

    </Box>
);


const Info = ({
                  label,
                  value,
                  icon,
              }) => (

    <Box>

        <Typography
            sx={{
                mb: 0.7,
                fontSize: "11px",
                fontWeight: 700,
                color: "#94A3B8",
                textTransform: "uppercase",
            }}
        >
            {label}
        </Typography>

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
            }}
        >

            {icon && (

                <Box
                    sx={{
                        display: "flex",
                        color: "#94A3B8",

                        "& svg": {
                            fontSize: "17px",
                        },
                    }}
                >
                    {icon}
                </Box>

            )}

            <Typography
                sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#334155",
                    wordBreak: "break-word",
                }}
            >
                {value || "-"}
            </Typography>

        </Box>

    </Box>
);


const cardStyle = {
    p: {
        xs: 2,
        md: 3,
    },
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    mb: 2.5,
};


export default AdminDeliveryDetails;