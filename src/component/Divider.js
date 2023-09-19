import React from 'react';
import useMedia from "use-media";
import DividerMui from '@mui/material/Divider';

const Divider = (props) => {
    const isMobile = useMedia({ minWidth: "519px" });
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
    const isPc = useMedia({ minWidth: "960px" })

    return (
        <DividerMui variant="middle" style={{margin: isPc ? '20px 25%' : isTablet ? '20px 15%' : '20px 5%'}} />
    )
}

export default Divider;