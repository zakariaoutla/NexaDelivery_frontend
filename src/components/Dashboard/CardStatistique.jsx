import {
    Box,
    Card,
    CardContent,
    Typography
} from "@mui/material";

export default function CardStatistique({
                                            total = 0,
                                            title,
                                            desc,
                                            icon
                                        }) {
    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                transition: "0.2s ease",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
                },
            }}
        >
            <CardContent
                sx={{
                    p: "22px !important",
                }}
            >


                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2.5,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: "13px",
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            flexShrink: 0,
                            bgcolor: "#FFF4EC",
                            color: "#FF6B00",
                            borderRadius: "10px",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            "& svg": {
                                fontSize: "22px",
                            },
                        }}
                    >
                        {icon}
                    </Box>
                </Box>



                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                        minWidth: 0,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "28px",
                                md: "32px",
                            },
                            lineHeight: 1,
                            fontWeight: 800,
                            color: "#0B1F3A",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {total}
                    </Typography>

                    {desc && (
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#64B981",
                                whiteSpace: "nowrap",
                            }}
                        >
                            / {desc}
                        </Typography>
                    )}
                </Box>

            </CardContent>
        </Card>
    );
}