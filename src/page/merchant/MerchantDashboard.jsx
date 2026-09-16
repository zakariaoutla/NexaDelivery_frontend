import {
    Box,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TableSortLabel,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import CardStatistique from "../../components/Dashboard/CardStatistique.jsx";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {getMerchantDashboardStats} from "../../api/statisticsService.js";
import {getMydelivery} from "../../api/deliveryService.js";
import TableDelivery from "../../components/Dashboard/TableDelivery.jsx";

export default function MerchantDashboard(){
    const [stats, setStats] = useState({
        totalDeliveries: 0,
        pendingDeliveries: 0,
        inProgressDeliveries: 0,
        deliveredDeliveries: 0,
    });

    const [delivery, setDelivery] = useState([])
    const[page, setPage] = useState(0)
    const [size, setSize]=useState(5)
    const [orderBy, setOrderBy] = useState("id")
    const [order, setOrder] = useState("asc")
    const [totalElements, setTotalElements] = useState(0)




    useEffect(()=>{
         const getStats = async ()=>{
             try {
                 const res = await getMerchantDashboardStats()
                 setStats(res.data)
             }catch (err){
                 console.error(err)
             }
         }

         const fetchMyDelivery = async ()=>{
             try {
                 const res = await getMydelivery(page,size,orderBy,order)
                 setDelivery(res.data.content)
                 console.log(res.data.content)
                 setTotalElements(res.data.totalElements)

             }catch (err){
                 console.error(err)
             }
         }

         fetchMyDelivery()

         getStats()

    },[page,size,orderBy,order])

    const elementCard = [
        {
            number: stats.totalDeliveries,
            text: "Total des livraisons",
            desc: "Livraisons",
            icon: <LocalShippingOutlinedIcon />,
        },
        {
            number: stats.pendingDeliveries,
            text: "Livraisons en attente",
            desc: "En attente",
            icon: <AccessTimeRoundedIcon />,
        },
        {
            number: stats.inProgressDeliveries,
            text: "Livraisons en cours",
            desc: "En cours",
            icon: <AutorenewRoundedIcon />,
        },
        {
            number: stats.deliveredDeliveries,
            text: "Livraisons livrées",
            desc: "Livrées",
            icon: <CheckCircleOutlineRoundedIcon />,
        },
    ];


    const handleSort = (property)=>{
        const isAsc = orderBy === property && order ==="asc"
        setOrder(isAsc? "desc":"asc")
        setOrderBy(property)
        setPage(0)
    }
    return(
        <>
            <Typography variant="h5" fontWeight={700} style={{marginBottom:30}}>
                Tableau de bord
            </Typography>

            <Box sx={{display:"grid",
                gridTemplateColumns:{
                       xs:'1fr',
                       sm:'repeat(1, 1fr)',
                       md:'repeat(4, 1fr)'
            },
            gap:'10px',
                mb:"50px"
            }}>
                {
                    elementCard.map((item, index)=>(
                        <CardStatistique key = {index}
                           total={item.number}
                           title={item.text}
                           icon={item.icon}
                           desc={item.desc}

                        />
                    ))
                }
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
                                        active={orderBy ==="trackingCode"}
                                        direction={orderBy ==="trackingCode"? order.toLowerCase(): "asc"}
                                        onClick={()=>handleSort("trackingCode")}
                                    >
                                    Tracking
                                    </TableSortLabel>

                            </TableCell>

                                <TableCell sx={headStyle}>
                                    <TableSortLabel
                                        active={orderBy ==="clientName"}
                                        direction={orderBy ==="clientName"? order.toLowerCase(): "asc"}
                                        onClick={()=>handleSort("clientName")}
                                    >
                                    Client
                                </TableSortLabel>

                            </TableCell>

                                <TableCell sx={headStyle}>
                                    <TableSortLabel
                                        active={orderBy ==="dropAddress"}
                                        direction={orderBy ==="dropAddress"? order.toLowerCase(): "asc"}
                                        onClick={()=>handleSort("dropAddress")}
                                    >
                                    Destination
                                </TableSortLabel>

                            </TableCell>

                                <TableCell sx={headStyle}>
                                    <TableSortLabel
                                        active={orderBy ==="deliveryStatus"}
                                        direction={orderBy ==="deliveryStatus"? order.toLowerCase(): "asc"}
                                        onClick={()=>handleSort("deliveryStatus")}
                                    >
                                    Statut
                                </TableSortLabel>

                            </TableCell>

                                <TableCell sx={headStyle}>
                                    <TableSortLabel
                                        active={orderBy ==="createdAt"}
                                        direction={orderBy ==="createdAt"? order.toLowerCase(): "asc"}
                                        onClick={()=>handleSort("createdAt")}
                                    >
                                    Date
                                   </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                         <TableDelivery deliveries={delivery}/>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10,20]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={size}
                    page={page}
                    onPageChange={(event, newPage)=> setPage(newPage)}
                    onRowsPerPageChange={(event)=>{
                        setSize(parseInt(event.target.value, 10))
                        setPage(0)
                    }}
                    labelRowsPerPage="Rows per page:"
                />


            </Paper>


        </>
    )
}
const headStyle = {
    fontSize: "11px",
    fontWeight: 700,
    color: "#64748B",
    py: 1.5,
};