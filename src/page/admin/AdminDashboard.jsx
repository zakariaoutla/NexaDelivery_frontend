import {
    Box,
    Paper,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import CardStatistique
    from "../../components/Dashboard/CardStatistique.jsx";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import AutorenewRoundedIcon
    from "@mui/icons-material/AutorenewRounded";

import PeopleAltOutlinedIcon
    from "@mui/icons-material/PeopleAltOutlined";

import StorefrontOutlinedIcon
    from "@mui/icons-material/StorefrontOutlined";

import {
    getAdminDashboardStats,
} from "../../api/statisticsService.js";

import AdminDriverMap
    from "../../components/Dashboard/AdminDriverMap.jsx";

import TableDelivery
    from "../../components/Dashboard/TableDelivery.jsx";

import {
    getAllDeliveries,
} from "../../api/deliveryService.js";


const STATUS_COLORS = [
    "#F59E0B",
    "#3B82F6",
    "#8B5CF6",
    "#A855F7",
    "#06B6D4",
    "#22C55E",
    "#EF4444",
];


export default function AdminDashboard() {

    const [stats, setStats] = useState({
        totalDeliveries: 0,
        pendingDeliveries: 0,
        assignedDeliveries: 0,
        acceptedDeliveries: 0,
        pickedUpDeliveries: 0,
        inRouteDeliveries: 0,
        deliveredDeliveries: 0,
        cancelledDeliveries: 0,
        activeDeliveries: 0,
        totalDrivers: 0,
        availableDrivers: 0,
        totalMerchants: 0,
    });

    const [recentDeliveries, setRecentDeliveries] =
        useState([]);


    const fetchStats = async () => {

        try {

            const response =
                await getAdminDashboardStats();

            setStats(response.data);

        } catch (error) {

            console.error(
                "Erreur statistiques admin:",
                error
            );
        }
    };

    const fetchRecentDeliveries = async () => {

        try {

            const response =
                await getAllDeliveries(
                    0,
                    5,
                    "createdAt",
                    "desc"
                );

            setRecentDeliveries(
                response.data.content ?? []
            );

        } catch (error) {

            console.error(
                "Erreur dernières livraisons:",
                error
            );
        }
    };


    useEffect(() => {

        fetchStats();
        fetchRecentDeliveries();


    }, []);


    const cards = [

        {
            number: stats.totalDeliveries,
            text: "Total livraisons",
            desc: "Livraisons",
            icon:
                <LocalShippingOutlinedIcon />,
        },

        {
            number: stats.activeDeliveries,
            text: "Livraisons actives",
            desc: "En cours",
            icon:
                <AutorenewRoundedIcon />,
        },

        {
            number: `${stats.availableDrivers} / ${stats.totalDrivers}`,
            text: "Chauffeurs disponibles",
            desc: "Disponibles",
            icon:
                <PeopleAltOutlinedIcon />,
        },

        {
            number: stats.totalMerchants,
            text: "Total commerçants",
            desc: "Commerçants",
            icon:
                <StorefrontOutlinedIcon />,
        },
    ];


    const statusData = [

        {
            name: "En attente",
            value: stats.pendingDeliveries,
        },

        {
            name: "Assignées",
            value: stats.assignedDeliveries,
        },

        {
            name: "Acceptées",
            value: stats.acceptedDeliveries,
        },

        {
            name: "Récupérées",
            value: stats.pickedUpDeliveries,
        },

        {
            name: "En route",
            value: stats.inRouteDeliveries,
        },

        {
            name: "Livrées",
            value: stats.deliveredDeliveries,
        },

        {
            name: "Annulées",
            value: stats.cancelledDeliveries,
        },
    ];


    return (
        <>

            <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                    mb: "30px",
                    color: "#0B1F3A",
                }}
            >
                Tableau de bord administrateur
            </Typography>


            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    },

                    gap: "14px",

                    mb: "25px",
                }}
            >

                {cards.map(
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


            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "2fr 1fr",
                    },

                    gap: "20px",
                }}
            >

                <Paper
                    elevation={0}
                    sx={{
                        minHeight: "390px",
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                        p: 2.5,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        Suivi des livraisons
                    </Typography>

                    <Box
                        sx={{
                            mt: 2,
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        <AdminDriverMap />
                    </Box>

                </Paper>


                <Paper
                    elevation={0}
                    sx={{
                        minHeight: "390px",
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        bgcolor: "#FFFFFF",
                        p: 2.5,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                            mb: 1,
                        }}
                    >
                        Statut des livraisons
                    </Typography>


                    <Box
                        sx={{
                            width: "100%",
                            height: "310px",
                            position: "relative",
                        }}
                    >

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="42%"
                                    innerRadius={65}
                                    outerRadius={95}
                                    paddingAngle={2}
                                >

                                    {statusData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={entry.name}
                                                fill={
                                                    STATUS_COLORS[
                                                    index %
                                                    STATUS_COLORS.length
                                                        ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                                <Legend
                                    verticalAlign="bottom"
                                    height={55}
                                />

                            </PieChart>

                        </ResponsiveContainer>


                        <Box
                            sx={{
                                position: "absolute",
                                top: "34%",
                                left: "50%",
                                transform:
                                    "translate(-50%, -50%)",
                                textAlign: "center",
                                pointerEvents: "none",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: "28px",
                                    fontWeight: 800,
                                    color: "#0B1F3A",
                                    lineHeight: 1,
                                }}
                            >
                                {stats.totalDeliveries}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#64748B",
                                    mt: 0.5,
                                }}
                            >
                                Total
                            </Typography>

                        </Box>

                    </Box>

                </Paper>



            </Box>

            <Paper
                elevation={0}
                sx={{
                    mt: 2.5,
                    border: "1px solid #E5E7EB",
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                    overflow: "hidden",
                }}
            >

                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        borderBottom: "1px solid #F1F5F9",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        Dernières livraisons
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.3,
                            fontSize: "12px",
                            color: "#64748B",
                        }}
                    >
                        Les 5 livraisons les plus récentes
                    </Typography>

                </Box>


                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor: "#F8FAFC",
                                }}
                            >

                                {[
                                    "Tracking",
                                    "Client",
                                    "Destination",
                                    "Statut",
                                    "Date",
                                ].map((column) => (

                                    <TableCell
                                        key={column}
                                        sx={{
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: "#64748B",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {column}
                                    </TableCell>

                                ))}

                            </TableRow>

                        </TableHead>


                        <TableDelivery
                            deliveries={recentDeliveries}
                        />

                    </Table>

                </TableContainer>

            </Paper>

        </>
    );
}