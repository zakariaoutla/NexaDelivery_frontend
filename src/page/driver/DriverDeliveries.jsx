import {
    Box,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import TableDelivery
    from "../../components/Dashboard/TableDelivery.jsx";

import DriverDeliveryActions
    from "../../components/Dashboard/DriverDeliveryActions.jsx";

import {
    updateMyDeliveryStatus,
} from "../../api/deliveryService.js";

import {
    getMyDriverDeliveries,
    rejectMyDelivery,
} from "../../api/driverService.js";

import { useOutletContext } from "react-router-dom";


export default function DriverDeliveries() {

    const [deliveries, setDeliveries] = useState([]);

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);

    const [orderBy, setOrderBy] = useState("id");

    const [order, setOrder] = useState("desc");

    const [totalElements, setTotalElements] = useState(0);

    const [updatingId, setUpdatingId] = useState(null);

    const { setDriverStatus } = useOutletContext();



    const fetchDeliveries = async () => {

        try {

            const res = await getMyDriverDeliveries(
                page,
                size,
                orderBy,
                order
            );

            setDeliveries(
                res.data.content
            );

            setTotalElements(
                res.data.totalElements
            );

        } catch (err) {

            console.error(
                "Erreur livraisons driver:",
                err
            );
        }
    };


    useEffect(() => {

        fetchDeliveries();

    }, [page, size, orderBy, order]);



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


    const handleUpdateStatus = async (
        deliveryId,
        newStatus
    ) => {

        try {

            setUpdatingId(deliveryId);

            await updateMyDeliveryStatus(
                deliveryId,
                newStatus
            );

            if (newStatus === "ACCEPTEE") {
                setDriverStatus("EN_LIVRAISON");
            }

            if (newStatus === "LIVREE") {
                setDriverStatus("DISPONIBLE");
            }

            await fetchDeliveries();

        } catch (err) {

            console.error(
                "Erreur modification statut:",
                err
            );

        } finally {

            setUpdatingId(null);
        }
    };

    const handleReject = async (deliveryId) => {

        try {

            setUpdatingId(deliveryId);

            await rejectMyDelivery(deliveryId);

            setDriverStatus("DISPONIBLE");

            await fetchDeliveries();

        } catch (err) {

            console.error(
                "Erreur refus livraison:",
                err
            );

        } finally {

            setUpdatingId(null);
        }
    };


    return (
        <Box>


            <Box sx={{ mb: 4 }}>

                <Typography
                    sx={{
                        fontSize: {
                            xs: "24px",
                            md: "28px",
                        },
                        fontWeight: 800,
                        color: "#0B1F3A",
                    }}
                >
                    Mes livraisons
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "13px",
                        color: "#64748B",
                    }}
                >
                    Consultez et gérez vos livraisons assignées.
                </Typography>

            </Box>



            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    border: "1px solid #E5E7EB",
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
                                    bgcolor: "#F8FAFC",
                                }}
                            >


                                <TableCell sx={headStyle}>

                                    <TableSortLabel
                                        active={
                                            orderBy === "trackingCode"
                                        }
                                        direction={
                                            orderBy === "trackingCode"
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSort(
                                                "trackingCode"
                                            )
                                        }
                                    >
                                        Tracking
                                    </TableSortLabel>

                                </TableCell>



                                <TableCell sx={headStyle}>

                                    <TableSortLabel
                                        active={
                                            orderBy === "clientName"
                                        }
                                        direction={
                                            orderBy === "clientName"
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSort(
                                                "clientName"
                                            )
                                        }
                                    >
                                        Client
                                    </TableSortLabel>

                                </TableCell>



                                <TableCell sx={headStyle}>

                                    <TableSortLabel
                                        active={
                                            orderBy === "dropAddress"
                                        }
                                        direction={
                                            orderBy === "dropAddress"
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSort(
                                                "dropAddress"
                                            )
                                        }
                                    >
                                        Destination
                                    </TableSortLabel>

                                </TableCell>



                                <TableCell sx={headStyle}>

                                    <TableSortLabel
                                        active={
                                            orderBy === "deliveryStatus"
                                        }
                                        direction={
                                            orderBy === "deliveryStatus"
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSort(
                                                "deliveryStatus"
                                            )
                                        }
                                    >
                                        Statut
                                    </TableSortLabel>

                                </TableCell>



                                <TableCell sx={headStyle}>

                                    <TableSortLabel
                                        active={
                                            orderBy === "createdAt"
                                        }
                                        direction={
                                            orderBy === "createdAt"
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() =>
                                            handleSort(
                                                "createdAt"
                                            )
                                        }
                                    >
                                        Date
                                    </TableSortLabel>

                                </TableCell>



                                <TableCell
                                    align="right"
                                    sx={headStyle}
                                >
                                    Action
                                </TableCell>

                            </TableRow>

                        </TableHead>



                        <TableDelivery
                            deliveries={deliveries}
                            renderActions={(delivery) => (

                                <DriverDeliveryActions
                                    delivery={delivery}
                                    updating={
                                        updatingId === delivery.id
                                    }
                                    onUpdateStatus={
                                        handleUpdateStatus
                                    }
                                    onReject={
                                        handleReject
                                    }
                                />

                            )}
                        />

                    </Table>

                </TableContainer>



                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        20,
                    ]}
                    component="div"

                    count={totalElements}

                    rowsPerPage={size}

                    page={page}

                    onPageChange={(
                        event,
                        newPage
                    ) => {
                        setPage(newPage);
                    }}

                    onRowsPerPageChange={(
                        event
                    ) => {

                        setSize(
                            parseInt(
                                event.target.value,
                                10
                            )
                        );

                        setPage(0);
                    }}

                    labelRowsPerPage="Lignes par page :"
                />

            </Paper>

        </Box>
    );
}


const headStyle = {
    fontSize: "11px",
    fontWeight: 700,
    color: "#64748B",
    py: 1.5,
};