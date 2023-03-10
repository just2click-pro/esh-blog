import React, { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Button, ButtonGroup, Container, Grid, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from "@mui/material/styles"

import { topBoxStyle, outlinedInputStyle } from "../common/styling"
import { useStateContext } from '../context/StateContext';

const FeedbackButton = styled(Button)((props) => ({
    backgroundColor: '#BB2649',
    color: 'white',
    '&:hover': {
        backgroundColor: '#BB2649',
        color: 'white',
    },
    fontFamily: "Montserrat",
    fontSize: "12px",
    margin: "2rem 0 1rem",
    height: "3.3rem"
}))

const titleStyle = { fontFamily: "Montserrat", fontSize: "16px", fontWeight: "500", }

export const FeedbackBox: FC = (): ReactElement => {
    const { state } = useStateContext()
    const { t } = useTranslation(['main'])
    const [right, setRight] = useState("0")
    const [left, setLeft] = useState("none")

    const getPlaceholder = (): string => {
        return t("feedback.placeholder", { ns: ['main'] }) || ""
    }

    useEffect(() => {
        setLeft(state.lang === 'he' ? "0" : "none")
        setRight(state.lang !== 'he' ? "0" : "none")
    }, [state.lang])

    return (
        <Box
            sx={topBoxStyle}
            component="form" noValidate autoComplete="off"
        >
            <FormControl>
                <Container maxWidth="sm" sx={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography color="textMain"
                                sx={titleStyle}>
                                {t("feedback.title", { ns: ['main'] })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ButtonGroup sx={{ display: 'flex', gap: 0, position: "relative" }}>
                                <OutlinedInput
                                    placeholder={getPlaceholder()}
                                    sx={outlinedInputStyle} />
                                <Box sx={{ position: "absolute", right: { right }, left: { left } }}>
                                    <FeedbackButton>
                                        {t("feedback.submit", { ns: ['main'] })}
                                    </FeedbackButton>
                                </Box>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography color="textSecondary" sx={{ fontFamily: "Montserrat", fontSize: "11px" }}>
                                {t("feedback.notification", { ns: ['main'] })}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </FormControl>
        </Box >
    );
};

export default FeedbackBox;