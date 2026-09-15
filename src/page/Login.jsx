import {useContext, useState} from "react";

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {useNavigate} from "react-router-dom";
import {postLogin} from "../api/auth.js";
import {toast} from "react-toastify";
import {AuthContext} from "../Config/AuthContext.jsx";
import {jwtDecode} from "jwt-decode";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)



    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res=  await postLogin(formData)
            const token = res.data.token
            login(token)
            const decodedToken = jwtDecode(token)
            const role = decodedToken.role;
            toast.success("Connexion réussie")

            if (role === "ADMIN"){
                navigate("/admin");
            }else if(role==="MERCHANT"){
                navigate("/merchant");
            }else if(role ==="DRIVER"){
                navigate("/driver");
            }else {
                navigate("/");
            }

        }catch (err){
            console.error(err)
            toast.error("Email ou mot de passe incorrect")
        }

    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                p: {
                    xs: 0,
                    md: 0,
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: {
                        xs: "100vh",
                        md: "700px",
                    },

                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },

                    overflow: "hidden",

                    bgcolor: "#EEF4FD",
                }}
            >
                <Box
                    sx={{
                        position: "relative",

                        minHeight:"100vh",

                        overflow: "hidden",

                        bgcolor: "#062C72",
                    }}
                >
                    <Box
                        component="img"
                        src="/login-bg.png"
                        alt="NexaDelivery livraison"
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

                            background: `
                linear-gradient(
                  180deg,
                  rgba(3, 28, 75, 0.82) 0%,
                  rgba(3, 35, 94, 0.40) 30%,
                  rgba(3, 35, 94, 0.08) 60%,
                  rgba(3, 24, 65, 0.18) 100%
                )
              `,

                            zIndex: 1,
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 2,

                            pt: {
                                xs: 4,
                                sm: 5,
                                md: 6,
                            },

                            px: {
                                xs: 3,
                                sm: 4,
                                md: 5,
                            },

                            maxWidth: "480px",
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                color: "#FFFFFF",

                                fontSize: {
                                    xs: "28px",
                                    sm: "34px",
                                    md: "38px",
                                    lg: "42px",
                                },

                                lineHeight: 1.08,

                                fontWeight: 800,

                                letterSpacing: "-1px",
                            }}
                        >
                            Suivez vos colis
                        </Typography>

                        <Typography
                            sx={{
                                color: "#FF6B00",

                                fontSize: {
                                    xs: "28px",
                                    sm: "34px",
                                    md: "38px",
                                    lg: "42px",
                                },

                                lineHeight: 1.08,

                                fontWeight: 800,

                                letterSpacing: "-1px",
                            }}
                        >
                            en toute simplicité
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,

                                color: "rgba(255,255,255,0.88)",

                                fontSize: {
                                    xs: "12px",
                                    sm: "13px",
                                    md: "14px",
                                },

                                lineHeight: 1.6,

                                maxWidth: "390px",
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    color: "#FF6B00",
                                    fontWeight: 700,
                                }}
                            >
                                NexaDelivery
                            </Box>{" "}
                            vous accompagne pour une livraison rapide,
                            <br />
                            sûre et fiable partout au Maroc.
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        bgcolor: "#EEF4FD",

                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                        justifyContent: "center",

                        px: {
                            xs: 2.5,
                            sm: 5,
                            md: 4,
                            lg: 6,
                        },

                        py: {
                            xs: 5,
                            md: 4,
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
                                xs: "220px",
                                sm: "260px",
                                md: "280px",
                                lg: "320px",
                            },

                            height: "auto",

                            objectFit: "contain",

                            mb: {
                                xs: 4,
                                md: 4.5,
                            },
                        }}
                    />

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: "100%",
                            maxWidth: "480px",

                            bgcolor: "#FFFFFF",

                            borderRadius: "18px",

                            px: {
                                xs: 2.5,
                                sm: 4,
                                md: 4,
                            },

                            py: {
                                xs: 3.5,
                                sm: 4,
                            },

                            boxShadow: "0 14px 40px rgba(15, 40, 80, 0.12)",
                        }}
                    >
                        <Typography
                            component="h2"
                            align="center"
                            sx={{
                                color: "#101D4A",

                                fontSize: {
                                    xs: "27px",
                                    md: "30px",
                                },

                                fontWeight: 800,

                                lineHeight: 1.2,
                            }}
                        >
                            Connexion
                        </Typography>

                        <Typography
                            align="center"
                            sx={{
                                mt: 0.7,
                                mb: 3,

                                color: "#8B93A7",

                                fontSize: "12px",
                            }}
                        >
                            Accédez à votre espace NexaDelivery
                        </Typography>

                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Adresse e-mail"
                            autoComplete="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon
                                            sx={{
                                                color: "#132451",
                                                fontSize: "19px",
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 2,

                                "& .MuiOutlinedInput-root": {
                                    height: "50px",

                                    borderRadius: "10px",

                                    bgcolor: "#FFFFFF",

                                    fontSize: "13px",

                                    "& fieldset": {
                                        borderColor: "#CBD5E1",
                                    },

                                    "&:hover fieldset": {
                                        borderColor: "#AAB7CA",
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor: "#FF6B00",
                                        borderWidth: "1.5px",
                                    },
                                },

                                "& input::placeholder": {
                                    color: "#9AA4B7",
                                    opacity: 1,
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon
                                            sx={{
                                                color: "#132451",
                                                fontSize: "19px",
                                            }}
                                        />
                                    </InputAdornment>
                                ),

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? (
                                                <VisibilityOffOutlinedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: "#6B7280",
                                                    }}
                                                />
                                            ) : (
                                                <VisibilityOutlinedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: "#6B7280",
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 1,

                                "& .MuiOutlinedInput-root": {
                                    height: "50px",

                                    borderRadius: "10px",

                                    fontSize: "13px",

                                    "& fieldset": {
                                        borderColor: "#CBD5E1",
                                    },

                                    "&:hover fieldset": {
                                        borderColor: "#AAB7CA",
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor: "#FF6B00",
                                        borderWidth: "1.5px",
                                    },
                                },

                                "& input::placeholder": {
                                    color: "#9AA4B7",
                                    opacity: 1,
                                },
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",

                                mb: 1.8,

                                gap: 1,
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                        size="small"
                                        sx={{
                                            p: 0.5,
                                            mr: 0.4,

                                            color: "#CBD5E1",

                                            "&.Mui-checked": {
                                                color: "#FF6B00",
                                            },
                                        }}
                                    />
                                }
                                label="Se souvenir de moi"
                                sx={{
                                    m: 0,

                                    "& .MuiFormControlLabel-label": {
                                        color: "#38445C",

                                        fontSize: {
                                            xs: "10px",
                                            sm: "11px",
                                        },
                                    },
                                }}
                            />

                            <Button
                                type="button"
                                disableRipple
                                sx={{
                                    p: 0,
                                    minWidth: "auto",

                                    textTransform: "none",

                                    color: "#1556C0",

                                    fontSize: {
                                        xs: "10px",
                                        sm: "11px",
                                    },

                                    fontWeight: 600,

                                    "&:hover": {
                                        bgcolor: "transparent",
                                        color: "#FF6B00",
                                    },
                                }}
                            >
                                Mot de passe oublié ?
                            </Button>
                        </Box>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disableElevation
                            endIcon={
                                <ArrowForwardRoundedIcon
                                    sx={{
                                        fontSize: "17px !important",
                                    }}
                                />
                            }
                            sx={{
                                height: "48px",

                                bgcolor: "#FF6B00",

                                color: "#FFFFFF",

                                textTransform: "none",

                                fontSize: "13px",
                                fontWeight: 700,

                                borderRadius: "9px",

                                "&:hover": {
                                    bgcolor: "#E85F00",
                                },
                            }}
                        >
                            Se connecter
                        </Button>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                my: 2.2,
                            }}
                        >
                            <Box
                                sx={{
                                    height: "1px",
                                    flex: 1,
                                    bgcolor: "#E1E6EE",
                                }}
                            />

                            <Typography
                                sx={{
                                    px: 2,

                                    color: "#9AA4B0",

                                    fontSize: "10px",
                                }}
                            >
                                ou
                            </Typography>

                            <Box
                                sx={{
                                    height: "1px",
                                    flex: 1,
                                    bgcolor: "#E1E6EE",
                                }}
                            />
                        </Box>

                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            sx={{
                                height: "48px",

                                bgcolor: "#F0F3F9",

                                color: "#101D4A",

                                border: "1px solid #DDE3EC",

                                textTransform: "none",

                                fontSize: "13px",
                                fontWeight: 600,

                                borderRadius: "9px",

                                "&:hover": {
                                    bgcolor: "#E7EBF3",
                                    borderColor: "#CDD5E2",
                                },
                            }}
                        >
                            + Créer un compte
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;