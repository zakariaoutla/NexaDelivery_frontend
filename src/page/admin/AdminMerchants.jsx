import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
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

import StorefrontOutlinedIcon
    from "@mui/icons-material/StorefrontOutlined";

import {
    deleteMerchant,
    getAllMerchants,
    updateMerchant,
} from "../../api/merchantService.js";


const AdminMerchants = () => {

    const navigate = useNavigate();

    const [merchants, setMerchants] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [totalElements, setTotalElements] =
        useState(0);

    const [orderBy, setOrderBy] =
        useState("name");

    const [order, setOrder] =
        useState("asc");

    const [searchInput, setSearchInput] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [selectedMerchant, setSelectedMerchant] =
        useState(null);

    const [editDialogOpen, setEditDialogOpen] =
        useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            telephone: "",
            businessName: "",
        });

    const [formErrors, setFormErrors] =
        useState({});

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


    const loadMerchants = async () => {

        try {

            setLoading(true);

            const response =
                await getAllMerchants(
                    page,
                    rowsPerPage,
                    orderBy,
                    order,
                    search
                );

            setMerchants(
                response.data.content ?? []
            );

            setTotalElements(
                response.data.totalElements ?? 0
            );

        } catch (error) {

            console.error(
                "Erreur chargement commerçants:",
                error
            );

            showMessage(
                "Impossible de charger les commerçants.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadMerchants();

    }, [
        page,
        rowsPerPage,
        orderBy,
        order,
        search,
    ]);


    const handleSearch = () => {

        setPage(0);

        setSearch(
            searchInput.trim()
        );
    };


    const handleSearchKeyDown = (event) => {

        if (event.key === "Enter") {
            handleSearch();
        }
    };


    const handleSort = (property) => {

        const isAsc =
            orderBy === property &&
            order === "asc";

        setOrder(
            isAsc
                ? "desc"
                : "asc"
        );

        setOrderBy(property);

        setPage(0);
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


    const openEditDialog = (
        merchant
    ) => {

        setSelectedMerchant(
            merchant
        );

        setFormData({
            name:
                merchant.name ?? "",
            email:
                merchant.email ?? "",
            telephone:
                merchant.telephone ?? "",
            businessName:
                merchant.businessName ?? "",
        });

        setFormErrors({});

        setEditDialogOpen(true);
    };


    const handleFormChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;

        setFormData(
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

        if (!formData.name.trim()) {
            errors.name =
                "Le nom est obligatoire.";
        }

        if (!formData.email.trim()) {
            errors.email =
                "L'email est obligatoire.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            errors.email =
                "Format email invalide.";
        }

        if (!formData.telephone.trim()) {
            errors.telephone =
                "Le téléphone est obligatoire.";
        }

        if (!formData.businessName.trim()) {
            errors.businessName =
                "Le nom de l'entreprise est obligatoire.";
        }

        setFormErrors(errors);

        return (
            Object.keys(errors).length === 0
        );
    };


    const handleUpdateMerchant = async () => {

        if (!validateForm()) {
            return;
        }

        try {

            setActionLoading(true);

            await updateMerchant(
                selectedMerchant.id,
                {
                    name:
                        formData.name.trim(),
                    email:
                        formData.email.trim(),
                    telephone:
                        formData.telephone.trim(),
                    businessName:
                        formData.businessName.trim(),
                }
            );

            setEditDialogOpen(false);

            setSelectedMerchant(null);

            await loadMerchants();

            showMessage(
                "Commerçant modifié avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur modification commerçant:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible de modifier le commerçant.",
                "error"
            );

        } finally {

            setActionLoading(false);
        }
    };


    const openDeleteDialog = (
        merchant
    ) => {

        setSelectedMerchant(
            merchant
        );

        setDeleteDialogOpen(true);
    };


    const handleDeleteMerchant = async () => {

        if (!selectedMerchant) {
            return;
        }

        try {

            setActionLoading(true);

            await deleteMerchant(
                selectedMerchant.id
            );

            setDeleteDialogOpen(false);

            setSelectedMerchant(null);

            if (
                merchants.length === 1 &&
                page > 0
            ) {

                setPage(
                    (previous) =>
                        previous - 1
                );

            } else {

                await loadMerchants();
            }

            showMessage(
                "Commerçant supprimé avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur suppression commerçant:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                "Impossible de supprimer le commerçant.",
                "error"
            );

        } finally {

            setActionLoading(false);
        }
    };


    const columns = [
        {
            id: "name",
            label: "Nom",
            sortable: true,
        },
        {
            id: "businessName",
            label: "Entreprise",
            sortable: true,
        },
        {
            id: "email",
            label: "Email",
            sortable: true,
        },
        {
            id: "telephone",
            label: "Téléphone",
            sortable: true,
        },
    ];


    return (

        <Box>

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
                    Commerçants
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "14px",
                        color: "#6B7280",
                    }}
                >
                    Gérez les commerçants inscrits sur la plateforme.
                </Typography>

            </Box>


            <Paper
                elevation={0}
                sx={{
                    mb: 3,
                    p: 2,
                    border:
                        "1px solid #E5E7EB",
                    borderRadius:
                        "14px",
                    bgcolor:
                        "#FFFFFF",
                }}
            >

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

                    <TextField
                        fullWidth
                        size="small"
                        value={
                            searchInput
                        }
                        onChange={(
                            event
                        ) =>
                            setSearchInput(
                                event.target.value
                            )
                        }
                        onKeyDown={
                            handleSearchKeyDown
                        }
                        placeholder="Rechercher par nom, entreprise, email ou téléphone..."
                        InputProps={{
                            startAdornment: (
                                <SearchRoundedIcon
                                    sx={{
                                        mr: 1,
                                        color:
                                            "#94A3B8",
                                    }}
                                />
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root":
                                {
                                    borderRadius:
                                        "9px",
                                },
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={
                            handleSearch
                        }
                        sx={{
                            minWidth:
                                "120px",
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
                        Rechercher
                    </Button>

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

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor:
                                        "#F8FAFC",
                                }}
                            >

                                {columns.map(
                                    (column) => (

                                        <TableCell
                                            key={
                                                column.id
                                            }
                                            sx={{
                                                color:
                                                    "#64748B",
                                                fontSize:
                                                    "12px",
                                                fontWeight:
                                                    700,
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >

                                            {column.sortable ? (

                                                <TableSortLabel
                                                    active={
                                                        orderBy ===
                                                        column.id
                                                    }
                                                    direction={
                                                        orderBy ===
                                                        column.id
                                                            ? order
                                                            : "asc"
                                                    }
                                                    onClick={() =>
                                                        handleSort(
                                                            column.id
                                                        )
                                                    }
                                                >
                                                    {column.label}
                                                </TableSortLabel>

                                            ) : (

                                                column.label

                                            )}

                                        </TableCell>

                                    )
                                )}

                                <TableCell
                                    align="right"
                                    sx={{
                                        color:
                                            "#64748B",
                                        fontSize:
                                            "12px",
                                        fontWeight:
                                            700,
                                    }}
                                >
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {loading ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={
                                            5
                                        }
                                        align="center"
                                        sx={{
                                            py: 8,
                                        }}
                                    >

                                        <CircularProgress
                                            size={
                                                30
                                            }
                                            sx={{
                                                color:
                                                    "#FF6B00",
                                            }}
                                        />

                                    </TableCell>

                                </TableRow>

                            ) : merchants.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={
                                            5
                                        }
                                        align="center"
                                        sx={{
                                            py: 8,
                                        }}
                                    >

                                        <StorefrontOutlinedIcon
                                            sx={{
                                                mb: 1,
                                                fontSize:
                                                    "38px",
                                                color:
                                                    "#CBD5E1",
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize:
                                                    "14px",
                                                color:
                                                    "#64748B",
                                            }}
                                        >
                                            Aucun commerçant trouvé.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                merchants.map(
                                    (
                                        merchant
                                    ) => (

                                        <TableRow
                                            key={
                                                merchant.id
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

                                            <TableCell>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        fontWeight:
                                                            600,
                                                        color:
                                                            "#0B1F3A",
                                                    }}
                                                >
                                                    {merchant.name}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        fontWeight:
                                                            600,
                                                        color:
                                                            "#0B1F3A",
                                                    }}
                                                >
                                                    {merchant.businessName ||
                                                        "-"}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        color:
                                                            "#64748B",
                                                    }}
                                                >
                                                    {merchant.email}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "13px",
                                                        color:
                                                            "#64748B",
                                                    }}
                                                >
                                                    {merchant.telephone ||
                                                        "-"}
                                                </Typography>

                                            </TableCell>


                                            <TableCell
                                                align="right"
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                        gap: 0.5,
                                                    }}
                                                >

                                                    <Tooltip
                                                        title="Voir les détails"
                                                    >

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/merchants/${merchant.id}`
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#2563EB",
                                                            }}
                                                        >
                                                            <VisibilityOutlinedIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>

                                                    </Tooltip>


                                                    <Tooltip
                                                        title="Modifier"
                                                    >

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                openEditDialog(
                                                                    merchant
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#FF6B00",
                                                            }}
                                                        >
                                                            <EditOutlinedIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>

                                                    </Tooltip>


                                                    <Tooltip
                                                        title="Supprimer"
                                                    >

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                openDeleteDialog(
                                                                    merchant
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#DC2626",
                                                            }}
                                                        >
                                                            <DeleteOutlineRoundedIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>

                                                    </Tooltip>

                                                </Box>

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
                    count={
                        totalElements
                    }
                    page={
                        page
                    }
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
                open={
                    editDialogOpen
                }
                onClose={() => {
                    if (
                        !actionLoading
                    ) {
                        setEditDialogOpen(
                            false
                        );
                    }
                }}
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
                    }}
                >
                    Modifier le commerçant
                </DialogTitle>


                <DialogContent>

                    <Box
                        sx={{
                            pt: 1,
                            display:
                                "flex",
                            flexDirection:
                                "column",
                            gap: 2,
                        }}
                    >

                        <TextField
                            label="Nom"
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleFormChange
                            }
                            error={
                                Boolean(
                                    formErrors.name
                                )
                            }
                            helperText={
                                formErrors.name
                            }
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Nom de l'entreprise"
                            name="businessName"
                            value={
                                formData.businessName
                            }
                            onChange={
                                handleFormChange
                            }
                            error={
                                Boolean(
                                    formErrors.businessName
                                )
                            }
                            helperText={
                                formErrors.businessName
                            }
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleFormChange
                            }
                            error={
                                Boolean(
                                    formErrors.email
                                )
                            }
                            helperText={
                                formErrors.email
                            }
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Téléphone"
                            name="telephone"
                            value={
                                formData.telephone
                            }
                            onChange={
                                handleFormChange
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
                            size="small"
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
                        onClick={() =>
                            setEditDialogOpen(
                                false
                            )
                        }
                        disabled={
                            actionLoading
                        }
                        sx={{
                            color:
                                "#64748B",
                            textTransform:
                                "none",
                        }}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleUpdateMerchant
                        }
                        disabled={
                            actionLoading
                        }
                        sx={{
                            minWidth:
                                "110px",
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

                        {actionLoading ? (

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
                open={
                    deleteDialogOpen
                }
                onClose={() => {
                    if (
                        !actionLoading
                    ) {
                        setDeleteDialogOpen(
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
                    Supprimer le commerçant
                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            color:
                                "#64748B",
                            fontSize:
                                "14px",
                            lineHeight:
                                1.7,
                        }}
                    >
                        Voulez-vous vraiment supprimer le commerçant{" "}
                        <strong>
                            {selectedMerchant?.name}
                        </strong>
                        {" "}?
                    </Typography>

                    {selectedMerchant?.businessName && (

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize:
                                    "13px",
                                color:
                                    "#94A3B8",
                            }}
                        >
                            Entreprise : {selectedMerchant.businessName}
                        </Typography>

                    )}

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={() =>
                            setDeleteDialogOpen(
                                false
                            )
                        }
                        disabled={
                            actionLoading
                        }
                        sx={{
                            color:
                                "#64748B",
                            textTransform:
                                "none",
                        }}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleDeleteMerchant
                        }
                        disabled={
                            actionLoading
                        }
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

                        {actionLoading ? (

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
                    vertical:
                        "bottom",
                    horizontal:
                        "right",
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
                        width:
                            "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </Box>
    );
};


export default AdminMerchants;