import {
    Box,
    Chip,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";

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

export default function TableDelivery({ deliveries = [] }) {

    const formatDate = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
                    <TableBody>

                        {deliveries.length === 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    sx={{
                                        borderBottom: 0,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            py: 5,
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "13px",
                                                color: "#94A3B8",
                                            }}
                                        >
                                            Aucune livraison pour le moment.
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>

                        ) : (

                            deliveries.map((delivery) => {

                                const status =
                                    statusConfig[delivery.deliveryStatus] || {
                                        label: delivery.deliveryStatus,
                                        bgcolor: "#F1F5F9",
                                        color: "#64748B",
                                    };

                                return (
                                    <TableRow
                                        key={delivery.id}
                                        hover
                                        sx={{
                                            "&:last-child td": {
                                                borderBottom: 0,
                                            },
                                        }}
                                    >


                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: 700,
                                                    color: "#0B1F3A",
                                                }}
                                            >
                                                {delivery.trackingCode}
                                            </Typography>
                                        </TableCell>



                                        <TableCell>
                                            <Typography sx={bodyStyle}>
                                                {delivery.clientName}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    ...bodyStyle,
                                                    maxWidth: "200px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {delivery.dropAddress}
                                            </Typography>
                                        </TableCell>



                                        <TableCell>
                                            <Chip
                                                label={status.label}
                                                size="small"
                                                sx={{
                                                    bgcolor: status.bgcolor,
                                                    color: status.color,
                                                    height: "25px",
                                                    borderRadius: "7px",
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={bodyStyle}>
                                                {
                                                    formatDate(delivery.createdAt)
                                                }

                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                );
                            })

                        )}

                    </TableBody>
    );
}

const bodyStyle = {
    fontSize: "12px",
    color: "#475569",
};