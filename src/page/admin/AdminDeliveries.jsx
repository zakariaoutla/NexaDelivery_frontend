import {
    Box,
    Chip,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    MenuItem,
    Pagination,
    Paper,
    Select,
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

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import {
    getAllDeliveries,
} from "../../api/deliveryService.js";


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


const AdminDeliveries = () => {

    const navigate = useNavigate();

    const [deliveries, setDeliveries] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [orderBy, setOrderBy] =
        useState("createdAt");

    const [order, setOrder] =
        useState("desc");

    const pageSize = 10;


    const fetchDeliveries = async () => {

        try {

            setLoading(true);

            const response =
                await getAllDeliveries(
                    page,
                    pageSize,
                    orderBy,
                    order,
                    search,
                    statusFilter
                );

            setDeliveries(
                response.data.content ?? []
            );

            setTotalPages(
                response.data.totalPages ?? 0
            );

        } catch (error) {

            console.error(
                "Erreur chargement livraisons:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        const timeout =
            setTimeout(() => {
                fetchDeliveries();
            }, 500);

        return () =>
            clearTimeout(timeout);

    }, [
        page,
        search,
        statusFilter,
        orderBy,
        order,
    ]);


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
            }
        ).format(new Date(date));
    };


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
                    Gestion des livraisons
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "14px",
                        color: "#6B7280",
                    }}
                >
                    Gérez et suivez toutes les
                    livraisons de la plateforme.
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
                        placeholder="Rechercher une livraison..."
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
                                sm: "180px",
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

                            <MenuItem value="EN_ATTENTE">
                                En attente
                            </MenuItem>

                            <MenuItem value="ASSIGNEE">
                                Assignée
                            </MenuItem>

                            <MenuItem value="ACCEPTEE">
                                Acceptée
                            </MenuItem>

                            <MenuItem value="RECUPEREE">
                                Récupérée
                            </MenuItem>

                            <MenuItem value="EN_ROUTE">
                                En route
                            </MenuItem>

                            <MenuItem value="LIVREE">
                                Livrée
                            </MenuItem>

                            <MenuItem value="ANNULEE">
                                Annulée
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
                                    label="Tracking"
                                    property="trackingCode"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Client"
                                    property="clientName"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Destination"
                                    property="dropAddress"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Chauffeur"
                                    property="driver.name"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Commerçant"
                                    property="merchant.businessName"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Statut"
                                    property="deliveryStatus"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <SortableHeader
                                    label="Date"
                                    property="createdAt"
                                    orderBy={orderBy}
                                    order={order}
                                    onSort={handleSort}
                                />

                                <TableCell
                                    sx={headerStyle}
                                />

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {loading ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}
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

                            ) : deliveries.length ===
                            0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}
                                        sx={{
                                            py: 7,
                                            textAlign:
                                                "center",
                                        }}
                                    >

                                        <LocalShippingOutlinedIcon
                                            sx={{
                                                fontSize:
                                                    "38px",
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
                                            Aucune livraison trouvée.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                deliveries.map(
                                    (delivery) => {

                                        const status =
                                            statusConfig[
                                                delivery
                                                    .deliveryStatus
                                                ] ?? {
                                                label:
                                                delivery
                                                    .deliveryStatus,
                                                bgcolor:
                                                    "#F1F5F9",
                                                color:
                                                    "#64748B",
                                            };

                                        return (

                                            <TableRow
                                                key={
                                                    delivery.id
                                                }
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
                                                        {
                                                            delivery.trackingCode
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                <TableCell>

                                                    <Typography
                                                        sx={
                                                            bodyStyle
                                                        }
                                                    >
                                                        {
                                                            delivery.clientName
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                <TableCell>

                                                    <Typography
                                                        title={
                                                            delivery.dropAddress
                                                        }
                                                        sx={{
                                                            ...bodyStyle,
                                                            maxWidth:
                                                                "190px",
                                                            overflow:
                                                                "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {
                                                            delivery.dropAddress
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                <TableCell>

                                                    <Typography
                                                        sx={
                                                            bodyStyle
                                                        }
                                                    >
                                                        {
                                                            delivery.driverName ??
                                                            "Non assigné"
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                <TableCell>

                                                    <Typography
                                                        sx={
                                                            bodyStyle
                                                        }
                                                    >
                                                        {
                                                            delivery.businessName ??
                                                            "-"
                                                        }
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

                                                    <Typography
                                                        sx={
                                                            bodyStyle
                                                        }
                                                    >
                                                        {formatDate(
                                                            delivery.createdAt
                                                        )}
                                                    </Typography>

                                                </TableCell>


                                                <TableCell
                                                    align="right"
                                                >

                                                    <Tooltip title="Voir les détails">

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/deliveries/${delivery.id}`
                                                                )
                                                            }
                                                            sx={{
                                                                color:
                                                                    "#0B1F3A",

                                                                "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#FFF7ED",
                                                                        color:
                                                                            "#FF6B00",
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

                                                </TableCell>

                                            </TableRow>
                                        );
                                    }
                                )

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


export default AdminDeliveries;