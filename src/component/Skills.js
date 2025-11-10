import React from 'react';
import useMedia from "use-media";
import Data from '../json/skills.json';

const Skills = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef(null);
    const isPc = useMedia({ minWidth: "960px" });
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const containerStyle = {
        margin: '0 auto',
        maxWidth: isPc ? '1000px' : '100%',
        padding: isPc ? '0 40px' : isTablet ? '0 30px' : '0 20px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isPc ? 'repeat(auto-fit, minmax(140px, 1fr))' : isTablet ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
        gap: isPc ? '30px' : '20px',
        padding: '20px 0',
    };

    const skillCardStyle = (isHovered) => ({
        background: isHovered
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(30px)',
        borderRadius: '24px',
        padding: isPc ? '35px' : '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-12px) scale(1.06)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
            ? '0 40px 100px rgba(102, 126, 234, 0.4), 0 0 0 2px rgba(102, 126, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            : '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        position: 'relative',
        overflow: 'hidden',
    });

    const iconStyle = (isHovered) => ({
        width: isPc ? '80px' : '60px',
        height: isPc ? '80px' : '60px',
        objectFit: 'contain',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: isHovered ? 'drop-shadow(0 8px 20px rgba(102, 126, 234, 0.4))' : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1))',
        transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    });

    const labelStyle = {
        fontSize: isPc ? '18px' : '16px',
        fontWeight: '600',
        color: '#2d3748',
        textAlign: 'center',
        margin: 0,
    };

    const categoryBadgeStyle = {
        fontSize: '12px',
        fontWeight: '500',
        color: '#667eea',
        background: 'rgba(102, 126, 234, 0.1)',
        padding: '4px 12px',
        borderRadius: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    };

    return (
        <div ref={sectionRef} style={containerStyle}>
            <div style={gridStyle}>
                {Data.skills.map((skill, index) => {
                    const isHovered = hoveredIndex === index;
                    return (
                        <div
                            key={index}
                            style={skillCardStyle(isHovered)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/${skill.icon}`}
                                alt={skill.name}
                                style={iconStyle(isHovered)}
                            />
                            <p style={labelStyle}>{skill.name}</p>
                            <span style={categoryBadgeStyle}>{skill.category}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Skills;
