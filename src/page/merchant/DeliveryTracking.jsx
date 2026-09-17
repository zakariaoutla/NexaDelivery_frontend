import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";

import L from "leaflet";

import { toast } from "react-toastify";

import {
    connectDeliveryTracking,
    disconnectDeliveryTracking,
    getLatestDeliveryLocation,
} from "../../api/trackingService.js";



const driverIcon = L.divIcon({
    className: "",
    html: `
        <div style="
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #FF6B00;
            border: 4px solid #FFFFFF;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 21px;
        ">
            🚚
        </div>
    `,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    popupAnchor: [0, -25],
});


const MapUpdater = ({ latitude, longitude }) => {

    const map = useMap();

    useEffect(() => {

        if (
            latitude == null ||
            longitude == null
        ) {
            return;
        }

        map.flyTo(
            [latitude, longitude],
            map.getZoom(),
            {
                animate: true,
                duration: 1,
            }
        );

    }, [
        latitude,
        longitude,
        map,
    ]);

    return null;
};


const DeliveryTracking = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const stompClientRef = useRef(null);


    const [location, setLocation] = useState(null);

    const [loading, setLoading] = useState(true);

    const [connected, setConnected] = useState(false);

    const [connectionError, setConnectionError] =
        useState(false);


    useEffect(() => {

        let mounted = true;


        const initializeTracking = async () => {


            try {

                const response =
                    await getLatestDeliveryLocation(id);
                console.log(
                    "LATEST LOCATION RESPONSE:",
                    response.data
                );

                if (mounted) {

                    setLocation(
                        response.data
                    );
                }

            } catch (error) {

                console.error(
                    "Latest location error:",
                    error
                );

                /*
                On ne bloque pas le WebSocket.

                Le driver peut envoyer une nouvelle
                position après l'ouverture de la page.
                */

            } finally {

                if (mounted) {
                    setLoading(false);
                }
            }


            /*
            ====================================
            2. CONNECT WEBSOCKET
            ====================================
            */

            const client =
                connectDeliveryTracking(

                    id,

                    /*
                    LOCATION RECEIVED
                    */

                    (newLocation) => {

                        if (!mounted) {
                            return;
                        }

                        console.log(
                            "Nouvelle position:",
                            newLocation
                        );

                        setLocation(
                            newLocation
                        );
                    },


                    /*
                    CONNECTED
                    */

                    () => {

                        if (!mounted) {
                            return;
                        }

                        setConnected(true);

                        setConnectionError(false);
                    },


                    /*
                    ERROR
                    */

                    (error) => {

                        if (!mounted) {
                            return;
                        }

                        console.error(
                            "Tracking WebSocket error:",
                            error
                        );

                        setConnected(false);

                        setConnectionError(true);
                    }
                );


            stompClientRef.current =
                client;
        };


        initializeTracking();


        /*
        ====================================
        CLEANUP
        ====================================
        */

        return () => {

            mounted = false;

            if (
                stompClientRef.current
            ) {

                disconnectDeliveryTracking(
                    stompClientRef.current
                );
            }
        };

    }, [id]);


    /* ========================================
       FORMAT DATE
    ======================================== */

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
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
        ).format(
            new Date(date)
        );
    };


    /* ========================================
       LOADING
    ======================================== */

    if (loading) {

        return (

            <Box
                sx={{
                    minHeight: "450px",
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
        );
    }


    return (

        <Box>

            {/* ========================================
                BACK
            ======================================== */}

            <Button
                startIcon={
                    <ArrowBackRoundedIcon />
                }
                onClick={() =>
                    navigate(
                        `/merchant/deliveries/${id}`
                    )
                }
                sx={{
                    mb: 2,
                    color: "#64748B",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                        bgcolor: "#F1F5F9",
                    },
                }}
            >
                Retour aux détails
            </Button>


            {/* ========================================
                HEADER
            ======================================== */}

            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    gap: 2,
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
                        Suivi de la livraison
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: "14px",
                            color: "#6B7280",
                        }}
                    >
                        Suivez la position de votre livreur en temps réel.
                    </Typography>

                </Box>


                {/* CONNECTION STATUS */}

                {connected ? (

                    <Chip
                        icon={
                            <WifiRoundedIcon />
                        }
                        label="En direct"
                        sx={{
                            bgcolor: "#F0FDF4",
                            color: "#16A34A",
                            fontWeight: 700,

                            "& .MuiChip-icon": {
                                color: "#16A34A",
                            },
                        }}
                    />

                ) : (

                    <Chip
                        icon={
                            <WifiOffRoundedIcon />
                        }
                        label={
                            connectionError
                                ? "Connexion interrompue"
                                : "Connexion..."
                        }
                        sx={{
                            bgcolor: connectionError
                                ? "#FEF2F2"
                                : "#FFF7ED",

                            color: connectionError
                                ? "#DC2626"
                                : "#EA580C",

                            fontWeight: 700,

                            "& .MuiChip-icon": {
                                color: "inherit",
                            },
                        }}
                    />

                )}

            </Box>


            {/* ========================================
                GRID
            ======================================== */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1fr 280px",
                    },
                    gap: 3,
                }}
            >

                {/* ========================================
                    MAP
                ======================================== */}

                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        overflow: "hidden",
                        bgcolor: "#FFFFFF",
                    }}
                >

                    {location ? (

                        <Box
                            sx={{
                                height: {
                                    xs: "420px",
                                    md: "560px",
                                },
                                width: "100%",
                            }}
                        >

                            <MapContainer
                                center={[
                                    location.latitude,
                                    location.longitude,
                                ]}
                                zoom={15}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >

                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />


                                <Marker
                                    position={[
                                        location.latitude,
                                        location.longitude,
                                    ]}
                                    icon={driverIcon}
                                >

                                    <Popup>

                                        <Box
                                            sx={{
                                                minWidth: "150px",
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "13px",
                                                    color: "#0B1F3A",
                                                }}
                                            >
                                                Votre livreur
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontSize: "11px",
                                                    color: "#64748B",
                                                }}
                                            >
                                                Position mise à jour en temps réel
                                            </Typography>

                                        </Box>

                                    </Popup>

                                </Marker>


                                <MapUpdater
                                    latitude={
                                        location.latitude
                                    }
                                    longitude={
                                        location.longitude
                                    }
                                />

                            </MapContainer>

                        </Box>

                    ) : (

                        /* ========================================
                           NO LOCATION
                        ======================================== */

                        <Box
                            sx={{
                                height: {
                                    xs: "420px",
                                    md: "560px",
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                textAlign: "center",
                                px: 3,
                            }}
                        >

                            <Box
                                sx={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    bgcolor: "#FFF7ED",
                                    color: "#FF6B00",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >

                                <MyLocationRoundedIcon
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                />

                            </Box>


                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    color: "#0B1F3A",
                                }}
                            >
                                Position en attente
                            </Typography>


                            <Typography
                                sx={{
                                    mt: 1,
                                    maxWidth: "350px",
                                    fontSize: "13px",
                                    color: "#64748B",
                                    lineHeight: 1.6,
                                }}
                            >
                                La position apparaîtra automatiquement
                                dès que le livreur partagera sa localisation.
                            </Typography>

                        </Box>

                    )}

                </Paper>


                {/* ========================================
                    LOCATION INFO
                ======================================== */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >

                    {/* LIVE CARD */}

                    <Paper
                        elevation={0}
                        sx={{
                            border:
                                "1px solid #E5E7EB",
                            borderRadius: "14px",
                            bgcolor: "#FFFFFF",
                            p: 2.5,
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#0B1F3A",
                                mb: 2.5,
                            }}
                        >
                            Position du livreur
                        </Typography>


                        <InfoItem
                            icon={
                                <LocalShippingRoundedIcon />
                            }
                            label="Livreur"
                            value={
                                location?.driverId
                                    ? `Driver #${location.driverId}`
                                    : "-"
                            }
                        />


                        <InfoItem
                            icon={
                                <MyLocationRoundedIcon />
                            }
                            label="Latitude"
                            value={
                                location?.latitude
                                    ?.toFixed(6) ??
                                "-"
                            }
                        />


                        <InfoItem
                            icon={
                                <MyLocationRoundedIcon />
                            }
                            label="Longitude"
                            value={
                                location?.longitude
                                    ?.toFixed(6) ??
                                "-"
                            }
                        />


                        <InfoItem
                            icon={
                                <AccessTimeRoundedIcon />
                            }
                            label="Dernière mise à jour"
                            value={
                                location
                                    ? formatDate(
                                        location.timestamp
                                    )
                                    : "-"
                            }
                            last
                        />

                    </Paper>


                    {/* LIVE INFORMATION */}

                    <Paper
                        elevation={0}
                        sx={{
                            border:
                                "1px solid #FED7AA",
                            borderRadius: "14px",
                            bgcolor: "#FFF7ED",
                            p: 2.5,
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                alignItems: "flex-start",
                            }}
                        >

                            <Box
                                sx={{
                                    color: "#FF6B00",
                                    mt: "2px",
                                }}
                            >
                                <WifiRoundedIcon
                                    sx={{
                                        fontSize: "20px",
                                    }}
                                />
                            </Box>


                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#9A3412",
                                    }}
                                >
                                    Suivi en temps réel
                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 0.5,
                                        fontSize: "12px",
                                        color: "#C2410C",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    La carte se met à jour automatiquement
                                    lorsque le livreur partage une nouvelle
                                    position.
                                </Typography>

                            </Box>

                        </Box>

                    </Paper>

                </Box>

            </Box>

        </Box>
    );
};


/* ========================================
   INFO ITEM
======================================== */

const InfoItem = ({
                      icon,
                      label,
                      value,
                      last = false,
                  }) => {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                pb: last ? 0 : 2,
                mb: last ? 0 : 2,
                borderBottom: last
                    ? "none"
                    : "1px solid #F1F5F9",
            }}
        >

            <Box
                sx={{
                    width: "34px",
                    height: "34px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    bgcolor: "#FFF7ED",
                    color: "#FF6B00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& svg": {
                        fontSize: "18px",
                    },
                }}
            >
                {icon}
            </Box>


            <Box
                sx={{
                    minWidth: 0,
                }}
            >

                <Typography
                    sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                    }}
                >
                    {label}
                </Typography>


                <Typography
                    sx={{
                        mt: 0.4,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#334155",
                        wordBreak: "break-word",
                    }}
                >
                    {value}
                </Typography>

            </Box>

        </Box>
    );
};


export default DeliveryTracking;