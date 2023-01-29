import React, { FC, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom"

import {
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { ReactComponent as EshLogo } from '../assets/esh.svg';
import useChangeColorsOnRoute from "../hooks/useChangeColorsOnRoute";
import LanguageSelector from "./LanguageSelector"

import { routes } from "../routes";

const Navbar: FC = (): ReactElement => {
    const location = useLocation()
    const { t } = useTranslation(['main'])
    const navigate = useNavigate()

    const [navbarColors, setNavbarColors] = useChangeColorsOnRoute()
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event: any) => {
        event.preventDefault()
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: any) => {
        event.preventDefault()
        setAnchorElNav(null);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                color: `${navbarColors.color}`,
                backgroundColor: `${navbarColors.backgroundColor}`,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                        }}>
                        <Box sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}>
                            <EshLogo
                                onClick={() => {
                                    navigate("/")
                                }}
                                stroke={location.pathname === "/" ? "#2E2F38" : "white"}
                                fill={location.pathname === "/" ? "#2E2F38" : "white"}
                            />
                        </Box>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routes.map((page) => (
                                page.visibility &&
                                <NavLink
                                    to={{ pathname: page.path }}
                                    style={{ textDecoration: "none", color: "#2E2F38" }}
                                    key={page.key}>
                                    <MenuItem>
                                        <Typography
                                            textAlign="center"
                                            sx={{ fontFamily: "Montserrat" }}
                                            variant="subtitle2">
                                            {t(page.title, { ns: ['main'] })}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, padding: "1rem" }}
                    >
                        <Box sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}>
                            <EshLogo
                                onClick={() => {
                                    navigate("/")
                                }}
                                stroke={location.pathname === "/" ? "#2E2F38" : "white"}
                                fill={location.pathname === "/" ? "#2E2F38" : "white"}
                            />
                        </Box>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            {routes.map((page) => (
                                page.visibility &&
                                <NavLink
                                    key={page.key}
                                    to={{ pathname: page.path }}
                                    style={{
                                        color: navbarColors.color,
                                        fontSize: "12px", fontFamily: "Montserrat",
                                        margin: "0 1rem",
                                        textDecoration: "none"
                                    }}>
                                    {t(page.title, { ns: ['main'] })}
                                </NavLink>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                        <LanguageSelector />
                    </Box>
                </Toolbar>
            </Container>
        </Box >
    );
};

export default Navbar;