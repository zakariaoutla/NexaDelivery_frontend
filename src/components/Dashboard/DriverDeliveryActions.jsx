import {
    Box,
    Button,
    CircularProgress,
} from "@mui/material";

import Inventory2OutlinedIcon
    from "@mui/icons-material/Inventory2Outlined";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import CheckCircleOutlinedIcon
    from "@mui/icons-material/CheckCircleOutlined";

import CloseOutlinedIcon
    from "@mui/icons-material/CloseOutlined";


export default function DriverDeliveryActions({
                                                  delivery,
                                                  updating = false,
                                                  onUpdateStatus,
                                                  onReject,
                                              }) {

    const actionConfig = {
        ASSIGNEE: {
            label: "Accepter la livraison",
            nextStatus: "ACCEPTEE",
            icon: <CheckCircleOutlinedIcon />,
        },

        ACCEPTEE: {
            label: "Colis récupéré",
            nextStatus: "RECUPEREE",
            icon: <Inventory2OutlinedIcon />,
        },

        RECUPEREE: {
            label: "Démarrer la livraison",
            nextStatus: "EN_ROUTE",
            icon: <LocalShippingOutlinedIcon />,
        },

        EN_ROUTE: {
            label: "Marquer comme livrée",
            nextStatus: "LIVREE",
            icon: <CheckCircleOutlinedIcon />,
        },
    };


    const action = actionConfig[delivery.deliveryStatus];

    if (!action) {
        return null;
    }


    const canReject = [
        "ASSIGNEE",
        "ACCEPTEE",
    ].includes(delivery.deliveryStatus);


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
            }}
        >
            <Button
                variant="contained"
                size="small"
                disabled={updating}

                onClick={() =>
                    onUpdateStatus(
                        delivery.id,
                        action.nextStatus
                    )
                }

                startIcon={
                    updating
                        ? (
                            <CircularProgress
                                size={14}
                                sx={{ color: "inherit" }}
                            />
                        )
                        : action.icon
                }

                sx={{
                    bgcolor: "#FF6B00",
                    color: "#FFFFFF",
                    boxShadow: "none",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "11px",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    px: 1.5,

                    "&:hover": {
                        bgcolor: "#E85F00",
                        boxShadow: "none",
                    },

                    "&.Mui-disabled": {
                        bgcolor: "#FED7AA",
                        color: "#FFFFFF",
                    },
                }}
            >
                {updating
                    ? "Mise à jour..."
                    : action.label}
            </Button>


            {canReject && (
                <Button
                    variant="outlined"
                    size="small"
                    disabled={updating}

                    onClick={() =>
                        onReject(delivery.id)
                    }

                    startIcon={
                        <CloseOutlinedIcon />
                    }

                    sx={{
                        color: "#DC2626",
                        borderColor: "#DC2626",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "11px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        px: 1.5,

                        "&:hover": {
                            borderColor: "#B91C1C",
                            bgcolor: "#FEF2F2",
                        },
                    }}
                >
                    Refuser
                </Button>
            )}
        </Box>
    );
}