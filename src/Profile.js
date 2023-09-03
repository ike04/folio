import { style } from '@mui/system';
import * as React from 'react';

export default function BasicTimeline() {
    const snsIconStyle = {
        width: '30px',
        height: '30px',
        padding: '5%',
    }

    return (
        <div style={{ textAlign: 'center', border: 'solid', borderColor: '#d3d3d3', margin: '20px 35%', boxShadow: '10px 10px 15px -10px', borderRadius: '10px' }}>
            <img style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                padding: '10px'
            }} src={`${process.env.PUBLIC_URL}/profile.jpg`} alt="Profile" />

            <h3>Issei Ikeda</h3>
            <h4>Android Engineer</h4>
            <div style={{ display: 'block', padding: '0px 30% 0px 30%' }}>
                <a href="https://github.com/ike04"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/github-mark.png`} alt="" /></a>
                <a href="https://twitter.com/ike_pikmin"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/twitter.png`} alt="" /></a>
                <a href="https://qiita.com/ike04"><img style={snsIconStyle} src={`${process.env.PUBLIC_URL}/qiita.png`} alt="" /></a>
            </div>

        </div >
    )
}