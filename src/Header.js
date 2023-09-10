import React from 'react';
import useMedia from "use-media";

const Header = (props) => {
    const isWide = useMedia({ minWidth: "480px" });
    const PCStyle = {
        margin: '20px 25%'
    }

    const SPStyle = {
        margin: '20px 5%'
    }
    return (
        <h2 style={isWide ? PCStyle : SPStyle}>{props.title}</h2>
    )
}

export default Header;