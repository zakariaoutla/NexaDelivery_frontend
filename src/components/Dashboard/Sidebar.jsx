import { useContext } from "react";
import {
    NavLink,
    useLocation,
} from "react-router-dom";

import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";

import DashboardOutlinedIcon
    from "@mui/icons-material/DashboardOutlined";

import AddBoxOutlinedIcon
    from "@mui/icons-material/AddBoxOutlined";

import LocalShippingOutlinedIcon
    from "@mui/icons-material/LocalShippingOutlined";

import { AuthContext }
    from "../../Config/AuthContext.jsx";


const merchantMenu = [
    {
        label: "Tableau de bord",
        mobileLabel: "Accueil",
        path: "/merchant",
        icon: <DashboardOutlinedIcon />,
        end: true,
    },
    {
        label: "Créer une livraison",
        mobileLabel: "Créer",
        path: "/merchant/deliveries/create",
        icon: <AddBoxOutlinedIcon />,
    },
    {
        label: "Mes livraisons",
        mobileLabel: "Livraisons",
        path: "/merchant/deliveries",
        icon: <LocalShippingOutlinedIcon />,
    },
];


const driverMenu = [
    {
        label: "Tableau de bord",
        mobileLabel: "Accueil",
        path: "/driver",
        icon: <DashboardOutlinedIcon />,
        end: true,
    },
    {
        label: "Mes livraisons",
        mobileLabel: "Livraisons",
        path: "/driver/deliveries",
        icon: <LocalShippingOutlinedIcon />,
    },
];


const Sidebar = () => {

    const location = useLocation();

    const { user } =
        useContext(AuthContext);


    const getMenuItems = () => {

        switch (user?.role) {

            case "MERCHANT":
                return merchantMenu;

            case "DRIVER":
                return driverMenu;

            default:
                return [];
        }
    };


    const menuItems =
        getMenuItems();


    return (
        <>


            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },

                    position: "fixed",

                    top: 0,
                    left: 0,

                    width: "260px",
                    height: "100vh",

                    boxSizing: "border-box",

                    bgcolor: "#0B1F3A",
                    color: "#FFFFFF",

                    flexDirection: "column",

                    px: 2,
                    py: 3,

                    zIndex: 1200,
                }}
            >


                <Box
                    component="img"
                    src="/logonexadelivry.png"
                    alt="NexaDelivery"
                    sx={{
                        width: "190px",
                        height: "auto",
                        objectFit: "contain",
                        mb: 4,
                    }}
                />



                <List
                    sx={{
                        p: 0,
                    }}
                >

                    {menuItems.map(
                        (item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                style={{
                                    textDecoration:
                                        "none",

                                    color:
                                        "inherit",
                                }}
                            >

                                {({
                                      isActive,
                                  }) => (

                                    <ListItemButton
                                        sx={{
                                            mb: 0.8,

                                            borderRadius:
                                                "10px",

                                            bgcolor:
                                                isActive
                                                    ? "rgba(255,107,0,0.15)"
                                                    : "transparent",

                                            color:
                                                isActive
                                                    ? "#FF6B00"
                                                    : "#CBD5E1",

                                            transition:
                                                "0.2s",

                                            "&:hover": {
                                                bgcolor:
                                                    isActive
                                                        ? "rgba(255,107,0,0.20)"
                                                        : "rgba(255,255,255,0.06)",

                                                color:
                                                    isActive
                                                        ? "#FF6B00"
                                                        : "#FFFFFF",
                                            },
                                        }}
                                    >

                                        <ListItemIcon
                                            sx={{
                                                minWidth:
                                                    "40px",

                                                color:
                                                    "inherit",
                                            }}
                                        >
                                            {
                                                item.icon
                                            }
                                        </ListItemIcon>


                                        <ListItemText
                                            primary={
                                                item.label
                                            }
                                            primaryTypographyProps={{
                                                fontSize:
                                                    "14px",

                                                fontWeight:
                                                    isActive
                                                        ? 700
                                                        : 500,
                                            }}
                                        />

                                    </ListItemButton>

                                )}

                            </NavLink>

                        )
                    )}

                </List>

            </Box>



            <BottomNavigation
                value={location.pathname}
                showLabels
                sx={{
                    display: {
                        xs: "flex",
                        md: "none",
                    },

                    position: "fixed",

                    bottom: 0,
                    left: 0,
                    right: 0,

                    width: "100%",
                    height: "68px",

                    boxSizing: "border-box",

                    bgcolor: "#FFFFFF",

                    borderTop:
                        "1px solid #E5E7EB",

                    boxShadow:
                        "0 -4px 20px rgba(15,23,42,0.08)",

                    zIndex: 1300,

                    "& .MuiBottomNavigationAction-root":
                        {
                            color:
                                "#94A3B8",

                            minWidth: 0,

                            px: 0.5,
                        },

                    "& .MuiBottomNavigationAction-root.Mui-selected":
                        {
                            color:
                                "#FF6B00",
                        },

                    "& .MuiBottomNavigationAction-label":
                        {
                            fontSize:
                                "10px",
                        },

                    "& .MuiBottomNavigationAction-label.Mui-selected":
                        {
                            fontSize:
                                "10px",

                            fontWeight:
                                700,
                        },

                    "& .MuiSvgIcon-root":
                        {
                            fontSize:
                                "22px",
                        },
                }}
            >

                {menuItems.map(
                    (item) => (

                        <BottomNavigationAction
                            key={item.path}
                            component={
                                NavLink
                            }
                            to={item.path}
                            value={
                                item.path
                            }
                            label={
                                item.mobileLabel
                            }
                            icon={
                                item.icon
                            }
                        />

                    )
                )}

            </BottomNavigation>

        </>
    );
};

export default Sidebar;