import {
    useContext,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

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

import SearchRoundedIcon
    from "@mui/icons-material/SearchRounded";

import NotificationsNoneRoundedIcon
    from "@mui/icons-material/NotificationsNoneRounded";

import PersonOutlineRoundedIcon
    from "@mui/icons-material/PersonOutlineRounded";

import LogoutRoundedIcon
    from "@mui/icons-material/LogoutRounded";

import KeyboardArrowDownRoundedIcon
    from "@mui/icons-material/KeyboardArrowDownRounded";

import { AuthContext }
    from "../../Config/AuthContext.jsx";


const Topbar = () => {

    const {
        user,
        logout,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [
        anchorEl,
        setAnchorEl,
    ] = useState(null);

    const [
        notificationAnchor,
        setNotificationAnchor,
    ] = useState(null);

    const [
        search,
        setSearch,
    ] = useState("");


    const openUserMenu =
        Boolean(anchorEl);

    const openNotificationMenu =
        Boolean(notificationAnchor);


   const notificationCount = 3;

    const roleConfig = {

        MERCHANT: {
            label: "Commerçant",
            profilePath:
                "/merchant/profile",
            deliveriesPath:
                "/merchant/deliveries",
            searchPlaceholder:
                "Rechercher une livraison...",
            avatarFallback: "M",
        },

        DRIVER: {
            label: "Livreur",
            profilePath:
                "/driver/profile",
            deliveriesPath:
                "/driver/deliveries",
            searchPlaceholder:
                "Rechercher une livraison...",
            avatarFallback: "D",
        },

        ADMIN: {
            label: "Administrateur",
            profilePath:
                "/admin/profile",
            deliveriesPath:
                "/admin/deliveries",
            searchPlaceholder:
                "Rechercher...",
            avatarFallback: "A",
        },

    };


    const currentRole =
        roleConfig[user?.role] ||
        roleConfig.MERCHANT;


    const handleOpenUserMenu = (
        event
    ) => {

        setAnchorEl(
            event.currentTarget
        );
    };


    const handleCloseUserMenu = () => {

        setAnchorEl(null);
    };

    const handleOpenNotifications = (
        event
    ) => {

        setNotificationAnchor(
            event.currentTarget
        );
    };


    const handleCloseNotifications = () => {

        setNotificationAnchor(null);
    };

    const handleProfile = () => {

        handleCloseUserMenu();

        navigate(
            currentRole.profilePath
        );
    };

    const handleLogout = () => {

        handleCloseUserMenu();

        logout();
    };

    const handleSearch = (event) => {

        event.preventDefault();

        const searchValue =
            search.trim();

        if (!searchValue) {
            return;
        }

        navigate(
            `${currentRole.deliveriesPath}?search=${encodeURIComponent(
                searchValue
            )}`
        );
    };
    
    const avatarLetter =
        user?.nom
            ?.charAt(0)
            ?.toUpperCase() ||
        currentRole.avatarFallback;


    return (

        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",

                color: "#0B1F3A",

                borderBottom:
                    "1px solid #E5E7EB",

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
                    minHeight:
                        "72px !important",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    display: "flex",

                    alignItems:
                        "center",

                    gap: {
                        xs: 1,
                        sm: 2,
                    },
                }}
            >

                <Box
                    component="form"
                    onSubmit={
                        handleSearch
                    }
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },

                        alignItems:
                            "center",

                        width: {
                            sm: "280px",
                            md: "340px",
                            lg: "420px",
                        },

                        flexShrink: 0,

                        height: "42px",

                        bgcolor:
                            "#F7F9FC",

                        border:
                            "1px solid #E2E8F0",

                        borderRadius:
                            "10px",

                        px: 1.5,

                        transition:
                            "0.2s",

                        "&:focus-within": {
                            bgcolor:
                                "#FFFFFF",

                            borderColor:
                                "#FF6B00",

                            boxShadow:
                                "0 0 0 3px rgba(255,107,0,0.08)",
                        },
                    }}
                >

                    <SearchRoundedIcon
                        sx={{
                            color:
                                "#94A3B8",

                            fontSize:
                                "21px",

                            mr: 1,
                        }}
                    />

                    <InputBase
                        fullWidth
                        value={search}
                        onChange={(
                            event
                        ) =>
                            setSearch(
                                event
                                    .target
                                    .value
                            )
                        }
                        placeholder={
                            currentRole
                                .searchPlaceholder
                        }
                        sx={{
                            fontSize:
                                "13px",

                            color:
                                "#0B1F3A",

                            "& input::placeholder":
                                {
                                    color:
                                        "#94A3B8",

                                    opacity:
                                        1,
                                },
                        }}
                    />

                </Box>



                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            sm: "none",
                        },

                        alignItems:
                            "center",

                        flex: 1,

                        minWidth: 0,
                    }}
                >

                    <Box
                        component="img"
                        src="/loginexadeliveryBlack.png"
                        alt="NexaDelivery"
                        sx={{
                            width:
                                "170px",

                            height:
                                "auto",

                            maxHeight:
                                "60px",

                            objectFit:
                                "contain",

                            objectPosition:
                                "left center",

                            display:
                                "block",
                        }}
                    />

                </Box>



                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },

                        flex: 1,
                    }}
                />


                <Box
                    sx={{
                        display: "flex",

                        alignItems:
                            "center",

                        gap: {
                            xs: 1,
                            md: 1.5,
                        },

                        flexShrink: 0,
                    }}
                >


                    <IconButton
                        onClick={
                            handleOpenNotifications
                        }
                        sx={{
                            width: 40,

                            height: 40,

                            bgcolor:
                                "#F7F9FC",

                            border:
                                "1px solid #E5E7EB",

                            color:
                                "#475569",

                            "&:hover": {
                                bgcolor:
                                    "#FFF4EC",

                                color:
                                    "#FF6B00",

                                borderColor:
                                    "#FFD7BA",
                            },
                        }}
                    >

                        <Badge
                            badgeContent={
                                notificationCount
                            }
                            color="error"
                            max={9}
                        >

                            <NotificationsNoneRoundedIcon
                                sx={{
                                    fontSize:
                                        "21px",
                                }}
                            />

                        </Badge>

                    </IconButton>



                    <Box
                        onClick={
                            handleOpenUserMenu
                        }
                        sx={{
                            display: "flex",

                            alignItems:
                                "center",

                            gap: 1,

                            cursor:
                                "pointer",

                            px: {
                                xs: 0,
                                md: 1,
                            },

                            py: 0.4,

                            borderRadius:
                                "10px",

                            transition:
                                "0.2s",

                            "&:hover": {
                                bgcolor:
                                    "#F7F9FC",
                            },
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 38,

                                height: 38,

                                bgcolor:
                                    "#FF6B00",

                                color:
                                    "#FFFFFF",

                                fontSize:
                                    "15px",

                                fontWeight:
                                    700,
                            }}
                        >
                            {avatarLetter}
                        </Avatar>


                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block",
                                },

                                minWidth:
                                    "80px",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize:
                                        "13px",

                                    fontWeight:
                                        700,

                                    lineHeight:
                                        1.2,

                                    color:
                                        "#0B1F3A",
                                }}
                            >
                                {user?.nom ||
                                    currentRole.label}
                            </Typography>


                            <Typography
                                sx={{
                                    fontSize:
                                        "10px",

                                    color:
                                        "#94A3B8",

                                    mt: 0.2,
                                }}
                            >
                                {
                                    currentRole.label
                                }
                            </Typography>

                        </Box>


                        <KeyboardArrowDownRoundedIcon
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block",
                                },

                                fontSize:
                                    "18px",

                                color:
                                    "#64748B",
                            }}
                        />

                    </Box>

                </Box>


                <Menu
                    anchorEl={
                        notificationAnchor
                    }
                    open={
                        openNotificationMenu
                    }
                    onClose={
                        handleCloseNotifications
                    }
                    anchorOrigin={{
                        vertical:
                            "bottom",

                        horizontal:
                            "right",
                    }}
                    transformOrigin={{
                        vertical:
                            "top",

                        horizontal:
                            "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,

                                width: {
                                    xs:
                                        "300px",
                                    sm:
                                        "340px",
                                },

                                maxWidth:
                                    "calc(100vw - 24px)",

                                borderRadius:
                                    "12px",

                                border:
                                    "1px solid #E5E7EB",

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

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize:
                                    "14px",

                                fontWeight:
                                    700,

                                color:
                                    "#0B1F3A",
                            }}
                        >
                            Notifications
                        </Typography>


                        {notificationCount >
                            0 && (

                                <Typography
                                    sx={{
                                        fontSize:
                                            "11px",

                                        color:
                                            "#FF6B00",

                                        fontWeight:
                                            600,
                                    }}
                                >
                                    {
                                        notificationCount
                                    }{" "}
                                    nouvelles
                                </Typography>

                            )}

                    </Box>


                    <Divider />


                    <Box
                        sx={{
                            px: 2,

                            py: 3,

                            textAlign:
                                "center",
                        }}
                    >

                        <NotificationsNoneRoundedIcon
                            sx={{
                                fontSize:
                                    "32px",

                                color:
                                    "#CBD5E1",

                                mb: 1,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize:
                                    "12px",

                                color:
                                    "#94A3B8",
                            }}
                        >
                            Les notifications
                            apparaîtront ici
                        </Typography>

                    </Box>

                </Menu>


                <Menu
                    anchorEl={
                        anchorEl
                    }
                    open={
                        openUserMenu
                    }
                    onClose={
                        handleCloseUserMenu
                    }
                    anchorOrigin={{
                        vertical:
                            "bottom",

                        horizontal:
                            "right",
                    }}
                    transformOrigin={{
                        vertical:
                            "top",

                        horizontal:
                            "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,

                                minWidth:
                                    "200px",

                                borderRadius:
                                    "12px",

                                border:
                                    "1px solid #E5E7EB",

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
                                fontSize:
                                    "13px",

                                fontWeight:
                                    700,

                                color:
                                    "#0B1F3A",
                            }}
                        >
                            {user?.nom ||
                                currentRole.label}
                        </Typography>


                        <Typography
                            sx={{
                                fontSize:
                                    "11px",

                                color:
                                    "#94A3B8",

                                mt: 0.2,
                            }}
                        >
                            {
                                currentRole.label
                            }
                        </Typography>

                    </Box>


                    <Divider />



                    <MenuItem
                        onClick={
                            handleProfile
                        }
                        sx={{
                            py: 1.2,

                            fontSize:
                                "13px",

                            color:
                                "#334155",
                        }}
                    >

                        <ListItemIcon>

                            <PersonOutlineRoundedIcon
                                sx={{
                                    fontSize:
                                        "19px",

                                    color:
                                        "#64748B",
                                }}
                            />

                        </ListItemIcon>

                        Mon profil

                    </MenuItem>



                    <MenuItem
                        onClick={
                            handleLogout
                        }
                        sx={{
                            py: 1.2,

                            fontSize:
                                "13px",

                            color:
                                "#DC2626",

                            "&:hover": {
                                bgcolor:
                                    "#FEF2F2",
                            },
                        }}
                    >

                        <ListItemIcon>

                            <LogoutRoundedIcon
                                sx={{
                                    fontSize:
                                        "19px",

                                    color:
                                        "#DC2626",
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