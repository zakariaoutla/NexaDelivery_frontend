import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { toast } from "react-toastify";

import {
    cancelDelivery,
    getMydelivery,
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


const columns = [

    {
        id: "trackingCode",
        label: "Tracking",
    },

    {
        id: "clientName",
        label: "Client",
    },

    {
        id: "dropAddress",
        label: "Destination",
    },

    {
        id: "deliveryStatus",
        label: "Statut",
    },

    {
        id: "createdAt",
        label: "Date",
    },
];


const MyDeliveries = () => {

    const navigate = useNavigate();

    const [deliveries, setDeliveries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [totalElements, setTotalElements] = useState(0);

    const [orderBy, setOrderBy] = useState("createdAt");

    const [order, setOrder] = useState("desc");

    const [cancelLoading, setCancelLoading] = useState(null);

    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [selectedDelivery, setSelectedDelivery] = useState(null);



    const fetchDeliveries = async () => {

        try {

            setLoading(true);

            const response = await getMydelivery(
                page,
                rowsPerPage,
                orderBy,
                order
            );

            setDeliveries(
                response.data.content || []
            );

            setTotalElements(
                response.data.totalElements || 0
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Impossible de charger vos livraisons"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchDeliveries();

    }, [
        page,
        rowsPerPage,
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


    const openCancelDialog = (delivery) => {

        setSelectedDelivery(delivery);

        setCancelDialogOpen(true);
    };


    const closeCancelDialog = () => {

        if (cancelLoading) {
            return;
        }

        setCancelDialogOpen(false);

        setSelectedDelivery(null);
    };


    const handleCancel = async () => {

        if (!selectedDelivery) {
            return;
        }

        try {

            setCancelLoading(
                selectedDelivery.id
            );

            await cancelDelivery(
                selectedDelivery.id
            );

            toast.success(
                "Livraison annulée avec succès"
            );

            setCancelDialogOpen(false);

            setSelectedDelivery(null);

            await fetchDeliveries();

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.message ||
                "Impossible d'annuler cette livraison";

            toast.error(message);

        } finally {

            setCancelLoading(null);
        }
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
        ).format(
            new Date(date)
        );
    };




    const canTrack = (status) => {

        return [
            "ASSIGNEE",
            "RECUPEREE",
            "EN_ROUTE",
        ].includes(status);
    };


    const canCancel = (status) => {

        return status === "EN_ATTENTE";
    };


    return (

        <Box>


            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                    justifyContent: "space-between",
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
                        Mes livraisons
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: "14px",
                            color: "#6B7280",
                        }}
                    >
                        Consultez et suivez toutes vos livraisons.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    onClick={() =>
                        navigate(
                            "/merchant/deliveries/create"
                        )
                    }
                    sx={{
                        bgcolor: "#FF6B00",
                        color: "#FFFFFF",
                        textTransform: "none",
                        fontWeight: 700,
                        boxShadow: "none",
                        borderRadius: "9px",
                        px: 2.5,

                        "&:hover": {
                            bgcolor: "#E65F00",
                            boxShadow: "none",
                        },
                    }}
                >
                    Nouvelle livraison
                </Button>

            </Box>



            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "14px",
                    overflow: "hidden",
                    bgcolor: "#FFFFFF",
                }}
            >

                {loading ? (

                    <Box
                        sx={{
                            minHeight: "350px",
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

                ) : (

                    <>

                        <TableContainer>

                            <Table
                                sx={{
                                    minWidth: 850,
                                }}
                            >


                                <TableHead>

                                    <TableRow
                                        sx={{
                                            bgcolor: "#F8FAFC",
                                        }}
                                    >

                                        {columns.map(
                                            (column) => (

                                                <TableCell
                                                    key={column.id}
                                                    sx={headCellStyle}
                                                >

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

                                                </TableCell>

                                            )
                                        )}


                                        <TableCell
                                            align="center"
                                            sx={headCellStyle}
                                        >
                                            Actions
                                        </TableCell>

                                    </TableRow>

                                </TableHead>



                                <TableBody>

                                    {deliveries.length === 0 ? (

                                        <TableRow>

                                            <TableCell
                                                colSpan={6}
                                                sx={{
                                                    borderBottom: 0,
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        py: 8,
                                                        textAlign: "center",
                                                    }}
                                                >

                                                    <Typography
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#94A3B8",
                                                        }}
                                                    >
                                                        Aucune livraison pour le moment.
                                                    </Typography>

                                                </Box>

                                            </TableCell>

                                        </TableRow>

                                    ) : (

                                        deliveries.map(
                                            (delivery) => {

                                                const status =
                                                    statusConfig[
                                                        delivery.deliveryStatus
                                                        ] || {
                                                        label:
                                                        delivery.deliveryStatus,
                                                        bgcolor:
                                                            "#F1F5F9",
                                                        color:
                                                            "#64748B",
                                                    };

                                                return (

                                                    <TableRow
                                                        key={delivery.id}
                                                        hover
                                                    >


                                                        <TableCell>

                                                            <Typography
                                                                sx={{
                                                                    ...bodyStyle,
                                                                    fontWeight: 700,
                                                                    color: "#0B1F3A",
                                                                }}
                                                            >
                                                                {delivery.trackingCode}
                                                            </Typography>

                                                        </TableCell>



                                                        <TableCell>

                                                            <Typography
                                                                sx={bodyStyle}
                                                            >
                                                                {delivery.clientName}
                                                            </Typography>

                                                        </TableCell>



                                                        <TableCell>

                                                            <Tooltip
                                                                title={
                                                                    delivery.dropAddress ||
                                                                    ""
                                                                }
                                                            >

                                                                <Typography
                                                                    sx={{
                                                                        ...bodyStyle,
                                                                        maxWidth: "220px",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                    }}
                                                                >
                                                                    {delivery.dropAddress}
                                                                </Typography>

                                                            </Tooltip>

                                                        </TableCell>



                                                        <TableCell>

                                                            <Chip
                                                                label={status.label}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor:
                                                                    status.bgcolor,
                                                                    color:
                                                                    status.color,
                                                                    height: "25px",
                                                                    borderRadius: "7px",
                                                                    fontSize: "10px",
                                                                    fontWeight: 700,
                                                                }}
                                                            />

                                                        </TableCell>



                                                        <TableCell>

                                                            <Typography
                                                                sx={bodyStyle}
                                                            >
                                                                {formatDate(
                                                                    delivery.createdAt
                                                                )}
                                                            </Typography>

                                                        </TableCell>



                                                        <TableCell
                                                            align="center"
                                                        >

                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
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
                                                                                `/merchant/deliveries/${delivery.id}`
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            color: "#0B1F3A",
                                                                        }}
                                                                    >
                                                                        <VisibilityOutlinedIcon
                                                                            fontSize="small"
                                                                        />
                                                                    </IconButton>

                                                                </Tooltip>



                                                                {canTrack(
                                                                    delivery.deliveryStatus
                                                                ) && (

                                                                    <Tooltip
                                                                        title="Suivre la livraison"
                                                                    >

                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/merchant/deliveries/${delivery.id}/tracking`
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                color: "#2563EB",
                                                                            }}
                                                                        >
                                                                            <LocationOnOutlinedIcon
                                                                                fontSize="small"
                                                                            />
                                                                        </IconButton>

                                                                    </Tooltip>

                                                                )}



                                                                {canCancel(
                                                                    delivery.deliveryStatus
                                                                ) && (

                                                                    <Tooltip
                                                                        title="Annuler la livraison"
                                                                    >

                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                openCancelDialog(
                                                                                    delivery
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                color: "#DC2626",

                                                                                "&:hover": {
                                                                                    bgcolor: "#FEF2F2",
                                                                                },
                                                                            }}
                                                                        >
                                                                            <CancelOutlinedIcon
                                                                                fontSize="small"
                                                                            />
                                                                        </IconButton>

                                                                    </Tooltip>

                                                                )}

                                                            </Box>

                                                        </TableCell>

                                                    </TableRow>

                                                );
                                            }
                                        )

                                    )}

                                </TableBody>

                            </Table>

                        </TableContainer>



                        <TablePagination
                            component="div"
                            count={totalElements}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={
                                handleChangePage
                            }
                            onRowsPerPageChange={
                                handleChangeRowsPerPage
                            }
                            rowsPerPageOptions={[
                                5,
                                10,
                                20,
                            ]}
                            labelRowsPerPage="Lignes par page :"
                        />

                    </>

                )}

            </Paper>



            <Dialog
                open={cancelDialogOpen}
                onClose={closeCancelDialog}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "16px",
                        p: 1,
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        textAlign: "center",
                        pt: 3,
                        pb: 1,
                    }}
                >


                    <Box
                        sx={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            bgcolor: "#FEF2F2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                        }}
                    >

                        <WarningAmberRoundedIcon
                            sx={{
                                color: "#DC2626",
                                fontSize: "30px",
                            }}
                        />

                    </Box>


                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        Annuler la livraison ?
                    </Typography>

                </DialogTitle>


                <DialogContent>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#64748B",
                            lineHeight: 1.6,
                        }}
                    >
                        Voulez-vous vraiment annuler la livraison
                    </Typography>


                    <Typography
                        sx={{
                            mt: 0.5,
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        {selectedDelivery?.trackingCode}
                    </Typography>


                    <Typography
                        sx={{
                            mt: 1,
                            textAlign: "center",
                            fontSize: "12px",
                            color: "#94A3B8",
                        }}
                    >
                        Cette action est définitive.
                    </Typography>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        pt: 2,
                        gap: 1,
                    }}
                >


                    <Button
                        fullWidth
                        disabled={Boolean(cancelLoading)}
                        onClick={closeCancelDialog}
                        sx={{
                            color: "#475569",
                            bgcolor: "#F1F5F9",
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "9px",
                            py: 1,

                            "&:hover": {
                                bgcolor: "#E2E8F0",
                            },
                        }}
                    >
                        Retour
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        disabled={Boolean(cancelLoading)}
                        onClick={handleCancel}
                        sx={{
                            bgcolor: "#DC2626",
                            color: "#FFFFFF",
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "9px",
                            boxShadow: "none",
                            py: 1,

                            "&:hover": {
                                bgcolor: "#B91C1C",
                                boxShadow: "none",
                            },

                            "&.Mui-disabled": {
                                bgcolor: "#FCA5A5",
                                color: "#FFFFFF",
                            },
                        }}
                    >

                        {cancelLoading ? (

                            <CircularProgress
                                size={20}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            />

                        ) : (

                            "Oui, annuler"

                        )}

                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
};


const headCellStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748B",
    whiteSpace: "nowrap",
};


const bodyStyle = {
    fontSize: "12px",
    color: "#475569",
};


export default MyDeliveries;