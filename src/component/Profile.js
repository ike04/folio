import { style } from '@mui/system';
import * as React from 'react';
import useMedia from "use-media";

export default function BasicTimeline() {
    const isWide = useMedia({ minWidth: "480px" });
    const snsIconStyle = {
        width: '30px',
        height: '30px',
        padding: '5%',
    }
    const divPCStyle = {
        textAlign: 'center',
        border: 'solid',
        borderColor: '#d3d3d3',
        margin: '20px 25%',
        boxShadow: '10px 10px 15px -10px',
        borderRadius: '10px'
    }

    const divSPStyle = {
        textAlign: 'center',
        border: 'solid',
        borderColor: '#d3d3d3',
        margin: '20px 5%',
        boxShadow: '10px 10px 15px -10px',
        borderRadius: '10px'
    }

    const iconDivPCPadding = { display: 'block', padding: '0px 30% 0px 30%' };
    const iconDivSPPadding = { display: 'block', padding: '0px 20% 0px 20%' };

    return (
        <div style={isWide ? divPCStyle : divSPStyle}>
            <img style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                padding: '10px'
            }} src={`${process.env.PUBLIC_URL}/profile.png`} alt="Profile" />

            <h3>Issei Ikeda</h3>
            <h4>Android Engineer</h4>
            <div style={isWide ? iconDivPCPadding : iconDivSPPadding}>
                <a href="https://github.com/ike04"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/github-mark.png`} alt="" /></a>
                <a href="https://twitter.com/ike_pikmin"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/twitter.png`} alt="" /></a>
                <a href="https://qiita.com/ike04"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/qiita.png`} alt="" /></a>
            </div>

        </div >
    )
}