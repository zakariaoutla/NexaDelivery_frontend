import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { toast } from "react-toastify";

import { getMyCollectionPoints } from "../../api/collectionPointService.js";
import { createDelivery } from "../../api/deliveryService.js";

const CreateDelivery = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        collectionPointId: "",
        dropAddress: "",
        clientName: "",
        clientPhone: "",
        description: "",
    });

    const [collectionPoints, setCollectionPoints] = useState([]);

    const [loadingPoints, setLoadingPoints] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        const fetchCollectionPoints = async () => {

            try {

                const response = await getMyCollectionPoints();

                setCollectionPoints(response.data.content);

            } catch (error) {

                console.error(error);

                toast.error(
                    "Impossible de charger les points de collecte"
                );

            } finally {

                setLoadingPoints(false);
            }
        };

        fetchCollectionPoints();

    }, []);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formData.collectionPointId) {
            toast.error("Veuillez sélectionner un point de collecte");
            return;
        }

        const payload = {
            dropAddress: formData.dropAddress.trim(),
            description: formData.description.trim(),
            clientName: formData.clientName.trim(),
            clientPhone: formData.clientPhone.trim(),
            collectionPointId: Number(formData.collectionPointId),
        };

        try {

            setSubmitting(true);

            await createDelivery(payload);

            toast.success("Livraison créée avec succès");

            navigate("/merchant/deliveries");

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.message ||
                "Erreur lors de la création de la livraison";

            toast.error(message);

        } finally {

            setSubmitting(false);
        }
    };

    return (
        <Box>


            <Box sx={{ mb: 4 }}>

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
                    Créer une livraison
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: "14px",
                        color: "#6B7280",
                    }}
                >
                    Ajoutez les informations de votre nouvelle livraison.
                </Typography>

            </Box>



            <Paper
                elevation={0}
                sx={{
                    maxWidth: "900px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                }}
            >

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                        },
                        gap: 2.5,
                    }}
                >


                    <TextField
                        select
                        required
                        fullWidth
                        label="Point de collecte"
                        name="collectionPointId"
                        value={formData.collectionPointId}
                        onChange={handleChange}
                        disabled={loadingPoints}
                    >

                        {loadingPoints ? (

                            <MenuItem disabled>
                                Chargement...
                            </MenuItem>

                        ) : collectionPoints.length === 0 ? (

                            <MenuItem disabled>
                                Aucun point de collecte
                            </MenuItem>

                        ) : (

                            collectionPoints.map((point) => (

                                <MenuItem
                                    key={point.id}
                                    value={point.id}
                                >
                                    {point.address}
                                </MenuItem>

                            ))

                        )}

                    </TextField>



                    <TextField
                        required
                        fullWidth
                        label="Nom du client"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                    />



                    <TextField
                        required
                        fullWidth
                        label="Téléphone du client"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleChange}
                    />



                    <TextField
                        required
                        fullWidth
                        label="Adresse de livraison"
                        name="dropAddress"
                        value={formData.dropAddress}
                        onChange={handleChange}
                    />



                    <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Description du colis"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ex: Colis fragile, documents..."
                        sx={{
                            gridColumn: {
                                xs: "auto",
                                md: "span 2",
                            },
                        }}
                    />



                    <Box
                        sx={{
                            gridColumn: {
                                xs: "auto",
                                md: "span 2",
                            },
                            display: "flex",
                            justifyContent: {
                                xs: "stretch",
                                sm: "flex-end",
                            },
                            mt: 1,
                        }}
                    >

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={
                                submitting ||
                                loadingPoints ||
                                collectionPoints.length === 0
                            }
                            startIcon={
                                submitting
                                    ? (
                                        <CircularProgress
                                            size={18}
                                            sx={{ color: "inherit" }}
                                        />
                                    )
                                    : <AddBoxOutlinedIcon />
                            }
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3,
                                py: 1.2,
                                borderRadius: "9px",
                                boxShadow: "none",

                                "&:hover": {
                                    bgcolor: "#E65F00",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            {submitting
                                ? "Création..."
                                : "Créer la livraison"}
                        </Button>

                    </Box>

                </Box>

            </Paper>

        </Box>
    );
};

export default CreateDelivery;