import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";

import L from "leaflet";

import {
    getLatestDriverLocations,
} from "../../api/driverLocationService.js";


const driverIcon = L.divIcon({
    className: "",
    html: `
        <div style="
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #FF6B00;
            border: 3px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(0,0,0,0.22);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
        ">
            🚚
        </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -22],
});


const FitDrivers = ({ locations }) => {

    const map = useMap();

    useEffect(() => {

        if (!locations.length) {
            return;
        }

        if (locations.length === 1) {

            map.setView(
                [
                    locations[0].latitude,
                    locations[0].longitude,
                ],
                14
            );

            return;
        }

        const bounds = L.latLngBounds(
            locations.map((location) => [
                location.latitude,
                location.longitude,
            ])
        );

        map.fitBounds(bounds, {
            padding: [40, 40],
        });

    }, [locations, map]);

    return null;
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
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(new Date(date));
};


const AdminDriverMap = () => {

    const [locations, setLocations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);


    useEffect(() => {

        const fetchLocations = async () => {

            try {

                setError(false);

                const response =
                    await getLatestDriverLocations();

                setLocations(
                    response.data ?? []
                );

            } catch (error) {

                console.error(
                    "Erreur positions drivers:",
                    error
                );

                setError(true);

            } finally {

                setLoading(false);
            }
        };

        fetchLocations();

    }, []);


    if (loading) {

        return (
            <Box
                sx={{
                    height: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress
                    size={30}
                    sx={{
                        color: "#FF6B00",
                    }}
                />
            </Box>
        );
    }


    if (error) {

        return (
            <Box
                sx={{
                    height: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#DC2626",
                    }}
                >
                    Impossible de charger
                    les positions des chauffeurs.
                </Typography>
            </Box>
        );
    }


    if (locations.length === 0) {

        return (
            <Box
                sx={{
                    height: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#64748B",
                    }}
                >
                    Aucune position de chauffeur
                    disponible.
                </Typography>
            </Box>
        );
    }


    return (
        <Box
            sx={{
                width: "100%",
                height: "320px",
            }}
        >

            <MapContainer
                center={[
                    locations[0].latitude,
                    locations[0].longitude,
                ]}
                zoom={12}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {locations.map((location) => (

                    <Marker
                        key={location.driverId}
                        position={[
                            location.latitude,
                            location.longitude,
                        ]}
                        icon={driverIcon}
                    >

                        <Popup>

                            <Box
                                sx={{
                                    minWidth: "160px",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#0B1F3A",
                                    }}
                                >
                                    Chauffeur #{location.driverId}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.7,
                                        fontSize: "11px",
                                        color: "#64748B",
                                    }}
                                >
                                    Dernière position
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.3,
                                        fontSize: "11px",
                                        fontWeight: 600,
                                        color: "#334155",
                                    }}
                                >
                                    {formatDate(
                                        location.timestamp
                                    )}
                                </Typography>

                            </Box>

                        </Popup>

                    </Marker>

                ))}


                <FitDrivers
                    locations={locations}
                />

            </MapContainer>

        </Box>
    );
};


export default AdminDriverMap;