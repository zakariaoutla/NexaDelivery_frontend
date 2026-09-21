import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    MenuItem,
    Paper,
    Select,
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

import EmailOutlinedIcon
    from "@mui/icons-material/EmailOutlined";

import PhoneOutlinedIcon
    from "@mui/icons-material/PhoneOutlined";

import StarRoundedIcon
    from "@mui/icons-material/StarRounded";

import DirectionsCarOutlinedIcon
    from "@mui/icons-material/DirectionsCarOutlined";

import DeleteOutlineRoundedIcon
    from "@mui/icons-material/DeleteOutlineRounded";

import {
    assignVehicleToDriver,
    getDriverById,
    removeVehicleFromDriver,
} from "../../api/driverService.js";

import {
    getAllVehicles,
} from "../../api/vehicleService.js";


const statusConfig = {
    DISPONIBLE: {
        label: "Disponible",
        bgcolor: "#F0FDF4",
        color: "#16A34A",
    },
    EN_ATTENTE_ACCEPTATION: {
        label: "En attente d'acceptation",
        bgcolor: "#FFF7ED",
        color: "#EA580C",
    },
    EN_LIVRAISON: {
        label: "En livraison",
        bgcolor: "#EFF6FF",
        color: "#2563EB",
    },
    HORS_SERVICE: {
        label: "Hors service",
        bgcolor: "#FEF2F2",
        color: "#DC2626",
    },
};


const AdminDriverDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [driver, setDriver] =
        useState(null);

    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [vehicleId, setVehicleId] =
        useState("");

    const [vehicleLoading, setVehicleLoading] =
        useState(false);

    const [removeDialogOpen, setRemoveDialogOpen] =
        useState(false);

    const [removeLoading, setRemoveLoading] =
        useState(false);

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


    const loadDriver = async () => {

        const response =
            await getDriverById(id);

        const data = response.data;

        setDriver(data);

        setVehicleId(
            data.vehicleId ?? ""
        );
    };


    const loadVehicles = async () => {

        const response =
            await getAllVehicles(
                0,
                100,
                "id",
                "asc"
            );

        setVehicles(
            response.data.content ?? []
        );
    };


    const loadData = async () => {

        try {

            setLoading(true);

            await Promise.all([
                loadDriver(),
                loadVehicles(),
            ]);

        } catch (error) {

            console.error(
                "Erreur chargement chauffeur:",
                error
            );

            showMessage(
                "Impossible de charger les informations du chauffeur.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadData();

    }, [id]);


    const handleAssignVehicle = async () => {

        if (!vehicleId) {

            showMessage(
                "Sélectionnez un véhicule.",
                "error"
            );

            return;
        }

        try {

            setVehicleLoading(true);

            const response =
                await assignVehicleToDriver(
                    id,
                    vehicleId
                );

            setDriver(response.data);

            setVehicleId(
                response.data.vehicleId ?? ""
            );

            showMessage(
                "Véhicule affecté avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur affectation véhicule:",
                error
            );

            setVehicleId(
                driver?.vehicleId ?? ""
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible d'affecter le véhicule.",
                "error"
            );

        } finally {

            setVehicleLoading(false);
        }
    };


    const handleRemoveVehicle = async () => {

        try {

            setRemoveLoading(true);

            const response =
                await removeVehicleFromDriver(id);

            setDriver(response.data);

            setVehicleId("");

            setRemoveDialogOpen(false);

            showMessage(
                "Véhicule retiré avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur retrait véhicule:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible de retirer le véhicule.",
                "error"
            );

        } finally {

            setRemoveLoading(false);
        }
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


    if (!driver) {

        return (

            <Box>

                <Button
                    startIcon={
                        <ArrowBackRoundedIcon />
                    }
                    onClick={() =>
                        navigate("/admin/drivers")
                    }
                    sx={{
                        color: "#0B1F3A",
                        textTransform: "none",
                    }}
                >
                    Retour
                </Button>

                <Typography
                    sx={{
                        mt: 3,
                        color: "#6B7280",
                    }}
                >
                    Chauffeur introuvable.
                </Typography>

            </Box>
        );
    }


    const currentStatus =
        statusConfig[
            driver.driverStatus
            ] ?? {
            label: driver.driverStatus,
            bgcolor: "#F1F5F9",
            color: "#64748B",
        };


    const currentVehicle =
        vehicles.find(
            (vehicle) =>
                Number(vehicle.id) ===
                Number(driver.vehicleId)
        );


    return (

        <Box>

            <Button
                startIcon={
                    <ArrowBackRoundedIcon />
                }
                onClick={() =>
                    navigate("/admin/drivers")
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
                Retour aux chauffeurs
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
                    gap: 2,
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
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
                        Détails du chauffeur
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: "14px",
                            color: "#6B7280",
                        }}
                    >
                        Informations du chauffeur et véhicule affecté.
                    </Typography>

                </Box>


                <Chip
                    label={
                        currentStatus.label
                    }
                    sx={{
                        bgcolor:
                        currentStatus.bgcolor,
                        color:
                        currentStatus.color,
                        fontWeight: 700,
                        fontSize: "12px",
                    }}
                />

            </Box>


            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 1fr",
                    },
                    gap: 3,
                    alignItems: "start",
                }}
            >

                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            p: 2.5,
                            borderBottom:
                                "1px solid #F1F5F9",
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            Informations personnelles
                        </Typography>

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
                            value={driver.name}
                        />

                        <Divider />

                        <InfoRow
                            icon={
                                <EmailOutlinedIcon />
                            }
                            label="Email"
                            value={driver.email}
                        />

                        <Divider />

                        <InfoRow
                            icon={
                                <PhoneOutlinedIcon />
                            }
                            label="Téléphone"
                            value={
                                driver.telephone ||
                                "-"
                            }
                        />

                        <Divider />


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
                                    borderRadius:
                                        "10px",
                                    bgcolor:
                                        "#FFF7ED",
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    flexShrink: 0,
                                }}
                            >

                                <StarRoundedIcon
                                    sx={{
                                        color:
                                            "#F59E0B",
                                    }}
                                />

                            </Box>


                            <Box>

                                <Typography
                                    sx={{
                                        fontSize:
                                            "11px",
                                        color:
                                            "#94A3B8",
                                        fontWeight:
                                            600,
                                        textTransform:
                                            "uppercase",
                                    }}
                                >
                                    Note moyenne
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.3,
                                        fontSize:
                                            "14px",
                                        fontWeight:
                                            700,
                                        color:
                                            "#0B1F3A",
                                    }}
                                >
                                    {Number(
                                        driver.averageRating ??
                                        0
                                    ).toFixed(1)} / 5
                                </Typography>

                            </Box>

                        </Box>

                    </Box>

                </Paper>


                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius:
                            "14px",
                        bgcolor:
                            "#FFFFFF",
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            p: 2.5,
                            borderBottom:
                                "1px solid #F1F5F9",
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize:
                                    "16px",
                                fontWeight: 700,
                                color:
                                    "#0B1F3A",
                            }}
                        >
                            Véhicule
                        </Typography>

                    </Box>


                    <Box sx={{ p: 2.5 }}>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "space-between",
                                gap: 2,
                                mb: 3,
                                p: 2,
                                bgcolor:
                                    "#F8FAFC",
                                borderRadius:
                                    "10px",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: 1.5,
                                    width: "100%",
                                }}
                            >

                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius:
                                            "10px",
                                        bgcolor:
                                            "#FFF7ED",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        flexShrink: 0,
                                    }}
                                >

                                    <DirectionsCarOutlinedIcon
                                        sx={{
                                            color:
                                                "#FF6B00",
                                        }}
                                    />

                                </Box>


                                <Box>

                                    <Typography
                                        sx={{
                                            fontSize:
                                                "11px",
                                            color:
                                                "#94A3B8",
                                            fontWeight:
                                                600,
                                            textTransform:
                                                "uppercase",
                                        }}
                                    >
                                        Véhicule actuel
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 0.3,
                                            fontSize:
                                                "14px",
                                            fontWeight:
                                                700,
                                            color:
                                                "#0B1F3A",
                                        }}
                                    >
                                        {currentVehicle
                                            ? `${currentVehicle.type} — ${currentVehicle.capacityKg} kg`
                                            : driver.vehicleType ||
                                            "Non assigné"}
                                    </Typography>

                                    {driver.vehicleId && (

                                        <Typography
                                            sx={{
                                                mt: 0.3,
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#94A3B8",
                                            }}
                                        >
                                            ID véhicule : #{driver.vehicleId}
                                        </Typography>

                                    )}

                                </Box>

                            </Box>


                            {driver.vehicleId && (

                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={
                                        <DeleteOutlineRoundedIcon />
                                    }
                                    onClick={() =>
                                        setRemoveDialogOpen(
                                            true
                                        )
                                    }
                                    sx={{
                                        minWidth:
                                            "110px",
                                        flexShrink: 0,
                                        textTransform:
                                            "none",
                                        borderRadius:
                                            "9px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Retirer
                                </Button>

                            )}

                        </Box>


                        <Typography
                            sx={{
                                mb: 1,
                                fontSize:
                                    "12px",
                                color:
                                    "#64748B",
                                fontWeight: 600,
                            }}
                        >
                            {driver.vehicleId
                                ? "Changer le véhicule"
                                : "Affecter un véhicule"}
                        </Typography>


                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                            }}
                        >

                            <FormControl
                                size="small"
                                fullWidth
                            >

                                <Select
                                    value={
                                        vehicleId
                                    }
                                    displayEmpty
                                    onChange={(
                                        event
                                    ) =>
                                        setVehicleId(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    sx={{
                                        borderRadius:
                                            "9px",
                                        fontSize:
                                            "13px",
                                    }}
                                >

                                    <MenuItem
                                        value=""
                                        disabled
                                    >
                                        Sélectionner un véhicule
                                    </MenuItem>

                                    {vehicles.map(
                                        (vehicle) => (

                                            <MenuItem
                                                key={
                                                    vehicle.id
                                                }
                                                value={
                                                    vehicle.id
                                                }
                                            >
                                                {vehicle.type} — {vehicle.capacityKg} kg
                                            </MenuItem>

                                        )
                                    )}

                                </Select>

                            </FormControl>


                            <Button
                                variant="contained"
                                onClick={
                                    handleAssignVehicle
                                }
                                disabled={
                                    vehicleLoading ||
                                    !vehicleId ||
                                    Number(
                                        vehicleId
                                    ) ===
                                    Number(
                                        driver.vehicleId
                                    )
                                }
                                sx={{
                                    minWidth:
                                        "130px",
                                    bgcolor:
                                        "#0B1F3A",
                                    textTransform:
                                        "none",
                                    borderRadius:
                                        "9px",
                                    boxShadow:
                                        "none",
                                    "&:hover": {
                                        bgcolor:
                                            "#132F52",
                                        boxShadow:
                                            "none",
                                    },
                                }}
                            >

                                {vehicleLoading ? (

                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            color:
                                                "#FFFFFF",
                                        }}
                                    />

                                ) : driver.vehicleId ? (

                                    "Changer"

                                ) : (

                                    "Affecter"

                                )}

                            </Button>

                        </Box>

                    </Box>

                </Paper>

            </Box>


            <Dialog
                open={removeDialogOpen}
                onClose={() => {
                    if (!removeLoading) {
                        setRemoveDialogOpen(
                            false
                        );
                    }
                }}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius:
                            "14px",
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "#0B1F3A",
                    }}
                >
                    Retirer le véhicule
                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: "14px",
                            lineHeight: 1.7,
                        }}
                    >
                        Voulez-vous vraiment retirer ce véhicule du chauffeur
                        {" "}
                        <strong>
                            {driver.name}
                        </strong>
                        {" "}
                        ?
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.5,
                            color: "#94A3B8",
                            fontSize: "12px",
                        }}
                    >
                        Le véhicule ne sera pas supprimé. Il pourra être affecté à un autre chauffeur.
                    </Typography>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={() =>
                            setRemoveDialogOpen(
                                false
                            )
                        }
                        disabled={
                            removeLoading
                        }
                        sx={{
                            color: "#64748B",
                            textTransform:
                                "none",
                        }}
                    >
                        Annuler
                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            handleRemoveVehicle
                        }
                        disabled={
                            removeLoading
                        }
                        sx={{
                            minWidth:
                                "100px",
                            bgcolor:
                                "#DC2626",
                            textTransform:
                                "none",
                            borderRadius:
                                "9px",
                            boxShadow:
                                "none",
                            "&:hover": {
                                bgcolor:
                                    "#B91C1C",
                                boxShadow:
                                    "none",
                            },
                        }}
                    >

                        {removeLoading ? (

                            <CircularProgress
                                size={20}
                                sx={{
                                    color:
                                        "#FFFFFF",
                                }}
                            />

                        ) : (

                            "Retirer"

                        )}

                    </Button>

                </DialogActions>

            </Dialog>


            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
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
                        textTransform:
                            "uppercase",
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


export default AdminDriverDetails;