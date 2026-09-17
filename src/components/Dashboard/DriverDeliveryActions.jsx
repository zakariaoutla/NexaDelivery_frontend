import {
    Button,
    CircularProgress,
} from "@mui/material";

import Inventory2OutlinedIcon
    from "@mui/icons-material/Inventory2Outlined";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import CheckCircleOutlinedIcon
    from "@mui/icons-material/CheckCircleOutlined";


export default function DriverDeliveryActions({
                                                  delivery,
                                                  updating = false,
                                                  onUpdateStatus,
                                              }) {

    const actionConfig = {
        ASSIGNEE: {
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


    const action =
        actionConfig[delivery.deliveryStatus];


    if (!action) {
        return null;
    }


    const handleClick = () => {
        onUpdateStatus(
            delivery.id,
            action.nextStatus
        );
    };


    return (
        <Button
            variant="contained"
            size="small"

            onClick={handleClick}

            disabled={updating}

            startIcon={
                updating
                    ? (
                        <CircularProgress
                            size={14}
                            sx={{
                                color: "inherit",
                            }}
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
    );
}