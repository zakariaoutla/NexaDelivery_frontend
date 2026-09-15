import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Badge,
    InputBase,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { AuthContext } from "../../Config/AuthContext.jsx";

const Topbar = () => {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);
    const [search, setSearch] = useState("");

    const openUserMenu = Boolean(anchorEl);
    const openNotificationMenu = Boolean(notificationAnchor);

    // temporaire
    const notificationCount = 3;

    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenNotifications = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setNotificationAnchor(null);
    };

    const handleProfile = () => {
        handleCloseUserMenu();
        navigate("/merchant/profile");
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        navigate(
            `/merchant/deliveries?search=${encodeURIComponent(search.trim())}`
        );
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                color: "#0B1F3A",

                borderBottom: "1px solid #E5E7EB",

                width: {
                    xs: "100%",
                    md: "calc(100% - 260px)",
                },

                ml: {
                    xs: 0,
                    md: "260px",
                },

                zIndex: 1100,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "72px !important",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    gap: 2,
                }}
            >

                {/* ================= SEARCH DESKTOP ================= */}

                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },

                        alignItems: "center",

                        width: {
                            sm: "300px",
                            md: "360px",
                            lg: "420px",
                        },

                        height: "42px",

                        bgcolor: "#F7F9FC",

                        border: "1px solid #E2E8F0",
                        borderRadius: "10px",

                        px: 1.5,

                        transition: "0.2s",

                        "&:focus-within": {
                            bgcolor: "#FFFFFF",
                            borderColor: "#FF6B00",
                            boxShadow: "0 0 0 3px rgba(255,107,0,0.08)",
                        },
                    }}
                >
                    <SearchRoundedIcon
                        sx={{
                            color: "#94A3B8",
                            fontSize: "21px",
                            mr: 1,
                        }}
                    />

                    <InputBase
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher une livraison..."
                        sx={{
                            fontSize: "13px",
                            color: "#0B1F3A",

                            "& input::placeholder": {
                                color: "#94A3B8",
                                opacity: 1,
                            },
                        }}
                    />
                </Box>


                {/* ================= MOBILE TITLE ================= */}

                <Box
                    sx={{
                        display: {
                            xs: "block",
                            sm: "none",
                        },

                        flex: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#0B1F3A",
                        }}
                    >
                        Bonjour {user?.nom || ""}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "10px",
                            color: "#94A3B8",
                        }}
                    >
                        Espace commerçant
                    </Typography>
                </Box>


                {/* pousse les actions à droite */}

                <Box sx={{ flex: 1 }} />


                {/* ================= NOTIFICATIONS ================= */}

                <IconButton
                    onClick={handleOpenNotifications}
                    sx={{
                        width: 40,
                        height: 40,

                        bgcolor: "#F7F9FC",
                        border: "1px solid #E5E7EB",

                        color: "#475569",

                        "&:hover": {
                            bgcolor: "#FFF4EC",
                            color: "#FF6B00",
                            borderColor: "#FFD7BA",
                        },
                    }}
                >
                    <Badge
                        badgeContent={notificationCount}
                        color="error"
                        max={9}
                    >
                        <NotificationsNoneRoundedIcon
                            sx={{
                                fontSize: "21px",
                            }}
                        />
                    </Badge>
                </IconButton>


                {/* ================= USER ================= */}

                <Box
                    onClick={handleOpenUserMenu}
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: 1,

                        cursor: "pointer",

                        pl: {
                            xs: 0,
                            sm: 0.5,
                        },

                        pr: {
                            xs: 0,
                            sm: 1,
                        },

                        py: 0.4,

                        borderRadius: "10px",

                        "&:hover": {
                            bgcolor: "#F7F9FC",
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 38,
                            height: 38,

                            bgcolor: "#FF6B00",
                            color: "#FFFFFF",

                            fontSize: "15px",
                            fontWeight: 700,
                        }}
                    >
                        {user?.nom?.charAt(0)?.toUpperCase() || "M"}
                    </Avatar>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: 700,
                                lineHeight: 1.2,
                                color: "#0B1F3A",
                            }}
                        >
                            {user?.nom || "Merchant"}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "10px",
                                color: "#94A3B8",
                            }}
                        >
                            Commerçant
                        </Typography>
                    </Box>

                    <KeyboardArrowDownRoundedIcon
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },

                            fontSize: "18px",
                            color: "#64748B",
                        }}
                    />
                </Box>


                {/* ================= NOTIFICATION MENU ================= */}

                <Menu
                    anchorEl={notificationAnchor}
                    open={openNotificationMenu}
                    onClose={handleCloseNotifications}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                width: {
                                    xs: "300px",
                                    sm: "340px",
                                },
                                maxWidth: "calc(100vw - 24px)",
                                borderRadius: "12px",
                                border: "1px solid #E5E7EB",
                                boxShadow:
                                    "0 12px 35px rgba(15,23,42,0.12)",
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            Notifications
                        </Typography>
                    </Box>

                    <Divider />

                    {/* TEMPORAIRE */}
                    <Box
                        sx={{
                            px: 2,
                            py: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "12px",
                                color: "#94A3B8",
                            }}
                        >
                            Les notifications apparaîtront ici
                        </Typography>
                    </Box>
                </Menu>


                {/* ================= USER MENU ================= */}

                <Menu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                minWidth: "190px",
                                borderRadius: "12px",
                                border: "1px solid #E5E7EB",
                                boxShadow:
                                    "0 10px 30px rgba(15,23,42,0.12)",
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#0B1F3A",
                            }}
                        >
                            {user?.nom || "Merchant"}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "11px",
                                color: "#94A3B8",
                            }}
                        >
                            Commerçant
                        </Typography>
                    </Box>

                    <Divider />

                    <MenuItem
                        onClick={handleProfile}
                        sx={{
                            py: 1.2,
                            fontSize: "13px",
                        }}
                    >
                        <ListItemIcon>
                            <PersonOutlineRoundedIcon
                                sx={{
                                    fontSize: "19px",
                                }}
                            />
                        </ListItemIcon>

                        Mon profil
                    </MenuItem>

                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            py: 1.2,
                            fontSize: "13px",
                            color: "#DC2626",
                        }}
                    >
                        <ListItemIcon>
                            <LogoutRoundedIcon
                                sx={{
                                    fontSize: "19px",
                                    color: "#DC2626",
                                }}
                            />
                        </ListItemIcon>

                        Déconnexion
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
};

export default Topbar;