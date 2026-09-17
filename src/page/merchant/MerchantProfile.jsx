import { useEffect, useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import {
    BusinessOutlined,
    EmailOutlined,
    PersonOutlined,
    PhoneOutlined,
    SaveOutlined,
} from "@mui/icons-material";

import {
    getMyProfile,
    updateMyProfile,
} from "../../api/merchantService.js";

import { toast } from "react-toastify";

const MerchantProfile = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        businessName: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyProfile();

            setFormData({
                name: response.data.name || "",
                email: response.data.email || "",
                telephone: response.data.telephone || "",
                businessName:
                    response.data.businessName || "",
            });

        } catch (error) {

            console.error(
                "Erreur chargement profil:",
                error
            );

            setError(
                "Impossible de charger votre profil."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.telephone.trim() ||
            !formData.businessName.trim()
        ) {
            toast.error(
                "Veuillez remplir tous les champs."
            );
            return;
        }

        try {

            setSaving(true);

            const response =
                await updateMyProfile(formData);

            setFormData({
                name: response.data.name || "",
                email: response.data.email || "",
                telephone:
                    response.data.telephone || "",
                businessName:
                    response.data.businessName || "",
            });

            toast.success(
                "Profil mis à jour avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur modification profil:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Impossible de modifier le profil.";

            toast.error(message);

        } finally {

            setSaving(false);
        }
    };

    if (loading) {

        return (
            <Box
                sx={{
                    minHeight: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress
                    sx={{ color: "#FF6B00" }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: "950px",
                mx: "auto",
            }}
        >


            <Box sx={{ mb: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={800}
                    color="#0B1F3A"
                >
                    Mon profil
                </Typography>

                <Typography
                    color="#6B7280"
                    sx={{ mt: 0.5 }}
                >
                    Gérez vos informations personnelles
                    et celles de votre entreprise.
                </Typography>

            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid #E5E7EB",
                    overflow: "hidden",
                }}
            >


                <Box
                    sx={{
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                    }}
                >

                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            bgcolor: "#FFF1E8",
                            color: "#FF6B00",
                            fontSize: 28,
                            fontWeight: 800,
                        }}
                    >
                        {formData.name
                            ?.charAt(0)
                            .toUpperCase()}
                    </Avatar>

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={800}
                            color="#0B1F3A"
                        >
                            {formData.name}
                        </Typography>

                        <Typography
                            color="#6B7280"
                        >
                            {formData.businessName}
                        </Typography>

                    </Box>

                </Box>

                <Divider />


                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: { xs: 3, md: 4 },
                    }}
                >

                    <Typography
                        fontWeight={700}
                        color="#0B1F3A"
                        sx={{ mb: 3 }}
                    >
                        Informations du compte
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 3,
                        }}
                    >

                        <TextField
                            fullWidth
                            required
                            label="Nom complet"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <PersonOutlined
                                            sx={{
                                                mr: 1,
                                                color: "#9CA3AF",
                                            }}
                                        />
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Nom de l'entreprise"
                            name="businessName"
                            value={
                                formData.businessName
                            }
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <BusinessOutlined
                                            sx={{
                                                mr: 1,
                                                color: "#9CA3AF",
                                            }}
                                        />
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            type="email"
                            label="Adresse email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <EmailOutlined
                                            sx={{
                                                mr: 1,
                                                color: "#9CA3AF",
                                            }}
                                        />
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Téléphone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <PhoneOutlined
                                            sx={{
                                                mr: 1,
                                                color: "#9CA3AF",
                                            }}
                                        />
                                    ),
                                },
                            }}
                        />

                    </Box>

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={saving}
                            startIcon={
                                saving
                                    ? (
                                        <CircularProgress
                                            size={18}
                                            color="inherit"
                                        />
                                    )
                                    : <SaveOutlined />
                            }
                            sx={{
                                bgcolor: "#FF6B00",
                                px: 3,
                                py: 1.2,
                                borderRadius: 2.5,
                                textTransform: "none",
                                fontWeight: 700,

                                "&:hover": {
                                    bgcolor: "#E85F00",
                                },
                            }}
                        >
                            {saving
                                ? "Enregistrement..."
                                : "Enregistrer les modifications"}
                        </Button>

                    </Box>

                </Box>

            </Paper>

        </Box>
    );
};

export default MerchantProfile;