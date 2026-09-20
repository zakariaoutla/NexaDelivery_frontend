import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import AddRoundedIcon
    from "@mui/icons-material/AddRounded";

import DeleteOutlineRoundedIcon
    from "@mui/icons-material/DeleteOutlineRounded";

import EditOutlinedIcon
    from "@mui/icons-material/EditOutlined";

import {
    APIProvider,
} from "@vis.gl/react-google-maps";

import {
    createCollectionPoint,
    deleteCollectionPoint,
    getMyCollectionPoints,
    updateCollectionPoint,
} from "../../api/collectionPointService.js";

import CollectionPointMap
    from "../../components/CollectionPoint/CollectionPointMap.jsx";

import AddressAutocomplete
    from "../../components/CollectionPoint/AddressAutocomplete.jsx";

import {
    toast,
} from "react-toastify";


export default function CollectionPoints() {

    const [collectionPoints, setCollectionPoints] =
        useState([]);

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            address: "",
            latitude: null,
            longitude: null,
        });

    const [editingPoint, setEditingPoint] =
        useState(null);




    const fetchCollectionPoints =
        async () => {

            try {

                const response =
                    await getMyCollectionPoints(
                        0,
                        100,
                        "id,desc"
                    );


                setCollectionPoints(
                    response.data.content
                );

            } catch (error) {

                console.error(
                    "Erreur collection points:",
                    error
                );


                toast.error(
                    "Impossible de charger les points de collecte"
                );
            }
        };


    useEffect(() => {
        fetchCollectionPoints();
    }, []);



    const handleOpen = () => {
        setEditingPoint(null);

        setForm({
            address: "",
            latitude: null,
            longitude: null,
        });

        setOpen(true);
    };


    const handleClose = () => {

        if (loading) {
            return;
        }

        setOpen(false);
    };



    const handleAddressChange =
        useCallback((address) => {

            setForm((previous) => ({
                ...previous,
                address,
                latitude: null,
                longitude: null,
            }));

        }, []);



    const handlePlaceSelect =
        useCallback(({
                         address,
                         latitude,
                         longitude,
                     }) => {

            setForm({
                address,
                latitude,
                longitude,
            });

        }, []);




    const handleLocationChange =
        useCallback(({
                         latitude,
                         longitude,
                         address,
                     }) => {

            setForm((previous) => ({
                ...previous,

                latitude,
                longitude,

                address:
                    address ||
                    previous.address,
            }));

        }, []);


    const handleEdit = (point) => {
        setEditingPoint(point);

        setForm({
            address: point.address,
            latitude: point.latitude,
            longitude: point.longitude,
        });

        setOpen(true);
    };


    const handleSubmit = async () => {

        if (!form.address.trim()) {
            toast.error(
                "L'adresse est obligatoire"
            );
            return;
        }

        if (
            form.latitude === null ||
            form.longitude === null
        ) {
            toast.error(
                "Sélectionnez une adresse ou un emplacement sur la carte"
            );
            return;
        }

        const data = {
            address: form.address.trim(),
            latitude: form.latitude,
            longitude: form.longitude,
        };

        try {
            setLoading(true);

            if (editingPoint) {

                await updateCollectionPoint(
                    editingPoint.id,
                    data
                );

                toast.success(
                    "Point de collecte modifié"
                );

            } else {

                await createCollectionPoint(data);

                toast.success(
                    "Point de collecte ajouté"
                );
            }

            setOpen(false);
            setEditingPoint(null);

            await fetchCollectionPoints();

        } catch (error) {

            console.error(
                "Erreur collection point:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                (
                    editingPoint
                        ? "Impossible de modifier le point de collecte"
                        : "Impossible d'ajouter le point de collecte"
                )
            );

        } finally {
            setLoading(false);
        }
    };




    const handleDelete =
        async (id) => {

            const confirmed =
                window.confirm(
                    "Voulez-vous supprimer ce point de collecte ?"
                );


            if (!confirmed) {
                return;
            }


            try {

                await deleteCollectionPoint(
                    id
                );


                toast.success(
                    "Point de collecte supprimé"
                );


                await fetchCollectionPoints();

            } catch (error) {

                console.error(
                    "Erreur suppression:",
                    error
                );


                toast.error(
                    error.response?.data?.message ||
                    "Impossible de supprimer ce point de collecte"
                );
            }
        };



    return (
        <Box>


            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 4,
                    gap: 2,
                }}
            >

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color="#0B1F3A"
                    >
                        Points de collecte
                    </Typography>


                    <Typography
                        sx={{
                            color: "#6B7280",
                            fontSize: "14px",
                            mt: 0.5,
                        }}
                    >
                        Gérez les adresses de
                        collecte de vos livraisons.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRoundedIcon />
                    }
                    onClick={handleOpen}
                    sx={{
                        bgcolor: "#FF6B00",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "9px",
                        px: 2.5,

                        "&:hover": {
                            bgcolor: "#E65F00",
                        },
                    }}
                >
                    Ajouter un point
                </Button>

            </Box>




            {collectionPoints.length === 0 ? (

                <Paper
                    elevation={0}
                    sx={{
                        border:
                            "1px solid #E5E7EB",
                        borderRadius: "14px",
                        p: 5,
                        textAlign: "center",
                    }}
                >

                    <Typography
                        fontWeight={600}
                        color="#0B1F3A"
                    >
                        Aucun point de collecte
                    </Typography>


                    <Typography
                        sx={{
                            mt: 1,
                            color: "#6B7280",
                            fontSize: "14px",
                        }}
                    >
                        Ajoutez votre premier
                        point de collecte.
                    </Typography>

                </Paper>

            ) : (

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                        },

                        gap: 2,
                    }}
                >

                    {collectionPoints.map(
                        (point) => (

                            <Paper
                                key={point.id}
                                elevation={0}
                                sx={{
                                    border:
                                        "1px solid #E5E7EB",

                                    borderRadius:
                                        "14px",

                                    p: 2.5,
                                }}
                            >

                                <Box
                                    sx={{
                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        gap: 2,
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            fontWeight={700}
                                            color="#0B1F3A"
                                        >
                                            {point.address}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            display:
                                                "flex",

                                            alignItems:
                                                "flex-start",
                                        }}
                                    >

                                        <IconButton
                                            size="small"
                                            title="Modifier"
                                            onClick={() =>
                                                handleEdit(point)
                                            }
                                            sx={{
                                                color: "#0B1F3A",
                                            }}
                                        >
                                            <EditOutlinedIcon
                                                fontSize="small"
                                            />
                                        </IconButton>


                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleDelete(
                                                    point.id
                                                )
                                            }
                                            sx={{
                                                color:
                                                    "#DC2626",
                                            }}
                                        >
                                            <DeleteOutlineRoundedIcon
                                                fontSize="small"
                                            />
                                        </IconButton>

                                    </Box>

                                </Box>

                            </Paper>
                        )
                    )}

                </Box>
            )}




            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        color: "#0B1F3A",
                    }}
                >
                    {editingPoint
                        ? "Modifier le point de collecte"
                        : "Ajouter un point de collecte"}
                </DialogTitle>


                <DialogContent>

                    <APIProvider
                        apiKey={
                            import.meta.env
                                .VITE_GOOGLE_MAPS_API_KEY
                        }
                    >

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: 2.5,
                                mt: 1,
                            }}
                        >

                            <AddressAutocomplete
                                value={
                                    form.address
                                }
                                onChange={
                                    handleAddressChange
                                }
                                onPlaceSelect={
                                    handlePlaceSelect
                                }
                            />


                            <CollectionPointMap
                                latitude={
                                    form.latitude
                                }
                                longitude={
                                    form.longitude
                                }
                                onLocationChange={
                                    handleLocationChange
                                }
                            />

                        </Box>

                    </APIProvider>

                </DialogContent>


                <DialogActions
                    sx={{
                        px: 3,
                        pb: 2.5,
                    }}
                >

                    <Button
                        onClick={handleClose}
                        disabled={loading}
                        sx={{
                            color: "#6B7280",
                            textTransform: "none",
                        }}
                    >
                        Annuler
                    </Button>


                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            bgcolor: "#FF6B00",
                            textTransform: "none",
                            fontWeight: 600,

                            "&:hover": {
                                bgcolor: "#E65F00",
                            },
                        }}
                    >
                        {loading
                            ? "Enregistrement..."
                            : "Enregistrer"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}