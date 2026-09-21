import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import AddRoundedIcon
    from "@mui/icons-material/AddRounded";

import EditOutlinedIcon
    from "@mui/icons-material/EditOutlined";

import DeleteOutlineRoundedIcon
    from "@mui/icons-material/DeleteOutlineRounded";

import DirectionsCarOutlinedIcon
    from "@mui/icons-material/DirectionsCarOutlined";

import {
    createVehicle,
    deleteVehicle,
    getAllVehicles,
    updateVehicle,
} from "../../api/vehicleService.js";


const vehicleTypes = [
    {
        value: "MOTO",
        label: "Moto",
    },
    {
        value: "VOITURE",
        label: "Voiture",
    },
    {
        value: "CAMIONNETTE",
        label: "Camionnette",
    },
    {
        value: "VELO",
        label: "Vélo",
    },
];


const initialForm = {
    type: "",
    capacityKg: "",
};


const AdminVehicles = () => {

    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [totalElements, setTotalElements] =
        useState(0);

    const [form, setForm] =
        useState(initialForm);

    const [formErrors, setFormErrors] =
        useState({});

    const [selectedVehicle, setSelectedVehicle] =
        useState(null);

    const [formDialogOpen, setFormDialogOpen] =
        useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [deleting, setDeleting] =
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


    const fetchVehicles = async () => {

        try {

            setLoading(true);

            const response =
                await getAllVehicles(
                    page,
                    rowsPerPage,
                    "id",
                    "asc"
                );

            setVehicles(
                response.data.content ?? []
            );

            setTotalElements(
                response.data.totalElements ?? 0
            );

        } catch (error) {

            console.error(
                "Erreur chargement véhicules:",
                error
            );

            showMessage(
                "Impossible de charger les véhicules.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchVehicles();

    }, [page, rowsPerPage]);


    const handleOpenCreate = () => {

        setSelectedVehicle(null);

        setForm(initialForm);

        setFormErrors({});

        setFormDialogOpen(true);
    };


    const handleOpenEdit = (vehicle) => {

        setSelectedVehicle(vehicle);

        setForm({
            type: vehicle.type ?? "",
            capacityKg:
                vehicle.capacityKg ?? "",
        });

        setFormErrors({});

        setFormDialogOpen(true);
    };


    const handleCloseForm = () => {

        if (saving) {
            return;
        }

        setFormDialogOpen(false);

        setSelectedVehicle(null);

        setForm(initialForm);

        setFormErrors({});
    };


    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setForm(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

        setFormErrors(
            (previous) => ({
                ...previous,
                [name]: "",
            })
        );
    };


    const validateForm = () => {

        const errors = {};

        if (!form.type) {

            errors.type =
                "Le type est obligatoire.";
        }

        if (
            form.capacityKg === "" ||
            form.capacityKg === null
        ) {

            errors.capacityKg =
                "La capacité est obligatoire.";

        } else if (
            Number(form.capacityKg) < 0.1
        ) {

            errors.capacityKg =
                "La capacité doit être supérieure à 0.";
        }

        setFormErrors(errors);

        return (
            Object.keys(errors).length === 0
        );
    };


    const handleSubmit = async () => {

        if (!validateForm()) {
            return;
        }

        const data = {
            type: form.type,
            capacityKg:
                Number(form.capacityKg),
        };

        try {

            setSaving(true);

            if (selectedVehicle) {

                await updateVehicle(
                    selectedVehicle.id,
                    data
                );

                showMessage(
                    "Véhicule modifié avec succès."
                );

            } else {

                await createVehicle(data);

                showMessage(
                    "Véhicule ajouté avec succès."
                );
            }

            setFormDialogOpen(false);

            setSelectedVehicle(null);

            setForm(initialForm);

            setFormErrors({});

            if (
                !selectedVehicle &&
                page !== 0
            ) {

                setPage(0);

            } else {

                await fetchVehicles();
            }

        } catch (error) {

            console.error(
                "Erreur enregistrement véhicule:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible d'enregistrer le véhicule.",
                "error"
            );

        } finally {

            setSaving(false);
        }
    };


    const handleOpenDelete = (vehicle) => {

        setSelectedVehicle(vehicle);

        setDeleteDialogOpen(true);
    };


    const handleCloseDelete = () => {

        if (deleting) {
            return;
        }

        setDeleteDialogOpen(false);

        setSelectedVehicle(null);
    };


    const handleDelete = async () => {

        if (!selectedVehicle) {
            return;
        }

        try {

            setDeleting(true);

            await deleteVehicle(
                selectedVehicle.id
            );

            showMessage(
                "Véhicule supprimé avec succès."
            );

            setDeleteDialogOpen(false);

            setSelectedVehicle(null);

            if (
                vehicles.length === 1 &&
                page > 0
            ) {

                setPage(
                    (previous) =>
                        previous - 1
                );

            } else {

                await fetchVehicles();
            }

        } catch (error) {

            console.error(
                "Erreur suppression véhicule:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible de supprimer le véhicule.",
                "error"
            );

        } finally {

            setDeleting(false);
        }
    };


    const handleChangePage = (
        event,
        newPage
    ) => {

        setPage(newPage);
    };


    const handleChangeRowsPerPage = (
        event
    ) => {

        setRowsPerPage(
            parseInt(
                event.target.value,
                10
            )
        );

        setPage(0);
    };


    return (

        <Box>

            <Box
                sx={{
                    mb: 3,
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
                        Gestion des véhicules
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: "14px",
                            color: "#6B7280",
                        }}
                    >
                        Gérez les véhicules de la plateforme.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRoundedIcon />
                    }
                    onClick={
                        handleOpenCreate
                    }
                    sx={{
                        bgcolor: "#FF6B00",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "9px",
                        boxShadow: "none",
                        px: 2,
                        "&:hover": {
                            bgcolor: "#E66000",
                            boxShadow: "none",
                        },
                    }}
                >
                    Ajouter un véhicule
                </Button>

            </Box>


            <Paper
                elevation={0}
                sx={{
                    border:
                        "1px solid #E5E7EB",
                    borderRadius: "14px",
                    overflow: "hidden",
                    bgcolor: "#FFFFFF",
                }}
            >

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor:
                                        "#F8FAFC",
                                }}
                            >

                                <TableCell
                                    sx={
                                        headerCellStyle
                                    }
                                >
                                    ID
                                </TableCell>

                                <TableCell
                                    sx={
                                        headerCellStyle
                                    }
                                >
                                    Type
                                </TableCell>

                                <TableCell
                                    sx={
                                        headerCellStyle
                                    }
                                >
                                    Capacité
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={
                                        headerCellStyle
                                    }
                                >
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {loading ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                        sx={{
                                            py: 7,
                                        }}
                                    >

                                        <CircularProgress
                                            size={30}
                                            sx={{
                                                color:
                                                    "#FF6B00",
                                            }}
                                        />

                                    </TableCell>

                                </TableRow>

                            ) : vehicles.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                        sx={{
                                            py: 7,
                                        }}
                                    >

                                        <DirectionsCarOutlinedIcon
                                            sx={{
                                                fontSize:
                                                    "42px",
                                                color:
                                                    "#CBD5E1",
                                                mb: 1,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "14px",
                                                fontWeight:
                                                    600,
                                            }}
                                        >
                                            Aucun véhicule trouvé
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 0.5,
                                                color:
                                                    "#94A3B8",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            Ajoutez votre premier véhicule.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                vehicles.map(
                                    (vehicle) => (

                                        <TableRow
                                            key={
                                                vehicle.id
                                            }
                                            hover
                                            sx={{
                                                "&:last-child td":
                                                    {
                                                        borderBottom:
                                                            0,
                                                    },
                                            }}
                                        >

                                            <TableCell
                                                sx={
                                                    bodyCellStyle
                                                }
                                            >

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        fontWeight:
                                                            600,
                                                        color:
                                                            "#64748B",
                                                    }}
                                                >
                                                    #{vehicle.id}
                                                </Typography>

                                            </TableCell>


                                            <TableCell
                                                sx={
                                                    bodyCellStyle
                                                }
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        gap: 1.5,
                                                    }}
                                                >

                                                    <Box
                                                        sx={{
                                                            width:
                                                                38,
                                                            height:
                                                                38,
                                                            borderRadius:
                                                                "9px",
                                                            bgcolor:
                                                                "#FFF7ED",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            flexShrink:
                                                                0,
                                                        }}
                                                    >

                                                        <DirectionsCarOutlinedIcon
                                                            sx={{
                                                                color:
                                                                    "#FF6B00",
                                                                fontSize:
                                                                    "21px",
                                                            }}
                                                        />

                                                    </Box>

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
                                                        {
                                                            vehicleTypes.find(
                                                                (
                                                                    type
                                                                ) =>
                                                                    type.value ===
                                                                    vehicle.type
                                                            )
                                                                ?.label ??
                                                            vehicle.type
                                                        }
                                                    </Typography>

                                                </Box>

                                            </TableCell>


                                            <TableCell
                                                sx={
                                                    bodyCellStyle
                                                }
                                            >

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        color:
                                                            "#475569",
                                                        fontWeight:
                                                            600,
                                                    }}
                                                >
                                                    {vehicle.capacityKg} kg
                                                </Typography>

                                            </TableCell>


                                            <TableCell
                                                align="right"
                                                sx={
                                                    bodyCellStyle
                                                }
                                            >

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleOpenEdit(
                                                            vehicle
                                                        )
                                                    }
                                                    sx={{
                                                        color:
                                                            "#2563EB",
                                                        bgcolor:
                                                            "#EFF6FF",
                                                        mr: 1,
                                                        "&:hover":
                                                            {
                                                                bgcolor:
                                                                    "#DBEAFE",
                                                            },
                                                    }}
                                                >
                                                    <EditOutlinedIcon
                                                        fontSize="small"
                                                    />
                                                </IconButton>


                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleOpenDelete(
                                                            vehicle
                                                        )
                                                    }
                                                    sx={{
                                                        color:
                                                            "#DC2626",
                                                        bgcolor:
                                                            "#FEF2F2",
                                                        "&:hover":
                                                            {
                                                                bgcolor:
                                                                    "#FEE2E2",
                                                            },
                                                    }}
                                                >
                                                    <DeleteOutlineRoundedIcon
                                                        fontSize="small"
                                                    />
                                                </IconButton>

                                            </TableCell>

                                        </TableRow>

                                    )
                                )

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={
                        handleChangePage
                    }
                    rowsPerPage={
                        rowsPerPage
                    }
                    onRowsPerPageChange={
                        handleChangeRowsPerPage
                    }
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                    ]}
                    labelRowsPerPage="Lignes par page :"
                />

            </Paper>


            <Dialog
                open={formDialogOpen}
                onClose={handleCloseForm}
                fullWidth
                maxWidth="sm"
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
                        pb: 1,
                    }}
                >
                    {selectedVehicle
                        ? "Modifier le véhicule"
                        : "Ajouter un véhicule"}
                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            mt: 1,
                            mb: 1,
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#64748B",
                        }}
                    >
                        Type de véhicule
                    </Typography>


                    <FormControl
                        fullWidth
                        size="small"
                        error={
                            Boolean(
                                formErrors.type
                            )
                        }
                    >

                        <Select
                            name="type"
                            value={form.type}
                            displayEmpty
                            onChange={
                                handleChange
                            }
                            sx={{
                                borderRadius:
                                    "9px",
                            }}
                        >

                            <MenuItem
                                value=""
                                disabled
                            >
                                Sélectionner un type
                            </MenuItem>

                            {vehicleTypes.map(
                                (type) => (

                                    <MenuItem
                                        key={
                                            type.value
                                        }
                                        value={
                                            type.value
                                        }
                                    >
                                        {type.label}
                                    </MenuItem>

                                )
                            )}

                        </Select>

                    </FormControl>


                    {formErrors.type && (

                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize:
                                    "11px",
                                color:
                                    "#DC2626",
                            }}
                        >
                            {formErrors.type}
                        </Typography>

                    )}


                    <Typography
                        sx={{
                            mt: 2.5,
                            mb: 1,
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#64748B",
                        }}
                    >
                        Capacité (kg)
                    </Typography>


                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name="capacityKg"
                        value={
                            form.capacityKg
                        }
                        onChange={
                            handleChange
                        }
                        error={
                            Boolean(
                                formErrors.capacityKg
                            )
                        }
                        helperText={
                            formErrors.capacityKg
                        }
                        inputProps={{
                            min: 0.1,
                            step: 0.1,
                        }}
                        placeholder="Ex: 30"
                        sx={{
                            "& .MuiOutlinedInput-root":
                                {
                                    borderRadius:
                                        "9px",
                                },
                        }}
                    />

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={
                            handleCloseForm
                        }
                        disabled={saving}
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
                            handleSubmit
                        }
                        disabled={saving}
                        sx={{
                            minWidth:
                                "120px",
                            bgcolor:
                                "#FF6B00",
                            textTransform:
                                "none",
                            borderRadius:
                                "9px",
                            boxShadow:
                                "none",
                            "&:hover": {
                                bgcolor:
                                    "#E66000",
                                boxShadow:
                                    "none",
                            },
                        }}
                    >

                        {saving ? (

                            <CircularProgress
                                size={20}
                                sx={{
                                    color:
                                        "#FFFFFF",
                                }}
                            />

                        ) : selectedVehicle ? (

                            "Modifier"

                        ) : (

                            "Ajouter"

                        )}

                    </Button>

                </DialogActions>

            </Dialog>


            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDelete}
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
                    Supprimer le véhicule
                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: "14px",
                            lineHeight: 1.7,
                        }}
                    >
                        Voulez-vous vraiment supprimer le véhicule
                        {" "}
                        <strong>
                            #{selectedVehicle?.id}
                        </strong>
                        {" "}
                        ?
                    </Typography>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={
                            handleCloseDelete
                        }
                        disabled={deleting}
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
                            handleDelete
                        }
                        disabled={deleting}
                        sx={{
                            minWidth:
                                "110px",
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

                        {deleting ? (

                            <CircularProgress
                                size={20}
                                sx={{
                                    color:
                                        "#FFFFFF",
                                }}
                            />

                        ) : (

                            "Supprimer"

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


const headerCellStyle = {
    py: 1.7,
    fontSize: "11px",
    fontWeight: 700,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom:
        "1px solid #E5E7EB",
};


const bodyCellStyle = {
    py: 1.7,
    borderBottom:
        "1px solid #F1F5F9",
};


export default AdminVehicles;