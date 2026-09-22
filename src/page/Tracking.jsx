import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Navbar from "../components/Home/NavBar.jsx";
import Footer from "../components/Home/Footer.jsx";
import { getPublicTracking } from "../api/trackingService.js";

const steps = [
    {
        status: "EN_ATTENTE",
        label: "Commande créée",
        description: "Votre demande de livraison a été enregistrée.",
    },
    {
        status: "ASSIGNEE",
        label: "Chauffeur assigné",
        description: "Un chauffeur a été assigné à votre livraison.",
    },
    {
        status: "ACCEPTEE",
        label: "Commande acceptée",
        description: "Le chauffeur a accepté votre livraison.",
    },
    {
        status: "RECUPEREE",
        label: "Colis récupéré",
        description: "Votre colis a été récupéré par le chauffeur.",
    },
    {
        status: "EN_ROUTE",
        label: "En route",
        description: "Votre colis est actuellement en route.",
    },
    {
        status: "LIVREE",
        label: "Livrée",
        description: "Votre colis a été livré avec succès.",
    },
];

const statusLabels = {
    EN_ATTENTE: "En attente",
    ASSIGNEE: "Chauffeur assigné",
    ACCEPTEE: "Acceptée",
    RECUPEREE: "Récupérée",
    EN_ROUTE: "En route",
    LIVREE: "Livrée",
    ANNULEE: "Annulée",
};

const formatDate = (date) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export default function Tracking() {
    const [trackingCode, setTrackingCode] = useState("");
    const [delivery, setDelivery] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTracking = async (event) => {
        event.preventDefault();

        const code = trackingCode.trim();

        if (!code) {
            setError("Veuillez saisir un code de suivi.");
            setDelivery(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getPublicTracking(code);

            setDelivery(data);
        } catch (err) {
            setDelivery(null);

            if (err.response?.status === 404) {
                setError(
                    "Aucune livraison trouvée avec ce code de suivi."
                );
            } else {
                setError(
                    "Impossible de récupérer les informations de livraison."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const currentStep = delivery
        ? steps.findIndex(
            (step) => step.status === delivery.deliveryStatus
        )
        : -1;

    return (
        <>
            <Navbar />

            <Box
                sx={{
                    bgcolor: "#061220",
                    minHeight: "calc(100vh - 80px)",
                    py: {
                        xs: 7,
                        md: 10,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            textAlign: "center",
                            maxWidth: "720px",
                            mx: "auto",
                            mb: 6,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FF6B00",
                                fontSize: "14px",
                                fontWeight: 700,
                                mb: 1.5,
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                            }}
                        >
                            Suivi de livraison
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                color: "#FFFFFF",
                                fontWeight: 800,
                                fontSize: {
                                    xs: "32px",
                                    md: "48px",
                                },
                                mb: 2,
                            }}
                        >
                            Où est votre colis ?
                        </Typography>

                        <Typography
                            sx={{
                                color: "#94A3B8",
                                fontSize: {
                                    xs: "15px",
                                    md: "17px",
                                },
                                lineHeight: 1.7,
                            }}
                        >
                            Entrez votre code de suivi pour connaître
                            l'état actuel de votre livraison.
                        </Typography>
                    </Box>

                    <Paper
                        component="form"
                        onSubmit={handleTracking}
                        elevation={0}
                        sx={{
                            maxWidth: "780px",
                            mx: "auto",
                            mb: 5,
                            p: {
                                xs: 2,
                                sm: 2.5,
                            },
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            display: "flex",
                            gap: 1.5,
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Ex : NX-A12B34CD"
                            value={trackingCode}
                            onChange={(event) =>
                                setTrackingCode(event.target.value)
                            }
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <SearchRoundedIcon
                                        sx={{
                                            color: "#94A3B8",
                                            mr: 1,
                                        }}
                                    />
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    bgcolor: "#F8FAFC",
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    sm: "180px",
                                },
                                minHeight: "56px",
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 700,
                                boxShadow: "none",
                                "&:hover": {
                                    bgcolor: "#E65F00",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={23}
                                    sx={{ color: "#FFFFFF" }}
                                />
                            ) : (
                                "Suivre mon colis"
                            )}
                        </Button>
                    </Paper>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                maxWidth: "780px",
                                mx: "auto",
                                mb: 4,
                                borderRadius: "12px",
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {delivery && (
                        <Box>
                            <Paper
                                elevation={0}
                                sx={{
                                    bgcolor: "#0B1F3A",
                                    border:
                                        "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "18px",
                                    p: {
                                        xs: 3,
                                        md: 4,
                                    },
                                    mb: 3,
                                }}
                            >
                                <Box
                                    sx={{
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
                                                color: "#94A3B8",
                                                fontSize: "13px",
                                                mb: 0.5,
                                            }}
                                        >
                                            Code de suivi
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#FFFFFF",
                                                fontSize: {
                                                    xs: "20px",
                                                    md: "24px",
                                                },
                                                fontWeight: 800,
                                            }}
                                        >
                                            {delivery.trackingCode}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            borderRadius: "30px",
                                            bgcolor:
                                                delivery.deliveryStatus ===
                                                "ANNULEE"
                                                    ? "rgba(239,68,68,0.12)"
                                                    : "rgba(255,107,0,0.12)",
                                            color:
                                                delivery.deliveryStatus ===
                                                "ANNULEE"
                                                    ? "#EF4444"
                                                    : "#FF6B00",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {statusLabels[
                                                delivery.deliveryStatus
                                                ] ??
                                            delivery.deliveryStatus}
                                    </Box>
                                </Box>

                                <Divider
                                    sx={{
                                        my: 3,
                                        borderColor:
                                            "rgba(255,255,255,0.08)",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                        mb: 3,
                                    }}
                                >
                                    Progression de la livraison
                                </Typography>

                                {delivery.deliveryStatus ===
                                "ANNULEE" ? (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            borderRadius: "12px",
                                        }}
                                    >
                                        Cette livraison a été annulée.
                                    </Alert>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column",
                                                md: "row",
                                            },
                                            gap: {
                                                xs: 0,
                                                md: 1,
                                            },
                                        }}
                                    >
                                        {steps.map(
                                            (step, index) => {
                                                const completed =
                                                    index <=
                                                    currentStep;

                                                return (
                                                    <Box
                                                        key={
                                                            step.status
                                                        }
                                                        sx={{
                                                            flex: 1,
                                                            position:
                                                                "relative",
                                                            display:
                                                                "flex",
                                                            flexDirection: {
                                                                xs: "row",
                                                                md: "column",
                                                            },
                                                            alignItems: {
                                                                xs: "flex-start",
                                                                md: "center",
                                                            },
                                                            gap: {
                                                                xs: 2,
                                                                md: 1,
                                                            },
                                                            pb: {
                                                                xs: 3,
                                                                md: 0,
                                                            },
                                                        }}
                                                    >
                                                        {index <
                                                            steps.length -
                                                            1 && (
                                                                <Box
                                                                    sx={{
                                                                        position:
                                                                            "absolute",
                                                                        bgcolor:
                                                                            index <
                                                                            currentStep
                                                                                ? "#FF6B00"
                                                                                : "rgba(255,255,255,0.12)",
                                                                        left: {
                                                                            xs: "17px",
                                                                            md: "50%",
                                                                        },
                                                                        top: {
                                                                            xs: "34px",
                                                                            md: "17px",
                                                                        },
                                                                        width: {
                                                                            xs: "2px",
                                                                            md: "100%",
                                                                        },
                                                                        height: {
                                                                            xs: "calc(100% - 20px)",
                                                                            md: "2px",
                                                                        },
                                                                        zIndex: 0,
                                                                    }}
                                                                />
                                                            )}

                                                        <Box
                                                            sx={{
                                                                width: 36,
                                                                height: 36,
                                                                minWidth: 36,
                                                                borderRadius:
                                                                    "50%",
                                                                display:
                                                                    "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                bgcolor:
                                                                    completed
                                                                        ? "#FF6B00"
                                                                        : "#162B46",
                                                                border:
                                                                    completed
                                                                        ? "none"
                                                                        : "1px solid rgba(255,255,255,0.12)",
                                                                color: "#FFFFFF",
                                                                position:
                                                                    "relative",
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            {completed ? (
                                                                <CheckRoundedIcon
                                                                    sx={{
                                                                        fontSize: 20,
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        width: 7,
                                                                        height: 7,
                                                                        borderRadius:
                                                                            "50%",
                                                                        bgcolor:
                                                                            "#64748B",
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                textAlign: {
                                                                    xs: "left",
                                                                    md: "center",
                                                                },
                                                                px: {
                                                                    md: 1,
                                                                },
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    color: completed
                                                                        ? "#FFFFFF"
                                                                        : "#64748B",
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        "13px",
                                                                    mt: {
                                                                        md: 1,
                                                                    },
                                                                }}
                                                            >
                                                                {
                                                                    step.label
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                );
                                            }
                                        )}
                                    </Box>
                                )}
                            </Paper>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "1fr 1fr",
                                    },
                                    gap: 3,
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        bgcolor: "#0B1F3A",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: "18px",
                                        p: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            mb: 3,
                                        }}
                                    >
                                        <Inventory2OutlinedIcon
                                            sx={{
                                                color: "#FF6B00",
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color: "#FFFFFF",
                                                fontWeight: 700,
                                                fontSize: "17px",
                                            }}
                                        >
                                            Informations du colis
                                        </Typography>
                                    </Box>

                                    <InfoRow
                                        icon={
                                            <StorefrontOutlinedIcon />
                                        }
                                        label="Expéditeur"
                                        value={
                                            delivery.merchantName ||
                                            "—"
                                        }
                                    />

                                    <InfoRow
                                        icon={
                                            <LocationOnOutlinedIcon />
                                        }
                                        label="Point de départ"
                                        value={
                                            delivery.pickupAddress ||
                                            "—"
                                        }
                                    />

                                    <InfoRow
                                        icon={
                                            <LocationOnOutlinedIcon />
                                        }
                                        label="Destination"
                                        value={
                                            delivery.dropAddress ||
                                            "—"
                                        }
                                    />

                                    <InfoRow
                                        icon={
                                            <LocalShippingRoundedIcon />
                                        }
                                        label="Description"
                                        value={
                                            delivery.description ||
                                            "—"
                                        }
                                    />
                                </Paper>

                                <Paper
                                    elevation={0}
                                    sx={{
                                        bgcolor: "#0B1F3A",
                                        border:
                                            "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: "18px",
                                        p: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            mb: 3,
                                        }}
                                    >
                                        <LocalShippingRoundedIcon
                                            sx={{
                                                color: "#FF6B00",
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color: "#FFFFFF",
                                                fontWeight: 700,
                                                fontSize: "17px",
                                            }}
                                        >
                                            Détails de livraison
                                        </Typography>
                                    </Box>

                                    <InfoRow
                                        icon={
                                            <PersonOutlineRoundedIcon />
                                        }
                                        label="Chauffeur"
                                        value={
                                            delivery.driverName ||
                                            "Pas encore assigné"
                                        }
                                    />

                                    <InfoRow
                                        icon={
                                            <Inventory2OutlinedIcon />
                                        }
                                        label="Créée le"
                                        value={formatDate(
                                            delivery.createdAt
                                        )}
                                    />

                                    <InfoRow
                                        icon={
                                            <LocalShippingRoundedIcon />
                                        }
                                        label="Statut actuel"
                                        value={
                                            statusLabels[
                                                delivery
                                                    .deliveryStatus
                                                ] ??
                                            delivery.deliveryStatus
                                        }
                                        last
                                    />
                                </Paper>
                            </Box>
                        </Box>
                    )}
                </Container>
            </Box>

            <Footer />
        </>
    );
}

function InfoRow({ icon, label, value, last = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 1.5,
                py: 2,
                borderBottom: last
                    ? "none"
                    : "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <Box
                sx={{
                    color: "#64748B",
                    display: "flex",
                    alignItems: "flex-start",
                    pt: 0.2,
                    "& svg": {
                        fontSize: 20,
                    },
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    sx={{
                        color: "#64748B",
                        fontSize: "12px",
                        mb: 0.4,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}