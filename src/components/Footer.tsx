import React, { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Container, Grid, Typography } from "@mui/material";

import { useStateContext } from '../context/StateContext';

export const Footer: FC = (): ReactElement => {
    const { state, dispatch } = useStateContext()
    const { t, i18n } = useTranslation(['main'])

    const [backgroundColor, setBackgroundcolor] = useState("#F0E1F6")

    useEffect(() => {
        setBackgroundcolor(state.route === "/" ? "#F0E1F6" : "white")
    }, [state.route])

    return (
        <Box
            sx={{
                width: "100%",
                height: "5.5rem",
                backgroundColor: `${backgroundColor}`,
                paddingTop: "1rem",
                paddingBottom: "1rem",
                borderTop: "1px solid",
                borderTopColor: "secondary.dark",
            }}
        >
            <Container maxWidth="xl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12} alignSelf="start">
                        <Typography color="textSecondary" sx={{ fontFamily: "Montserrat", fontSize: "12px" }}>
                            <a
                                style={{ color: "#2E2F38", textDecoration: "none" }}
                                target="_blank"
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