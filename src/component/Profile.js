import { style } from '@mui/system';
import * as React from 'react';
import useMedia from "use-media";

export default function BasicTimeline() {
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
    const isPc = useMedia({ minWidth: "960px" })

    const heroStyle = {
        minHeight: isPc ? '70vh' : '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: isPc ? '80px 20px' : '60px 20px',
        animation: 'fadeInUp 1s ease-out',
        position: 'relative',
    }

    const profileImageContainerStyle = {
        position: 'relative',
        marginBottom: '30px',
    }

    const snsIconStyle = {
        width: '44px',
        height: '44px',
        margin: '0 12px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '8px',
    }

    const snsIconHoverStyle = {
        transform: 'translateY(-8px) scale(1.15)',
        filter: 'drop-shadow(0 12px 20px rgba(102, 126, 234, 0.5))',
        background: 'white',
    }

    const iconDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 0',
        gap: '8px',
        marginTop: '10px',
    }

    const badgeStyle = {
        display: 'inline-block',
        padding: '8px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#667eea',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        animation: 'fadeInUp 1.2s ease-out',
    };

    const click = (tag) => {
        window.gtag("event", tag, {
            event_category: "click",
            event_label: "profile",
        });
    };

    const [hoveredIcon, setHoveredIcon] = React.useState(null);

    return (
        <section id="Profile" style={heroStyle}>
            <div style={badgeStyle}>
                Portfolio
            </div>

            <div style={profileImageContainerStyle}>
                <img style={{
                    width: isPc ? '160px' : '130px',
                    height: isPc ? '160px' : '130px',
                    borderRadius: '50%',
                    padding: '6px',
                    border: '5px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
                    animation: 'glow 3s ease-in-out infinite, float 3s ease-in-out infinite',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                }} src={`${process.env.PUBLIC_URL}/profile.png`} alt="Profile" />
            </div>

            <h1 style={{
                fontSize: isPc ? '56px' : '40px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '15px',
                letterSpacing: '-1px',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                lineHeight: '1.2',
            }}>Issei Ikeda</h1>

            <p style={{
                fontSize: isPc ? '24px' : '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '400',
                marginBottom: '40px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}>Software Engineer</p>

            <div style={iconDivStyle}>
                <a href="https://github.com/ike04"
                   onClick={() => click("github")}
                   onMouseEnter={() => setHoveredIcon('github')}
                   onMouseLeave={() => setHoveredIcon(null)}>
                    <img style={{
                        ...snsIconStyle,
                        ...(hoveredIcon === 'github' ? snsIconHoverStyle : {})
                    }} src={`${process.env.PUBLIC_URL}/github-mark.png`} alt="GitHub" />
                </a>
                <a href="https://twitter.com/ike_pikmin"
                   onClick={() => click("twitter")}
                   onMouseEnter={() => setHoveredIcon('twitter')}
                   onMouseLeave={() => setHoveredIcon(null)}>
                    <img style={{
                        ...snsIconStyle,
                        ...(hoveredIcon === 'twitter' ? snsIconHoverStyle : {})
                    }} src={`${process.env.PUBLIC_URL}/twitter.png`} alt="Twitter" />
                </a>
                <a href="https://qiita.com/ike04"
                   onClick={() => click("qiita")}
                   onMouseEnter={() => setHoveredIcon('qiita')}
                   onMouseLeave={() => setHoveredIcon(null)}>
                    <img style={{
                        ...snsIconStyle,
                        ...(hoveredIcon === 'qiita' ? snsIconHoverStyle : {})
                    }} src={`${process.env.PUBLIC_URL}/qiita.png`} alt="Qiita" />
                </a>
            </div>
        </section>
    )
}