import React, { FC, MouseEvent, ReactElement, useEffect, useState } from 'react'

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';

import LanguageIcon from '@mui/icons-material/Language';

import { ActionType } from '../store';
import { useStateContext } from '../context/StateContext';

interface LanguageType {
    title: string
    value: string
}

export const LanguageSelector: FC<any> = (): ReactElement => {
    const { state, dispatch } = useStateContext()

    const [anchor, setAnchor] = useState(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState(-1);
    const [color, setColor] = useState("black !important");

    const openMenu = (event: any) => {
        setAnchor(event.target);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const languages: Array<LanguageType> = [
        { title: "English", value: "en" },
        { title: "עברית", value: "he" }
    ]
    const open = Boolean(anchorEl);

    const onMenuItemClick = (event: any, index: number, lang: string) => {
        setAnchor(null);
        setSelected(index);
        dispatch({
            type: ActionType.SET_LANG,
            payload: lang
        })
    };

    useEffect(() => {
        setColor(state.route === "/" ? "black" : "white")
    }, [state.route])

    return (
        <div>
            <Box >
                <IconButton
                    id="lang-switch-button"
                    onClick={openMenu}
                >
                    <LanguageIcon sx={{ color }} />
                </IconButton>

                <Menu
                    open={Boolean(anchor)}
                    anchorEl={anchor}
                    onClose={closeMenu}
                    keepMounted
                    TransitionComponent={Slide}
                    PaperProps={{
                        style: {
                            maxHeight: 40 * 4,
                            width: "20ch",
                        },
                    }}
                >
                    {languages.map((lang: LanguageType, index) => (
                        <MenuItem
                            key={lang.value}
                            onClick={(event) => onMenuItemClick(event, index, lang.value)}
                            selected={index === selected}
                        >
                            {lang.title}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </div>
    );
}

export default LanguageSelector;