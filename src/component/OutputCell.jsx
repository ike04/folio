import React, { useState } from 'react';
import useMedia from "use-media";
import Grid from '@mui/material/Unstable_Grid2';

const OutputCell = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { title, image, url, date } = props;

    const isMobile = useMedia({ minWidth: "519px" });

    const textStyle = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '15px',
        color: '#2d3748',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '1.4',
        flex: 1,
    }

    const dateStyle = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        color: '#718096',
        fontSize: '13px',
        marginTop: '10px',
        fontWeight: '500',
    }

    const imageStyle = {
        width: '100%',
        height: 'auto',
        maxHeight: '250px',
        objectFit: 'contain',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        display: 'block',
    }

    const imageContainerStyle = {
        overflow: 'hidden',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        backgroundColor: '#f7fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '180px',
        padding: '20px',
    }

    const outputStyle = {
        textAlign: 'center',
        border: 'none',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        margin: '0',
        boxShadow: isHovered
            ? '0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(102, 126, 234, 0.5)'
            : '0 20px 50px rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '100%' : 'fit-content',
        minWidth: isMobile ? '100%' : '300px',
        maxWidth: isMobile ? '100%' : '400px',
    }

    const handleClick = () => {
        window.open(url, '_blank');
        if (window.gtag) {
            window.gtag("event", "techblog", {
                event_category: "click",
                event_label: "output",
            });
        }
    };

    const cardContent = (
        <>
            <div style={imageContainerStyle}>
                <img src={`${process.env.PUBLIC_URL}/${image}`} style={imageStyle} alt={title} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={textStyle}>{title}</h3>
                <p style={dateStyle}>{date}</p>
            </div>
        </>
    );

    return (
        <Grid xs={12} sm={6} md={4}>
            <div
                style={outputStyle}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleClick();
                    }
                }}
            >
                {cardContent}
            </div>
        </Grid>
    );
}

export default OutputCell;
