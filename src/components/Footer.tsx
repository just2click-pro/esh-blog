import React, { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
    const location = useLocation()
    const { t } = useTranslation(['main'])

    const [backgroundColor, setBackgroundcolor] = useState("#F0E1F6")

    useEffect(() => {
        setBackgroundcolor(location.pathname === "/" ? "#F0E1F6" : "white")
    }, [location.pathname, location])

    const footerCommonStyle = () => {
        return {
            width: "100vw",
            height: "5.5rem",
            padding: "1rem",
            borderTop: "1px solid",
            borderTopColor: "secondary.dark",
            backgroundColor: `${backgroundColor}`
        }
    }

    return (
        <Box sx={footerCommonStyle}>
            <Container maxWidth="xl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12} alignSelf="start">
                        <Typography color="textSecondary" sx={{ fontFamily: "Montserrat", fontSize: "12px" }}>
                            <a
                                style={{ color: "#2E2F38", textDecoration: "none" }}
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.esh.com/accessibility-statement">
                                {t("footer.accessibility", { ns: ['main'] })}
                            </a>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" sx={{ fontFamily: "Montserrat", fontSize: "11px" }}>
                            esh is a registered trademark of esh Org Ltd. and its affiliates.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;