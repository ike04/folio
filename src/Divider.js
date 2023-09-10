import React from 'react';
import useMedia from "use-media";
import DividerMui from '@mui/material/Divider';

const Divider = (props) => {
    const isWide = useMedia({ minWidth: "480px" });
    const PCStyle = {
        margin: '20px 25%'
    }

    const SPStyle = {
        margin: '20px 5%'
    }
    return (
        <DividerMui variant="middle" style={isWide ? PCStyle : SPStyle} />
    )
}

export default Divider;