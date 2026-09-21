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
    FormControl,
    IconButton,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import SearchRoundedIcon
    from "@mui/icons-material/SearchRounded";

import VisibilityOutlinedIcon
    from "@mui/icons-material/VisibilityOutlined";

import EditOutlinedIcon
    from "@mui/icons-material/EditOutlined";

import DeleteOutlineRoundedIcon
    from "@mui/icons-material/DeleteOutlineRounded";

import PeopleAltOutlinedIcon
    from "@mui/icons-material/PeopleAltOutlined";

import StarRoundedIcon
    from "@mui/icons-material/StarRounded";

import {
    deleteDriver,
    getAllDrivers,
    updateDriver,
} from "../../api/driverService.js";


const statusConfig = {
    DISPONIBLE: {
        label: "Disponible",
        bgcolor: "#F0FDF4",
        color: "#16A34A",
    },
    EN_ATTENTE_ACCEPTATION: {
        label: "En attente",
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


const AdminDrivers = () => {

    const navigate = useNavigate();

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("asc");

    const [selectedDriver, setSelectedDriver] = useState(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        telephone: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const pageSize = 10;


    const fetchDrivers = async () => {

        try {

            setLoading(true);

            const response = await getAllDrivers(
                page,
                pageSize,
                orderBy,
                order,
                search,
                statusFilter
            );

            setDrivers(
                response.data.content ?? []
            );

            setTotalPages(
                response.data.totalPages ?? 0
            );

        } catch (error) {

            console.error(
                "Erreur chargement chauffeurs:",
                error
            );

            showMessage(
                "Impossible de charger les chauffeurs.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        const timeout = setTimeout(() => {
            fetchDrivers();
        }, 400);

        return () => clearTimeout(timeout);

    }, [
        page,
        search,
        statusFilter,
        orderBy,
        order,
    ]);


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


    const handleSort = (property) => {

        const isAsc =
            orderBy === property &&
            order === "asc";

        setOrder(
            isAsc ? "desc" : "asc"
        );

        setOrderBy(property);
        setPage(0);
    };


    const handleOpenEdit = (driver) => {

        setSelectedDriver(driver);

        setEditForm({
            name: driver.name ?? "",
            email: driver.email ?? "",
            telephone: driver.telephone ?? "",
        });

        setFormErrors({});
        setEditOpen(true);
    };


    const handleCloseEdit = () => {

        if (editLoading) {
            return;
        }

        setEditOpen(false);
        setSelectedDriver(null);
        setFormErrors({});
    };


    const handleEditChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setEditForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setFormErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };


    const validateEditForm = () => {

        const errors = {};

        if (!editForm.name.trim()) {
            errors.name =
                "Le nom est obligatoire.";
        }

        if (!editForm.email.trim()) {

            errors.email =
                "L'email est obligatoire.";

        } else {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailRegex.test(
                    editForm.email.trim()
                )
            ) {
                errors.email =
                    "Format email invalide.";
            }
        }

        if (!editForm.telephone.trim()) {
            errors.telephone =
                "Le téléphone est obligatoire.";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };


    const handleUpdateDriver = async () => {

        if (
            !selectedDriver ||
            !validateEditForm()
        ) {
            return;
        }

        try {

            setEditLoading(true);

            const data = {
                name: editForm.name.trim(),
                email: editForm.email.trim(),
                telephone:
                    editForm.telephone.trim(),
            };

            await updateDriver(
                selectedDriver.id,
                data
            );

            setEditOpen(false);
            setSelectedDriver(null);

            showMessage(
                "Chauffeur modifié avec succès."
            );

            await fetchDrivers();

        } catch (error) {

            console.error(
                "Erreur modification chauffeur:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Impossible de modifier le chauffeur.";

            showMessage(
                message,
                "error"
            );

        } finally {

            setEditLoading(false);
        }
    };


    const handleOpenDelete = (driver) => {

        setSelectedDriver(driver);
        setDeleteOpen(true);
    };


    const handleCloseDelete = () => {

        if (deleteLoading) {
            return;
        }

        setDeleteOpen(false);
        setSelectedDriver(null);
    };


    const handleDeleteDriver = async () => {

        if (!selectedDriver) {
            return;
        }

        try {

            setDeleteLoading(true);

            await deleteDriver(
                selectedDriver.id
            );

            setDeleteOpen(false);
            setSelectedDriver(null);

            showMessage(
                "Chauffeur supprimé avec succès."
            );

            if (
                drivers.length === 1 &&
                page > 0
            ) {

                setPage(
                    (previous) => previous - 1
                );

            } else {

                await fetchDrivers();
            }

        } catch (error) {

            console.error(
                "Erreur suppression chauffeur:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Impossible de supprimer le chauffeur.";

            showMessage(
                message,
                "error"
            );

        } finally {

            setDeleteLoading(false);
        }
    };


    return (

        <Box>

            <Box sx={{ mb: 3 }}>

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
                    Gestion des chauffeurs
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "14px",
                        color: "#6B7280",
                    }}
                >
                    Gérez les chauffeurs de la plateforme.
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
                }}
            >

                <Box
                    sx={{
                        p: 2.5,
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        justifyContent:
                            "space-between",
                        borderBottom:
                            "1px solid #F1F5F9",
                    }}
                >

                    <TextField
                        size="small"
                        placeholder="Rechercher un chauffeur..."
                        value={search}
                        onChange={(event) => {
                            setSearch(
                                event.target.value
                            );
                            setPage(0);
                        }}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "320px",
                            },
                            "& .MuiOutlinedInput-root":
                                {
                                    borderRadius:
                                        "9px",
                                },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">

                                        <SearchRoundedIcon
                                            sx={{
                                                color:
                                                    "#94A3B8",
                                            }}
                                        />

                                    </InputAdornment>
                                ),
                            },
                        }}
                    />


                    <FormControl
                        size="small"
                        sx={{
                            minWidth: {
                                xs: "100%",
                                sm: "210px",
                            },
                        }}
                    >

                        <Select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(
                                    event.target.value
                                );
                                setPage(0);
                            }}
                            sx={{
                                borderRadius:
                                    "9px",
                                fontSize: "13px",
                            }}
                        >

                            <MenuItem value="ALL">
                                Tous les statuts
                            </MenuItem>

                            <MenuItem value="DISPONIBLE">
                                Disponible
                            </MenuItem>

                            <MenuItem value="EN_ATTENTE_ACCEPTATION">
                                En attente
                            </MenuItem>

                            <MenuItem value="EN_LIVRAISON">
                                En livraison
                            </MenuItem>

                            <MenuItem value="HORS_SERVICE">
                                Hors service
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Box>


                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor:
                                        "#F8FAFC",
                                }}
                            >

                                <SortableHeader
                                    label="Nom"
                                    property="name"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Email"
                                    property="email"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Téléphone"
                                    property="telephone"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Statut"
                                    property="driverStatus"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Note"
                                    property="averageRating"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <TableCell sx={headerStyle}>
                                    Véhicule
                                </TableCell>

                                <TableCell
                                    sx={headerStyle}
                                    align="right"
                                >
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {loading ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={7}
                                        sx={{
                                            py: 7,
                                            textAlign:
                                                "center",
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

                            ) : drivers.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={7}
                                        sx={{
                                            py: 7,
                                            textAlign:
                                                "center",
                                        }}
                                    >

                                        <PeopleAltOutlinedIcon
                                            sx={{
                                                fontSize:
                                                    "40px",
                                                color:
                                                    "#CBD5E1",
                                                mb: 1,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize:
                                                    "13px",
                                                color:
                                                    "#94A3B8",
                                            }}
                                        >
                                            Aucun chauffeur trouvé.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                drivers.map((driver) => {

                                    const status =
                                        statusConfig[
                                            driver.driverStatus
                                            ] ?? {
                                            label:
                                            driver.driverStatus,
                                            bgcolor:
                                                "#F1F5F9",
                                            color:
                                                "#64748B",
                                        };

                                    return (

                                        <TableRow
                                            key={driver.id}
                                            hover
                                        >

                                            <TableCell>

                                                <Typography
                                                    sx={{
                                                        ...bodyStyle,
                                                        fontWeight:
                                                            700,
                                                        color:
                                                            "#0B1F3A",
                                                    }}
                                                >
                                                    {driver.name}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Typography
                                                    sx={bodyStyle}
                                                >
                                                    {driver.email}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Typography
                                                    sx={bodyStyle}
                                                >
                                                    {driver.telephone || "-"}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Chip
                                                    label={
                                                        status.label
                                                    }
                                                    size="small"
                                                    sx={{
                                                        bgcolor:
                                                        status.bgcolor,
                                                        color:
                                                        status.color,
                                                        height:
                                                            "25px",
                                                        borderRadius:
                                                            "7px",
                                                        fontSize:
                                                            "10px",
                                                        fontWeight:
                                                            700,
                                                    }}
                                                />

                                            </TableCell>


                                            <TableCell>

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        gap: 0.5,
                                                    }}
                                                >

                                                    <StarRoundedIcon
                                                        sx={{
                                                            fontSize:
                                                                "17px",
                                                            color:
                                                                "#F59E0B",
                                                        }}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            ...bodyStyle,
                                                            fontWeight:
                                                                600,
                                                        }}
                                                    >
                                                        {Number(
                                                            driver.averageRating ??
                                                            0
                                                        ).toFixed(1)}
                                                    </Typography>

                                                </Box>

                                            </TableCell>


                                            <TableCell>

                                                {driver.vehicleType ? (

                                                    <Chip
                                                        label={
                                                            driver.vehicleType
                                                        }
                                                        size="small"
                                                        sx={{
                                                            bgcolor:
                                                                "#F8FAFC",
                                                            color:
                                                                "#475569",
                                                            fontSize:
                                                                "10px",
                                                            fontWeight:
                                                                700,
                                                        }}
                                                    />

                                                ) : (

                                                    <Typography
                                                        sx={{
                                                            ...bodyStyle,
                                                            color:
                                                                "#94A3B8",
                                                        }}
                                                    >
                                                        Non assigné
                                                    </Typography>

                                                )}

                                            </TableCell>


                                            <TableCell align="right">

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                        gap: 0.5,
                                                    }}
                                                >

                                                    <Tooltip title="Voir les détails">

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/drivers/${driver.id}`
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#0B1F3A",
                                                                "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#F1F5F9",
                                                                    },
                                                            }}
                                                        >

                                                            <VisibilityOutlinedIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "19px",
                                                                }}
                                                            />

                                                        </IconButton>

                                                    </Tooltip>


                                                    <Tooltip title="Modifier">

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleOpenEdit(
                                                                    driver
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#FF6B00",
                                                                "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#FFF7ED",
                                                                    },
                                                            }}
                                                        >

                                                            <EditOutlinedIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "19px",
                                                                }}
                                                            />

                                                        </IconButton>

                                                    </Tooltip>


                                                    <Tooltip title="Supprimer">

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleOpenDelete(
                                                                    driver
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#DC2626",
                                                                "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#FEF2F2",
                                                                    },
                                                            }}
                                                        >

                                                            <DeleteOutlineRoundedIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "19px",
                                                                }}
                                                            />

                                                        </IconButton>

                                                    </Tooltip>

                                                </Box>

                                            </TableCell>

                                        </TableRow>
                                    );
                                })

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                {!loading &&
                    totalPages > 1 && (

                        <Box
                            sx={{
                                px: 2.5,
                                py: 2,
                                display: "flex",
                                justifyContent:
                                    "flex-end",
                                borderTop:
                                    "1px solid #F1F5F9",
                            }}
                        >

                            <Pagination
                                count={totalPages}
                                page={page + 1}
                                onChange={(
                                    event,
                                    value
                                ) =>
                                    setPage(
                                        value - 1
                                    )
                                }
                                size="small"
                                sx={{
                                    "& .MuiPaginationItem-root.Mui-selected":
                                        {
                                            bgcolor:
                                                "#FF6B00",
                                            color:
                                                "#FFFFFF",
                                            "&:hover":
                                                {
                                                    bgcolor:
                                                        "#EA580C",
                                                },
                                        },
                                }}
                            />

                        </Box>

                    )}

            </Paper>


            <Dialog
                open={editOpen}
                onClose={handleCloseEdit}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: "14px",
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "#0B1F3A",
                    }}
                >
                    Modifier le chauffeur
                </DialogTitle>


                <DialogContent>

                    <Box
                        sx={{
                            pt: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >

                        <TextField
                            label="Nom"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            error={
                                Boolean(
                                    formErrors.name
                                )
                            }
                            helperText={
                                formErrors.name
                            }
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            error={
                                Boolean(
                                    formErrors.email
                                )
                            }
                            helperText={
                                formErrors.email
                            }
                            fullWidth
                        />

                        <TextField
                            label="Téléphone"
                            name="telephone"
                            value={
                                editForm.telephone
                            }
                            onChange={
                                handleEditChange
                            }
                            error={
                                Boolean(
                                    formErrors.telephone
                                )
                            }
                            helperText={
                                formErrors.telephone
                            }
                            fullWidth
                        />

                    </Box>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={handleCloseEdit}
                        disabled={editLoading}
                        sx={{
                            color: "#64748B",
                            textTransform: "none",
                        }}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleUpdateDriver
                        }
                        disabled={editLoading}
                        sx={{
                            bgcolor: "#FF6B00",
                            textTransform: "none",
                            borderRadius: "8px",
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#EA580C",
                                boxShadow: "none",
                            },
                        }}
                    >

                        {editLoading ? (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color:
                                        "#FFFFFF",
                                }}
                            />
                        ) : (
                            "Enregistrer"
                        )}

                    </Button>

                </DialogActions>

            </Dialog>


            <Dialog
                open={deleteOpen}
                onClose={handleCloseDelete}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: "14px",
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "#0B1F3A",
                    }}
                >
                    Supprimer le chauffeur
                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: "#64748B",
                            lineHeight: 1.7,
                        }}
                    >
                        Voulez-vous vraiment supprimer{" "}
                        <Box
                            component="span"
                            sx={{
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            {selectedDriver?.name}
                        </Box>
                        {" "}?
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: "12px",
                            color: "#DC2626",
                        }}
                    >
                        Cette action est irréversible.
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
                        disabled={
                            deleteLoading
                        }
                        sx={{
                            color: "#64748B",
                            textTransform: "none",
                        }}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleDeleteDriver
                        }
                        disabled={
                            deleteLoading
                        }
                        sx={{
                            bgcolor: "#DC2626",
                            textTransform: "none",
                            borderRadius: "8px",
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#B91C1C",
                                boxShadow: "none",
                            },
                        }}
                    >

                        {deleteLoading ? (
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


const SortableHeader = ({
                            label,
                            property,
                            orderBy,
                            order,
                            onSort,
                        }) => {

    return (

        <TableCell
            sortDirection={
                orderBy === property
                    ? order
                    : false
            }
            sx={headerStyle}
        >

            <TableSortLabel
                active={
                    orderBy === property
                }
                direction={
                    orderBy === property
                        ? order
                        : "asc"
                }
                onClick={() =>
                    onSort(property)
                }
                sx={{
                    "&.Mui-active": {
                        color: "#0B1F3A",
                    },
                    "&.Mui-active .MuiTableSortLabel-icon":
                        {
                            color: "#FF6B00",
                        },
                }}
            >
                {label}
            </TableSortLabel>

        </TableCell>
    );
};


const headerStyle = {
    fontSize: "11px",
    fontWeight: 700,
    color: "#64748B",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
};


const bodyStyle = {
    fontSize: "12px",
    color: "#475569",
};


export default AdminDrivers;