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
} from "../../api/driverService.js";


export default function DriverDeliveries() {

    const [deliveries, setDeliveries] = useState([]);

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);

    const [orderBy, setOrderBy] = useState("id");

    const [order, setOrder] = useState("desc");

    const [totalElements, setTotalElements] = useState(0);

    const [updatingId, setUpdatingId] = useState(null);


    /*
     * FETCH DELIVERIES
     */

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


    /*
     * SORT
     */

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


    /*
     * UPDATE DELIVERY STATUS
     */

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

            // Refresh table
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


    return (
        <Box>

            {/* PAGE TITLE */}

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


            {/* TABLE */}

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

                        {/* TABLE HEADER */}

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor: "#F8FAFC",
                                }}
                            >

                                {/* TRACKING */}

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


                                {/* CLIENT */}

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


                                {/* DESTINATION */}

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


                                {/* STATUS */}

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


                                {/* DATE */}

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


                                {/* ACTION */}

                                <TableCell
                                    align="right"
                                    sx={headStyle}
                                >
                                    Action
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        {/* REUSABLE TABLE BODY */}

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
                                />

                            )}
                        />

                    </Table>

                </TableContainer>


                {/* PAGINATION */}

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