import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {toast} from "react-toastify";
import {postDriver, postMerchant} from "../api/auth.js";

function Register() {
    const [accountType, setAccountType] = useState("MERCHANT");
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        password: "",
        businessName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (accountType === "DRIVER"){
                await postDriver(formData)
                navigate("/login")
                setFormData({
                    name: formData.name,
                    email: formData.email,
                    telephone: formData.telephone,
                    password: formData.password,
                });
            }

            if (accountType === "MERCHANT"){
                 await postMerchant(formData)
                setFormData({
                    name: formData.name,
                    email: formData.email,
                    telephone: formData.telephone,
                    password: formData.password,
                    businessName: formData.businessName,
                })
            }
            toast.success("Compte créé avec succès")
            navigate("/login")


        }catch (err){
            console.error(err)
            toast.error("Erreur lors de l'inscription. Veuillez réessayer.")
        }
    };

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            height: "44px",
            borderRadius: "11px",
            backgroundColor: "#FFFFFF",
            fontSize: "12px",

            "& fieldset": {
                borderColor: "#D6DDE8",
            },

            "&:hover fieldset": {
                borderColor: "#AEB9C9",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#2878FF",
                borderWidth: "1.5px",
            },
        },

        "& input::placeholder": {
            color: "#9CA6B7",
            opacity: 1,
        },
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",

                display: "grid",

                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                },

                backgroundColor: "#EEF4FD",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    position: "relative",

                    minHeight: {
                        xs: "300px",
                        md: "100vh",
                    },

                    backgroundColor: "#062C72",
                    overflow: "hidden",
                }}
            >

                <Box

                    component="img"
                    src="/login-bg.png"
                    alt="NexaDelivery"
                    sx={{
                        position: "absolute",
                        inset: 0,

                        width: "100%",
                        height: "100%",

                        objectFit: "cover",
                        objectPosition: "center",

                        zIndex: 0,
                    }}
                />


                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,

                        zIndex: 1,

                        background: `
              linear-gradient(
                180deg,
                rgba(3, 27, 73, 0.80) 0%,
                rgba(3, 31, 82, 0.32) 38%,
                rgba(3, 31, 82, 0.05) 65%,
                rgba(3, 25, 66, 0.20) 100%
              )
            `,
                    }}
                />


                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,

                        pt: {
                            xs: 4,
                            md: 5,
                            lg: 6,
                        },

                        px: {
                            xs: 3,
                            sm: 4,
                            md: 4,
                            lg: 5,
                        },

                        maxWidth: "550px",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#FFFFFF",

                            fontSize: {
                                xs: "26px",
                                sm: "30px",
                                md: "32px",
                                lg: "36px",
                            },

                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-0.8px",
                        }}
                    >
                        Rejoignez{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#FF6B00",
                            }}
                        >
                            NexaDelivery
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: "#FFFFFF",

                            fontSize: {
                                xs: "26px",
                                sm: "30px",
                                md: "32px",
                                lg: "36px",
                            },

                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-0.8px",
                        }}
                    >
                        et simplifiez vos envois
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.2,

                            color: "rgba(255,255,255,0.90)",

                            fontSize: {
                                xs: "11px",
                                md: "12px",
                            },

                            fontWeight: 500,
                            lineHeight: 1.4,

                            maxWidth: "390px",
                        }}
                    >
                        Expédiez, recevez et suivez vos colis en toute confiance,
                        partout au Maroc.
                    </Typography>
                </Box>
            </Box>


            <Box
                sx={{
                    minHeight: {
                        xs: "auto",
                        md: "100vh",
                    },

                    backgroundColor: "#EEF4FD",

                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    justifyContent: "center",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 4,
                    },

                    py: {
                        xs: 3,
                        md: 2,
                    },
                }}
            >

                <Box
                    onClick={() => navigate("/")}
                    component="img"
                    src="/loginexadeliveryBlack.png"
                    alt="NexaDelivery"
                    sx={{
                        width: {
                            xs: "210px",
                            sm: "230px",
                            md: "240px",
                            lg: "270px",
                        },

                        height: "auto",
                        objectFit: "contain",

                        mb: {
                            xs: 2,
                            md: 1.5,
                        },
                    }}
                />


                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        maxWidth: "520px",

                        backgroundColor: "#FFFFFF",

                        borderRadius: {
                            xs: "18px",
                            md: "24px",
                        },

                        px: {
                            xs: 2.5,
                            sm: 3.5,
                        },

                        py: {
                            xs: 2.5,
                            md: 2.8,
                        },

                        boxShadow: "0 10px 35px rgba(19,45,85,0.05)",
                    }}
                >

                    <Typography
                        align="center"
                        sx={{
                            color: "#101D4A",

                            fontSize: {
                                xs: "23px",
                                md: "25px",
                            },

                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Créer un compte
                    </Typography>


                    <Typography
                        align="center"
                        sx={{
                            mt: 0.5,
                            mb: 1.7,

                            color: "#98A1B2",
                            fontSize: "10px",
                        }}
                    >
                        Rejoignez la communauté NexaDelivery en quelques étapes
                    </Typography>


                    <Typography
                        sx={{
                            color: "#111C3E",

                            fontSize: "10px",
                            fontWeight: 700,

                            mb: 1,
                        }}
                    >
                        Type de compte
                    </Typography>


                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },

                            gap: 1.3,
                            mb: 1.5,
                        }}
                    >

                        <Box
                            onClick={() => setAccountType("DRIVER")}
                            sx={{
                                minHeight: "56px",

                                border:
                                    accountType === "DRIVER"
                                        ? "1.5px solid #2878FF"
                                        : "1px solid #D6DDE8",

                                backgroundColor:
                                    accountType === "DRIVER"
                                        ? "#EDF5FF"
                                        : "#FFFFFF",

                                borderRadius: "10px",

                                px: 1.5,

                                display: "flex",
                                alignItems: "center",

                                cursor: "pointer",

                                transition: "0.2s",

                                "&:hover": {
                                    borderColor: "#2878FF",
                                },
                            }}
                        >
                            <TwoWheelerRoundedIcon
                                sx={{
                                    color: "#0867E8",
                                    fontSize: "25px",
                                    mr: 1.3,
                                }}
                            />

                            <Box>
                                <Typography
                                    sx={{
                                        color: "#101D3F",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                    }}
                                >
                                    Livreur
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#9AA4B4",
                                        fontSize: "8px",
                                    }}
                                >
                                    Transportez des colis
                                </Typography>
                            </Box>
                        </Box>


                        <Box
                            onClick={() => setAccountType("MERCHANT")}
                            sx={{
                                minHeight: "56px",

                                border:
                                    accountType === "MERCHANT"
                                        ? "1.5px solid #2878FF"
                                        : "1px solid #D6DDE8",

                                backgroundColor:
                                    accountType === "MERCHANT"
                                        ? "#EDF5FF"
                                        : "#FFFFFF",

                                borderRadius: "10px",

                                px: 1.5,

                                display: "flex",
                                alignItems: "center",

                                cursor: "pointer",

                                transition: "0.2s",

                                "&:hover": {
                                    borderColor: "#2878FF",
                                },
                            }}
                        >
                            <StorefrontRoundedIcon
                                sx={{
                                    color: "#0867E8",
                                    fontSize: "25px",
                                    mr: 1.3,
                                }}
                            />

                            <Box>
                                <Typography
                                    sx={{
                                        color: "#101D3F",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                    }}
                                >
                                    Commerçant
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#9AA4B4",
                                        fontSize: "8px",
                                    }}
                                >
                                    Gérez vos livraisons
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },

                            gap: 1.3,
                            mb: 1.3,
                        }}
                    >

                        <TextField
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nom complet"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {accountType === "MERCHANT" ? (
                                            <StorefrontRoundedIcon
                                                sx={{
                                                    fontSize: 16,
                                                    color: "#56647A",
                                                }}
                                            />
                                        ) : (
                                            <PersonOutlineRoundedIcon
                                                sx={{
                                                    fontSize: 17,
                                                    color: "#56647A",
                                                }}
                                            />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputStyle}
                        />


                        <TextField
                            fullWidth
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Téléphone"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlinedIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#56647A",
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputStyle}
                        />
                    </Box>


                    {accountType === "MERCHANT" && (
                        <TextField
                            fullWidth
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Nom de l'entreprise"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnOutlinedIcon
                                            sx={{
                                                fontSize: 17,
                                                color: "#56647A",
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                ...inputStyle,
                                mb: 1.3,
                            }}
                        />
                    )}


                    <TextField
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon
                                        sx={{
                                            fontSize: 16,
                                            color: "#56647A",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            ...inputStyle,
                            mb: 1.3,
                        }}
                    />


                    <TextField
                        fullWidth
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon
                                        sx={{
                                            fontSize: 16,
                                            color: "#56647A",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            ...inputStyle,
                            mb: 1.5,
                        }}
                    />


                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disableElevation
                        endIcon={
                            <ArrowForwardRoundedIcon
                                sx={{
                                    fontSize: "15px !important",
                                }}
                            />
                        }
                        sx={{
                            height: "44px",

                            backgroundColor: "#FF6B00",
                            color: "#FFFFFF",

                            borderRadius: "22px",

                            textTransform: "none",

                            fontSize: "11px",
                            fontWeight: 700,

                            "&:hover": {
                                backgroundColor: "#E85F00",
                            },
                        }}
                    >
                        S'inscrire
                    </Button>


                    <Typography
                        align="center"
                        sx={{
                            mt: 1.6,

                            color: "#697386",

                            fontSize: "9px",
                        }}
                    >
                        Déjà un compte ?{" "}
                        <Box
                            component={Link}
                            to="/login"
                            sx={{
                                color: "#0867E8",
                                textDecoration: "none",
                                fontWeight: 600,

                                "&:hover": {
                                    color: "#FF6B00",
                                },
                            }}
                        >
                            Se connecter
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Register;