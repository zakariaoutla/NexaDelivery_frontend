import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Snackbar,
    Typography,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import ArrowBackRoundedIcon
    from "@mui/icons-material/ArrowBackRounded";

import PersonOutlineRoundedIcon
    from "@mui/icons-material/PersonOutlineRounded";

import StorefrontOutlinedIcon
    from "@mui/icons-material/StorefrontOutlined";

import EmailOutlinedIcon
    from "@mui/icons-material/EmailOutlined";

import PhoneOutlinedIcon
    from "@mui/icons-material/PhoneOutlined";

import {
    getMerchantById,
} from "../../api/merchantService.js";


const AdminMerchantDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [merchant, setMerchant] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success",
        });


    const showMessage = (
        message,
        severity = "success"
    ) => {

        setSnackbar({
            open: true,
            message,
            severity,
        });
    };


    const loadMerchant = async () => {

        try {

            setLoading(true);

            const response =
                await getMerchantById(id);

            setMerchant(
                response.data
            );

        } catch (error) {

            console.error(
                "Erreur chargement commerçant:",
                error
            );

            setMerchant(null);

            showMessage(
                error.response?.data?.message ||
                "Impossible de charger les informations du commerçant.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadMerchant();

    }, [id]);


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


    if (!merchant) {

        return (

            <Box>

                <Button
                    startIcon={
                        <ArrowBackRoundedIcon />
                    }
                    onClick={() =>
                        navigate(
                            "/admin/merchants"
                        )
                    }
                    sx={{
                        color: "#0B1F3A",
                        textTransform: "none",
                    }}
                >
                    Retour aux commerçants
                </Button>

                <Typography
                    sx={{
                        mt: 3,
                        color: "#6B7280",
                    }}
                >
                    Commerçant introuvable.
                </Typography>

                <Snackbar
                    open={
                        snackbar.open
                    }
                    autoHideDuration={
                        3500
                    }
                    onClose={() =>
                        setSnackbar(
                            (previous) => ({
                                ...previous,
                                open: false,
                            })
                        )
                    }
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >

                    <Alert
                        severity={
                            snackbar.severity
                        }
                        onClose={() =>
                            setSnackbar(
                                (previous) => ({
                                    ...previous,
                                    open: false,
                                })
                            )
                        }
                    >
                        {snackbar.message}
                    </Alert>

                </Snackbar>

            </Box>
        );
    }


    return (

        <Box>

            <Button
                startIcon={
                    <ArrowBackRoundedIcon />
                }
                onClick={() =>
                    navigate(
                        "/admin/merchants"
                    )
                }
                sx={{
                    mb: 2,
                    color: "#64748B",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                        color: "#FF6B00",
                        bgcolor: "#FFF7ED",
                    },
                }}
            >
                Retour aux commerçants
            </Button>


            <Box
                sx={{
                    mb: 3,
                }}
            >

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
                    Détails du commerçant
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "14px",
                        color: "#6B7280",
                    }}
                >
                    Informations du commerçant et de son entreprise.
                </Typography>

            </Box>


            <Paper
                elevation={0}
                sx={{
                    border:
                        "1px solid #E5E7EB",
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                    overflow: "hidden",
                    maxWidth: "750px",
                }}
            >

                <Box
                    sx={{
                        p: 2.5,
                        borderBottom:
                            "1px solid #F1F5F9",
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >

                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: "10px",
                                bgcolor: "#FFF7ED",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >

                            <StorefrontOutlinedIcon
                                sx={{
                                    color: "#FF6B00",
                                }}
                            />

                        </Box>


                        <Box>

                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    color: "#0B1F3A",
                                }}
                            >
                                {merchant.businessName}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.2,
                                    fontSize: "12px",
                                    color: "#94A3B8",
                                }}
                            >
                                Commerçant #{merchant.id}
                            </Typography>

                        </Box>

                    </Box>

                </Box>


                <Box
                    sx={{
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                    }}
                >

                    <InfoRow
                        icon={
                            <PersonOutlineRoundedIcon />
                        }
                        label="Nom"
                        value={
                            merchant.name
                        }
                    />

                    <Divider />

                    <InfoRow
                        icon={
                            <StorefrontOutlinedIcon />
                        }
                        label="Entreprise"
                        value={
                            merchant.businessName
                        }
                    />

                    <Divider />

                    <InfoRow
                        icon={
                            <EmailOutlinedIcon />
                        }
                        label="Email"
                        value={
                            merchant.email
                        }
                    />

                    <Divider />

                    <InfoRow
                        icon={
                            <PhoneOutlinedIcon />
                        }
                        label="Téléphone"
                        value={
                            merchant.telephone
                        }
                    />

                </Box>

            </Paper>


            <Snackbar
                open={
                    snackbar.open
                }
                autoHideDuration={
                    3500
                }
                onClose={() =>
                    setSnackbar(
                        (previous) => ({
                            ...previous,
                            open: false,
                        })
                    )
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >

                <Alert
                    severity={
                        snackbar.severity
                    }
                    onClose={() =>
                        setSnackbar(
                            (previous) => ({
                                ...previous,
                                open: false,
                            })
                        )
                    }
                    sx={{
                        width: "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </Box>
    );
};


const InfoRow = ({
                     icon,
                     label,
                     value,
                 }) => {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >

            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "#F8FAFC",
                    color: "#64748B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    "& svg": {
                        fontSize: "21px",
                    },
                }}
            >
                {icon}
            </Box>


            <Box
                sx={{
                    minWidth: 0,
                }}
            >

                <Typography
                    sx={{
                        fontSize: "11px",
                        color: "#94A3B8",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        mt: 0.3,
                        fontSize: "14px",
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
};


export default AdminMerchantDetails;