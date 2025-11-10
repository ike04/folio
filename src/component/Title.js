import React from 'react';
import useMedia from "use-media";

const Title = (props) => {
    const isMobile = useMedia({ minWidth: "519px" });
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
    const isPc = useMedia({ minWidth: "960px" })

    const containerStyle = {
        margin: isPc ? '100px auto 60px' : isTablet ? '80px auto 50px' : '60px auto 40px',
        textAlign: 'center',
        padding: '0 20px',
        maxWidth: '1200px',
    }

    const badgeStyle = {
        display: 'inline-block',
        padding: '6px 16px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '15px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    }

    const style = {
        fontSize: isPc ? '48px' : '36px',
        fontWeight: '800',
        textAlign: 'center',
        color: 'white',
        textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        letterSpacing: '-1px',
        marginBottom: '60px',
    }

    const underlineStyle = {
        width: '60px',
        height: '4px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
        margin: '20px auto 0',
        borderRadius: '2px',
        boxShadow: '0 2px 10px rgba(255, 255, 255, 0.4)',
    }

    return (
        <section id={props.title} style={containerStyle}>
            <div style={badgeStyle}>
                {props.title}
            </div>
            <h2 style={style}>
                {props.title === 'Skills' && 'Tech Stack'}
                {props.title === 'Career' && 'Timeline'}
                {props.title === 'Outputs' && 'Featured Work'}
                <div style={underlineStyle}></div>
            </h2>
        </section>
    )
}

export default Title;