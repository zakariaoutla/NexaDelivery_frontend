import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextField,
    Typography,
} from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { toast } from "react-toastify";
import { createRating } from "../../api/ratingService.js";

export default function RatingDialog({
                                         open,
                                         onClose,
                                         deliveryId,
                                         onSuccess,
                                     }) {

    const [score, setScore] = useState(0);
    const [comment, setComment] = useState("");
    const [saving, setSaving] = useState(false);

    const handleClose = () => {
        if (saving) return;

        setScore(0);
        setComment("");
        onClose();
    };

    const handleSubmit = async () => {

        if (!score) {
            toast.error("Veuillez sélectionner une note.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Veuillez ajouter un commentaire.");
            return;
        }

        try {
            setSaving(true);

            await createRating(deliveryId, {
                score,
                comment: comment.trim(),
            });

            toast.success(
                "Votre évaluation a été enregistrée avec succès."
            );

            setScore(0);
            setComment("");

            onClose();

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {

            console.error(
                "Erreur création rating:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Impossible d'enregistrer votre évaluation."
            );

        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 800,
                    color: "#0B1F3A",
                    pb: 1,
                }}
            >
                Évaluer le chauffeur
            </DialogTitle>

            <DialogContent>
                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#64748B",
                        mb: 3,
                    }}
                >
                    Comment s'est passée votre livraison ?
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Rating
                        value={score}
                        onChange={(event, newValue) => {
                            setScore(newValue || 0);
                        }}
                        precision={1}
                        size="large"
                        icon={
                            <StarRoundedIcon
                                fontSize="inherit"
                            />
                        }
                        emptyIcon={
                            <StarRoundedIcon
                                fontSize="inherit"
                            />
                        }
                    />

                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#64748B",
                        }}
                    >
                        {score
                            ? `${score} / 5`
                            : "Sélectionnez une note"}
                    </Typography>
                </Box>

                <TextField
                    label="Commentaire"
                    value={comment}
                    onChange={(event) =>
                        setComment(event.target.value)
                    }
                    multiline
                    rows={4}
                    fullWidth
                    required
                    placeholder="Partagez votre expérience..."
                />
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3,
                    gap: 1,
                }}
            >
                <Button
                    onClick={handleClose}
                    disabled={saving}
                    sx={{
                        color: "#64748B",
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Annuler
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={saving}
                    startIcon={
                        saving
                            ? (
                                <CircularProgress
                                    size={16}
                                    color="inherit"
                                />
                            )
                            : <StarRoundedIcon />
                    }
                    sx={{
                        bgcolor: "#FF6B00",
                        boxShadow: "none",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 700,
                        "&:hover": {
                            bgcolor: "#E85F00",
                            boxShadow: "none",
                        },
                    }}
                >
                    {saving
                        ? "Enregistrement..."
                        : "Envoyer l'évaluation"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}