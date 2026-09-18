import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Rating,
    TextField,
    Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { toast } from "react-toastify";

import {
    getMyDeliveryById,
} from "../../api/deliveryService.js";

import {
    createRating,
    getRatingByDelivery,
    updateRating,
} from "../../api/ratingService.js";


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


const DeliveryDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [delivery, setDelivery] = useState(null);

    const [loading, setLoading] = useState(true);
    

    const [rating, setRating] = useState(null);

    const [score, setScore] = useState(0);

    const [comment, setComment] = useState("");

    const [ratingLoading, setRatingLoading] =
        useState(false);

    const [editingRating, setEditingRating] =
        useState(false);


    useEffect(() => {

        const fetchDelivery = async () => {

            try {

                setLoading(true);

                const response =
                    await getMyDeliveryById(id);

                const deliveryData =
                    response.data;

                setDelivery(deliveryData);


                if (
                    deliveryData.deliveryStatus ===
                    "LIVREE"
                ) {

                    await fetchRating();

                }

            } catch (error) {

                console.error(error);

                toast.error(
                    "Impossible de charger cette livraison"
                );

                navigate(
                    "/merchant/deliveries"
                );

            } finally {

                setLoading(false);

            }
        };


        fetchDelivery();

    }, [id, navigate]);


    const fetchRating = async () => {

        try {

            const response =
                await getRatingByDelivery(id);

            const ratingData =
                response.data;

            setRating(ratingData);

            setScore(
                ratingData.score || 0
            );

            setComment(
                ratingData.comment || ""
            );

        } catch (error) {

            if (error.response?.status === 404) {

                setRating(null);
                setScore(0);
                setComment("");

                return;
            }

            const message =
                error.response?.data?.message || "";

            if (
                message.includes(
                    "pas encore d'évaluation"
                )
            ) {

                setRating(null);
                setScore(0);
                setComment("");

                return;
            }

            console.error(
                "Erreur chargement rating:",
                error
            );
        }
    };


    // =========================
    // CREATE / UPDATE RATING
    // =========================

    const handleRatingSubmit = async () => {

        if (!score) {

            toast.error(
                "Veuillez sélectionner une note."
            );

            return;
        }


        if (!comment.trim()) {

            toast.error(
                "Veuillez ajouter un commentaire."
            );

            return;
        }


        try {

            setRatingLoading(true);


            const payload = {
                score,
                comment: comment.trim(),
            };


            let response;


            if (rating) {

                response =
                    await updateRating(
                        rating.id,
                        payload
                    );

                toast.success(
                    "Évaluation modifiée avec succès."
                );

            } else {

                response =
                    await createRating(
                        delivery.id,
                        payload
                    );

                toast.success(
                    "Évaluation enregistrée avec succès."
                );

            }


            setRating(
                response.data
            );

            setScore(
                response.data.score
            );

            setComment(
                response.data.comment
            );

            setEditingRating(false);

        } catch (error) {

            console.error(
                "Erreur évaluation:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Impossible d'enregistrer l'évaluation.";

            toast.error(message);

        } finally {

            setRatingLoading(false);

        }
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const handleCancelRatingEdit = () => {

        if (!rating) {
            return;
        }

        setScore(
            rating.score
        );

        setComment(
            rating.comment
        );

        setEditingRating(false);
    };


    // =========================
    // FORMAT DATE
    // =========================

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
        ).format(
            new Date(date)
        );
    };


    // =========================
    // TRACKING
    // =========================

    const canTrack = (status) => {

        return [
            "ASSIGNEE",
            "RECUPEREE",
            "EN_ROUTE",
        ].includes(status);
    };


    // =========================
    // LOADING
    // =========================

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


    if (!delivery) {
        return null;
    }


    const status =
        statusConfig[
            delivery.deliveryStatus
            ] || {
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
                        "/merchant/deliveries"
                    )
                }
                sx={{
                    mb: 2,
                    color: "#64748B",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                        bgcolor: "#F1F5F9",
                    },
                }}
            >
                Retour aux livraisons
            </Button>


            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    justifyContent:
                        "space-between",
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
                            fontSize: "14px",
                            color: "#6B7280",
                        }}
                    >
                        {delivery.trackingCode}
                    </Typography>

                </Box>


                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >

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


                    {canTrack(
                        delivery.deliveryStatus
                    ) && (

                        <Button
                            variant="contained"
                            startIcon={
                                <MyLocationRoundedIcon />
                            }
                            onClick={() =>
                                navigate(
                                    `/merchant/deliveries/${delivery.id}/tracking`
                                )
                            }
                            sx={{
                                bgcolor:
                                    "#FF6B00",
                                color:
                                    "#FFFFFF",
                                textTransform:
                                    "none",
                                fontWeight: 700,
                                borderRadius:
                                    "9px",
                                boxShadow:
                                    "none",

                                "&:hover": {
                                    bgcolor:
                                        "#E65F00",
                                    boxShadow:
                                        "none",
                                },
                            }}
                        >
                            Suivre
                        </Button>

                    )}

                </Box>

            </Box>


            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1.4fr 1fr",
                    },
                    gap: 3,
                }}
            >




                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                    }}
                >

                    <SectionTitle
                        icon={
                            <LocalShippingOutlinedIcon />
                        }
                        title="Informations de livraison"
                    />


                    <Divider
                        sx={{
                            my: 2.5,
                            borderColor:
                                "#F1F5F9",
                        }}
                    />


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
                                <Inventory2OutlinedIcon />
                            }
                            label="Code de suivi"
                            value={
                                delivery.trackingCode
                            }
                        />


                        <InfoItem
                            icon={
                                <CalendarTodayOutlinedIcon />
                            }
                            label="Date de création"
                            value={
                                formatDate(
                                    delivery.createdAt
                                )
                            }
                        />


                        <InfoItem
                            icon={
                                <LocationOnOutlinedIcon />
                            }
                            label="Point de collecte"
                            value={
                                delivery.pickupAddress
                            }
                        />


                        <InfoItem
                            icon={
                                <LocationOnOutlinedIcon />
                            }
                            label="Adresse de livraison"
                            value={
                                delivery.dropAddress
                            }
                        />

                    </Box>


                    <Divider
                        sx={{
                            my: 3,
                            borderColor:
                                "#F1F5F9",
                        }}
                    />


                    <Box>

                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#94A3B8",
                                textTransform:
                                    "uppercase",
                                mb: 1,
                            }}
                        >
                            Description du colis
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#475569",
                                lineHeight: 1.7,
                            }}
                        >
                            {
                                delivery.description ||
                                "Aucune description"
                            }
                        </Typography>

                    </Box>

                </Paper>




                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                    }}
                >

                    <SectionTitle
                        icon={
                            <PersonOutlineRoundedIcon />
                        }
                        title="Informations client"
                    />


                    <Divider
                        sx={{
                            my: 2.5,
                            borderColor:
                                "#F1F5F9",
                        }}
                    />


                    <Box
                        sx={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: 3,
                        }}
                    >

                        <InfoItem
                            icon={
                                <PersonOutlineRoundedIcon />
                            }
                            label="Nom du client"
                            value={
                                delivery.clientName
                            }
                        />


                        <InfoItem
                            icon={
                                <PhoneOutlinedIcon />
                            }
                            label="Téléphone"
                            value={
                                delivery.clientPhone
                            }
                        />


                        <InfoItem
                            icon={
                                <LocationOnOutlinedIcon />
                            }
                            label="Destination"
                            value={
                                delivery.dropAddress
                            }
                        />

                    </Box>

                </Paper>

            </Box>




            {delivery.deliveryStatus ===
                "LIVREE" && (

                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            border:
                                "1px solid #E5E7EB",
                            borderRadius: "14px",
                            bgcolor: "#FFFFFF",
                            p: {
                                xs: 2.5,
                                md: 3,
                            },
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "center",
                                gap: 2,
                            }}
                        >

                            <SectionTitle
                                icon={
                                    <StarRoundedIcon />
                                }
                                title={
                                    rating
                                        ? "Votre évaluation"
                                        : "Évaluer le chauffeur"
                                }
                            />


                            {rating &&
                                !editingRating && (

                                    <Button
                                        startIcon={
                                            <EditOutlinedIcon />
                                        }
                                        onClick={() =>
                                            setEditingRating(
                                                true
                                            )
                                        }
                                        sx={{
                                            color:
                                                "#FF6B00",
                                            textTransform:
                                                "none",
                                            fontWeight:
                                                700,
                                        }}
                                    >
                                        Modifier
                                    </Button>

                                )}

                        </Box>


                        <Divider
                            sx={{
                                my: 2.5,
                                borderColor:
                                    "#F1F5F9",
                            }}
                        />


                        {rating &&
                        !editingRating ? (



                            <Box>

                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 1.5,
                                        mb: 2,
                                    }}
                                >

                                    <Rating
                                        value={
                                            rating.score
                                        }
                                        readOnly
                                        size="large"
                                    />

                                    <Typography
                                        sx={{
                                            fontSize:
                                                "14px",
                                            fontWeight:
                                                700,
                                            color:
                                                "#0B1F3A",
                                        }}
                                    >
                                        {rating.score} / 5
                                    </Typography>

                                </Box>


                                <Typography
                                    sx={{
                                        fontSize:
                                            "12px",
                                        fontWeight:
                                            700,
                                        color:
                                            "#94A3B8",
                                        textTransform:
                                            "uppercase",
                                        mb: 1,
                                    }}
                                >
                                    Commentaire
                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize:
                                            "14px",
                                        color:
                                            "#475569",
                                        lineHeight:
                                            1.7,
                                    }}
                                >
                                    {rating.comment}
                                </Typography>


                                {rating.createdAt && (

                                    <Typography
                                        sx={{
                                            mt: 2,
                                            fontSize:
                                                "11px",
                                            color:
                                                "#94A3B8",
                                        }}
                                    >
                                        Évalué le{" "}
                                        {formatDate(
                                            rating.createdAt
                                        )}
                                    </Typography>

                                )}

                            </Box>

                        ) : (



                            <Box
                                sx={{
                                    maxWidth:
                                        "650px",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize:
                                            "13px",
                                        fontWeight:
                                            600,
                                        color:
                                            "#475569",
                                        mb: 1,
                                    }}
                                >
                                    Note
                                </Typography>


                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 1.5,
                                        mb: 3,
                                    }}
                                >

                                    <Rating
                                        value={score}
                                        onChange={(
                                            event,
                                            newValue
                                        ) =>
                                            setScore(
                                                newValue ||
                                                0
                                            )
                                        }
                                        size="large"
                                    />

                                    {score > 0 && (

                                        <Typography
                                            sx={{
                                                fontSize:
                                                    "13px",
                                                fontWeight:
                                                    700,
                                                color:
                                                    "#0B1F3A",
                                            }}
                                        >
                                            {score} / 5
                                        </Typography>

                                    )}

                                </Box>


                                <TextField
                                    label="Commentaire"
                                    value={comment}
                                    onChange={(
                                        event
                                    ) =>
                                        setComment(
                                            event.target
                                                .value
                                        )
                                    }
                                    placeholder="Partagez votre expérience avec ce chauffeur..."
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                />


                                <Box
                                    sx={{
                                        mt: 2.5,
                                        display:
                                            "flex",
                                        justifyContent:
                                            "flex-end",
                                        gap: 1,
                                    }}
                                >

                                    {rating && (

                                        <Button
                                            disabled={
                                                ratingLoading
                                            }
                                            onClick={
                                                handleCancelRatingEdit
                                            }
                                            sx={{
                                                color:
                                                    "#64748B",
                                                textTransform:
                                                    "none",
                                                fontWeight:
                                                    700,
                                            }}
                                        >
                                            Annuler
                                        </Button>

                                    )}


                                    <Button
                                        variant="contained"
                                        disabled={
                                            ratingLoading
                                        }
                                        onClick={
                                            handleRatingSubmit
                                        }
                                        startIcon={
                                            ratingLoading
                                                ? (
                                                    <CircularProgress
                                                        size={
                                                            16
                                                        }
                                                        sx={{
                                                            color:
                                                                "#FFFFFF",
                                                        }}
                                                    />
                                                )
                                                : (
                                                    <StarRoundedIcon />
                                                )
                                        }
                                        sx={{
                                            bgcolor:
                                                "#FF6B00",
                                            color:
                                                "#FFFFFF",
                                            textTransform:
                                                "none",
                                            fontWeight:
                                                700,
                                            borderRadius:
                                                "9px",
                                            boxShadow:
                                                "none",

                                            "&:hover": {
                                                bgcolor:
                                                    "#E65F00",
                                                boxShadow:
                                                    "none",
                                            },

                                            "&.Mui-disabled": {
                                                bgcolor:
                                                    "#FDBA8C",
                                                color:
                                                    "#FFFFFF",
                                            },
                                        }}
                                    >
                                        {ratingLoading
                                            ? "Enregistrement..."
                                            : rating
                                                ? "Enregistrer les modifications"
                                                : "Envoyer l'évaluation"
                                        }
                                    </Button>

                                </Box>

                            </Box>

                        )}

                    </Paper>

                )}

        </Box>
    );
};




const SectionTitle = ({
                          icon,
                          title,
                      }) => {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >

            <Box
                sx={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    bgcolor: "#FFF7ED",
                    color: "#FF6B00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& svg": {
                        fontSize: "20px",
                    },
                }}
            >
                {icon}
            </Box>


            <Typography
                sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0B1F3A",
                }}
            >
                {title}
            </Typography>

        </Box>

    );
};




const InfoItem = ({
                      icon,
                      label,
                      value,
                  }) => {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
            }}
        >

            <Box
                sx={{
                    color: "#94A3B8",
                    mt: "2px",

                    "& svg": {
                        fontSize: "19px",
                    },
                }}
            >
                {icon}
            </Box>


            <Box>

                <Typography
                    sx={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#94A3B8",
                        textTransform:
                            "uppercase",
                        mb: 0.4,
                    }}
                >
                    {label}
                </Typography>


                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#334155",
                        wordBreak:
                            "break-word",
                    }}
                >
                    {value || "-"}
                </Typography>

            </Box>

        </Box>

    );
};


export default DeliveryDetails;