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

import {
    useEffect,
    useState
} from "react";



import CardStatistique
    from "../../components/Dashboard/CardStatistique.jsx";

import TableDelivery
    from "../../components/Dashboard/TableDelivery.jsx";



import AssignmentOutlinedIcon
    from "@mui/icons-material/AssignmentOutlined";

import AutorenewRoundedIcon
    from "@mui/icons-material/AutorenewRounded";

import CheckCircleOutlinedIcon
    from "@mui/icons-material/CheckCircleOutlined";


import {
    getDriverDashboardStats
} from "../../api/statisticsService.js";

import {
    getMyDriverDeliveries,
} from "../../api/driverService.js";


export default function DriverDashboard() {




    const [stats, setStats] = useState({
        assignedDeliveries: 0,
        inProgressDeliveries: 0,
        deliveredDeliveries: 0,
    });


    const [deliveries, setDeliveries] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [size, setSize] =
        useState(5);

    const [orderBy, setOrderBy] = useState("createdAt");

    const [order, setOrder] =
        useState("desc");

    const [totalElements, setTotalElements] =
        useState(0);


    const fetchStats = async () => {

        try {

            const res =
                await getDriverDashboardStats();

            setStats(res.data);

        } catch (err) {

            console.error(
                "Erreur statistiques driver:",
                err
            );
        }
    };



    const fetchMyDeliveries = async () => {

        try {

            const res =
                await getMyDriverDeliveries(
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

        fetchStats();
        fetchMyDeliveries();

    }, [
        page,
        size,
        orderBy,
        order
    ]);


    const elementCard = [
        {
            number:
            stats.assignedDeliveries,

            text:
                "Livraisons assignées",

            desc:
                "Assignées",

            icon:
                <AssignmentOutlinedIcon />,
        },

        {
            number:
            stats.inProgressDeliveries,

            text:
                "Livraisons en cours",

            desc:
                "En cours",

            icon:
                <AutorenewRoundedIcon />,
        },

        {
            number:
            stats.deliveredDeliveries,

            text:
                "Livraisons livrées",

            desc:
                "Livrées",

            icon:
                <CheckCircleOutlinedIcon />,
        },
    ];




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

    return (
        <>

            <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                    mb: "30px",
                }}
            >
                Tableau de bord
            </Typography>



            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(3, 1fr)",
                    },

                    gap: "10px",

                    mb: "50px",
                }}
            >

                {elementCard.map(
                    (item, index) => (

                        <CardStatistique
                            key={index}
                            total={item.number}
                            title={item.text}
                            icon={item.icon}
                            desc={item.desc}
                        />

                    )
                )}

            </Box>



            <Paper
                elevation={0}
                sx={{
                    width: "100%",

                    border:
                        "1px solid #E5E7EB",

                    borderRadius:
                        "14px",

                    overflow:
                        "hidden",

                    bgcolor:
                        "#FFFFFF",
                }}
            >

                <Box
                    sx={{
                        px: 2.5,
                        py: 2,

                        borderBottom:
                            "1px solid #E5E7EB",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize:
                                "16px",

                            fontWeight:
                                700,

                            color:
                                "#0B1F3A",
                        }}
                    >
                        Mes livraisons
                    </Typography>

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


                                <TableCell
                                    sx={headStyle}
                                >

                                    <TableSortLabel
                                        active={
                                            orderBy ===
                                            "trackingCode"
                                        }

                                        direction={
                                            orderBy ===
                                            "trackingCode"
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



                                <TableCell
                                    sx={headStyle}
                                >

                                    <TableSortLabel
                                        active={
                                            orderBy ===
                                            "clientName"
                                        }

                                        direction={
                                            orderBy ===
                                            "clientName"
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



                                <TableCell
                                    sx={headStyle}
                                >

                                    <TableSortLabel
                                        active={
                                            orderBy ===
                                            "dropAddress"
                                        }

                                        direction={
                                            orderBy ===
                                            "dropAddress"
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



                                <TableCell
                                    sx={headStyle}
                                >

                                    <TableSortLabel
                                        active={
                                            orderBy ===
                                            "deliveryStatus"
                                        }

                                        direction={
                                            orderBy ===
                                            "deliveryStatus"
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



                                <TableCell
                                    sx={headStyle}
                                >

                                    <TableSortLabel
                                        active={
                                            orderBy ===
                                            "createdAt"
                                        }

                                        direction={
                                            orderBy ===
                                            "createdAt"
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

                            </TableRow>

                        </TableHead>


                        <TableDelivery
                            deliveries={deliveries}
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

                    count={
                        totalElements
                    }

                    rowsPerPage={
                        size
                    }

                    page={
                        page
                    }

                    onPageChange={(
                        event,
                        newPage
                    ) =>
                        setPage(
                            newPage
                        )
                    }

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

                    labelRowsPerPage=
                        "Rows per page:"
                />

            </Paper>

        </>
    );
}


const headStyle = {

    fontSize:
        "11px",

    fontWeight:
        700,

    color:
        "#64748B",

    py:
        1.5,
};