import { useEffect, useState, useRef, useCallback } from 'react';
import './index.css';
import ReactGA from 'react-ga4';
import useMedia from "use-media";
import WritingsData from './json/officialOutput.json';
import ProjectsData from './json/projects.json';

// Custom hook for Intersection Observer with performance optimizations
const useIntersectionObserver = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    const handleIntersection = useCallback(([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
        }
    }, [hasAnimated]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [handleIntersection, options.threshold, options.rootMargin]);

    return [ref, isVisible];
};

// Animated Section Wrapper Component for grid layout
const AnimatedSection = ({ children, gridStyle }) => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px',
    });

    return (
        <div
            ref={ref}
            className={`scroll-fade-section ${isVisible ? 'is-visible' : ''}`}
            style={{
                ...gridStyle,
                marginBottom: '8px',
            }}
        >
            {children}
        </div>
    );
};

// Bento Card Component
const BentoCard = ({ children, colSpan = 1, rowSpan = 1, href, onClick, style = {}, hoverScale = true }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        background: '#ffffff',
        borderRadius: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: href || onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        transform: isHovered && hoverScale ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.08)'
            : '0 1px 3px rgba(0, 0, 0, 0.04)',
        ...style,
    };

    const handleClick = () => {
        if (onClick) onClick();
        if (href) window.open(href, '_blank');
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

// Profile Sidebar Component (Sticky)
const ProfileSidebar = ({ isPc }) => {
    const sidebarStyle = {
        width: isPc ? '240px' : '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isPc ? 'flex-start' : 'center',
        padding: isPc ? '60px 0 40px 0' : '30px 20px',
        position: isPc ? 'sticky' : 'relative',
        top: isPc ? '40px' : '0',
        alignSelf: 'flex-start',
        height: 'fit-content',
    };

    const profileImageStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '28px',
        background: '#e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '12px',
    };

    const nameStyle = {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '20px',
        letterSpacing: '-0.5px',
    };

    const jobStyle = {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        lineHeight: '1.4',
    };

    return (
        <aside style={sidebarStyle}>
            <img
                src={`${process.env.PUBLIC_URL}/me/sns_icon.jpg`}
                alt="Profile"
                style={profileImageStyle}
            />
            <h1 style={nameStyle}>Issei Ikeda</h1>
            <p style={jobStyle}>
                <span>📱</span>
                Mobile App Engineer | iOS / Android
            </p>
            <p style={jobStyle}>
                <span>💻</span>
                Flutter, Kotlin, Java
            </p>
            <p style={jobStyle}>
                <span>📍</span>
                Tokyo
            </p>
        </aside>
    );
};

// Twitter Card Component with dynamic bio fetching
const TwitterCard = ({ isMobile, username = 'ike_pikmin' }) => {
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTwitterBio = async () => {
            const cacheKey = `twitter_bio_${username}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 24 * 60 * 60 * 1000) { // 24 hour cache
                    setBio(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await fetch(`https://api.microlink.io?url=https://twitter.com/${username}`);
                const data = await response.json();

                if (data.status === 'success' && data.data?.description) {
                    setBio(data.data.description);
                    localStorage.setItem(cacheKey, JSON.stringify({
                        data: data.data.description,
                        timestamp: Date.now()
                    }));
                }
            } catch (error) {
                console.log('Failed to fetch Twitter bio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTwitterBio();
    }, [username]);

    return (
        <BentoCard
            colSpan={isMobile ? 2 : 2}
            href={`https://twitter.com/${username}`}
            style={{ background: '#1DA1F2', color: '#fff', padding: '20px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span style={{
                    background: '#fff',
                    color: '#1DA1F2',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                }}>Follow</span>
            </div>
            <div style={{ marginTop: '16px' }}>
                <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '2px' }}>Twitter</p>
                <p style={{ opacity: 0.85, fontSize: '13px' }}>@{username}</p>
            </div>
            <p style={{ fontSize: '12px', opacity: 0.9, marginTop: '12px', lineHeight: '1.5' }}>
                {loading ? 'Loading...' : bio || 'No bio available'}
            </p>
        </BentoCard>
    );
};

// Wantedly Card Component
const WantedlyCard = () => {
    return (
        <BentoCard
            colSpan={1}
            href="https://www.wantedly.com/id/ike04"
            style={{ padding: '20px' }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                background: '#21bddb',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
            }}>
                W
            </div>
            <div style={{ marginTop: 'auto' }}>
                <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>Wantedly</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>wantedly.com</p>
            </div>
        </BentoCard>
    );
};

// Photo Card Component
const PhotoCard = ({ label, placeholderText = "Photo", image, colSpan = 1, rowSpan = 1, minHeight = '140px' }) => {
    return (
        <BentoCard
            colSpan={colSpan}
            rowSpan={rowSpan}
            style={{
                padding: '0',
                minHeight: minHeight,
                position: 'relative',
                background: '#e8e8e8',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
            hoverScale={true}
        >
            {image ? (
                <img
                    src={`${process.env.PUBLIC_URL}/${image}`}
                    alt={label || placeholderText}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            ) : (
                <span style={{ color: '#999', fontSize: '12px' }}>{placeholderText}</span>
            )}
            {label && (
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                }}>
                    {label}
                </div>
            )}
        </BentoCard>
    );
};

// GitHub Card Component (Wide with Contribution Graph)
const GitHubCard = ({ username = 'ike04' }) => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            const cacheKey = `github_contributions_${username}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 60 * 60 * 1000) {
                    setContributions(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                const data = await response.json();

                if (data.contributions) {
                    const last49 = data.contributions.slice(-49);
                    setContributions(last49);
                    localStorage.setItem(cacheKey, JSON.stringify({
                        data: last49,
                        timestamp: Date.now()
                    }));
                }
            } catch (error) {
                console.log('Failed to fetch GitHub contributions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [username]);

    const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

    return (
        <BentoCard
            colSpan={2}
            href={`https://github.com/${username}`}
            style={{ padding: '20px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <svg width="32" height="32" viewBox="0 0 98 96" fill="#24292f">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                </svg>
                <span style={{
                    background: '#f5f5f7',
                    color: '#1a1a1a',
                    padding: '5px 14px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid #e0e0e0',
                }}>Follow</span>
            </div>
            <p style={{ fontWeight: '500', fontSize: '14px', color: '#1a1a1a', marginBottom: '12px' }}>@{username}</p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(14, 1fr)',
                gap: '3px',
                flex: 1,
                alignContent: 'center',
            }}>
                {loading ? (
                    Array(98).fill(0).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: '100%',
                                paddingBottom: '100%',
                                background: '#ebedf0',
                                borderRadius: '2px',
                            }}
                        />
                    ))
                ) : (
                    contributions.slice(-98).map((day, i) => (
                        <div
                            key={i}
                            style={{
                                width: '100%',
                                paddingBottom: '100%',
                                background: colors[day.level] || colors[0],
                                borderRadius: '2px',
                            }}
                            title={`${day.date}: ${day.count} contributions`}
                        />
                    ))
                )}
            </div>
        </BentoCard>
    );
};

// SNS Icon Card
const SNSIconCard = () => {
    return (
        <BentoCard
            colSpan={1}
            style={{
                padding: '0',
                minHeight: '140px',
                position: 'relative',
                background: '#e8e8e8',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
            hoverScale={true}
        >
            <img
                src={`${process.env.PUBLIC_URL}/me/sns_icon.jpg`}
                alt="SNS Icon"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.95)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#1a1a1a',
            }}>
                SNS Icon
            </div>
        </BentoCard>
    );
};

// Zenn Card Component
const ZennCard = () => {
    return (
        <BentoCard
            colSpan={1}
            href="https://zenn.dev/ike04"
            style={{ padding: '20px' }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                background: '#3ea8ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '700',
            }}>
                Z
            </div>
            <div style={{ marginTop: 'auto' }}>
                <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>@ike04</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>zenn.dev</p>
            </div>
        </BentoCard>
    );
};

// Qiita Card Component
const QiitaCard = () => {
    return (
        <BentoCard
            colSpan={1}
            href="https://qiita.com/ike04"
            style={{ padding: '20px' }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                background: '#55c500',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '10px',
            }}>
                Qiita
            </div>
            <div style={{ marginTop: 'auto' }}>
                <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>@ike04</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>qiita.com</p>
            </div>
        </BentoCard>
    );
};

// Project Card Component with OGP fetching (using microlink API + cache)
const ProjectCard = ({ url, colSpan = 2 }) => {
    const [ogData, setOgData] = useState({ image: null, title: null, logo: null });

    useEffect(() => {
        const fetchOgData = async () => {
            // Check cache first
            const cached = getOgpCache(url);
            if (cached) {
                setOgData({ image: cached.image, title: cached.title, logo: cached.logo });
                return;
            }

            try {
                // Use microlink.io API for fast OGP fetching
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                const data = await response.json();

                if (data.status === 'success') {
                    const ogResult = {
                        image: data.data?.image?.url || null,
                        title: data.data?.title || null,
                        logo: data.data?.logo?.url || null,
                    };
                    setOgData(ogResult);
                    setOgpCache(url, ogResult);
                }
            } catch (error) {
                console.log('Failed to fetch OGP:', error);
            }
        };

        fetchOgData();
    }, [url]);

    const hostname = new URL(url).hostname;

    return (
        <BentoCard
            colSpan={colSpan}
            href={url}
            style={{ padding: '0', overflow: 'hidden' }}
        >
            <div style={{ padding: '16px 16px 12px 16px' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    background: '#e8e8e8',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '8px',
                    marginBottom: '10px',
                    overflow: 'hidden',
                }}>
                    {ogData.logo ? (
                        <img src={ogData.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        'App'
                    )}
                </div>
                <p style={{ fontWeight: '600', fontSize: '13px', color: '#1a1a1a', lineHeight: '1.4' }}>
                    {ogData.title || 'Loading...'}
                </p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{hostname}</p>
            </div>
        </BentoCard>
    );
};

// OGP Cache utilities
const OGP_CACHE_KEY = 'ogp_cache';
const OGP_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const getOgpCache = (url) => {
    try {
        const cache = JSON.parse(localStorage.getItem(OGP_CACHE_KEY) || '{}');
        const item = cache[url];
        if (item && Date.now() - item.timestamp < OGP_CACHE_EXPIRY) {
            return item.data;
        }
    } catch (e) {}
    return null;
};

const setOgpCache = (url, data) => {
    try {
        const cache = JSON.parse(localStorage.getItem(OGP_CACHE_KEY) || '{}');
        cache[url] = { data, timestamp: Date.now() };
        localStorage.setItem(OGP_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
};

// Blog Card Component with OGP fetching (using microlink API + cache)
const BlogCard = ({ title, url, source, colSpan = 2 }) => {
    const [ogImage, setOgImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOgImage = async () => {
            // Check cache first
            const cached = getOgpCache(url);
            if (cached) {
                setOgImage(cached.image);
                setLoading(false);
                return;
            }

            try {
                // Use microlink.io API for fast OGP fetching
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                const data = await response.json();

                if (data.status === 'success' && data.data?.image?.url) {
                    setOgImage(data.data.image.url);
                    setOgpCache(url, { image: data.data.image.url });
                }
            } catch (error) {
                console.log('Failed to fetch OGP:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOgImage();
    }, [url]);

    return (
        <BentoCard
            colSpan={colSpan}
            href={url}
            style={{ padding: '0', overflow: 'hidden' }}
        >
            <div style={{ padding: '16px 16px 12px 16px' }}>
                <p style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    color: '#1a1a1a',
                    lineHeight: '1.4',
                }}>{title}</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{source}</p>
            </div>
            <div style={{
                flex: 1,
                minHeight: '160px',
                background: '#e8e8e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
                overflow: 'hidden',
            }}>
                {loading ? (
                    <span>Loading...</span>
                ) : ogImage ? (
                    <img
                        src={ogImage}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span style="color: #999; font-size: 12px;">Thumbnail</span>';
                        }}
                    />
                ) : (
                    <span>Thumbnail</span>
                )}
            </div>
        </BentoCard>
    );
};

// Slide Card Component with OGP fetching (using microlink API + cache)
const SlideCard = ({ title, url, source, colSpan = 2 }) => {
    const [ogData, setOgData] = useState({ image: null, title: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOgData = async () => {
            // Check cache first
            const cached = getOgpCache(url);
            if (cached) {
                setOgData({ image: cached.image, title: cached.title });
                setLoading(false);
                return;
            }

            try {
                // Use microlink.io API for fast OGP fetching
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                const data = await response.json();

                if (data.status === 'success') {
                    const ogResult = {
                        image: data.data?.image?.url || null,
                        title: data.data?.title || null,
                    };
                    setOgData(ogResult);
                    setOgpCache(url, ogResult);
                }
            } catch (error) {
                console.log('Failed to fetch OGP:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOgData();
    }, [url]);

    const displayTitle = ogData.title || title;

    return (
        <BentoCard
            colSpan={colSpan}
            href={url}
            style={{ padding: '0', overflow: 'hidden' }}
        >
            <div style={{ padding: '16px 16px 12px 16px' }}>
                <p style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    color: '#1a1a1a',
                    lineHeight: '1.4',
                }}>{displayTitle}</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{source}</p>
            </div>
            <div style={{
                flex: 1,
                minHeight: '160px',
                background: '#e8e8e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
                overflow: 'hidden',
            }}>
                {loading ? (
                    <span>Loading...</span>
                ) : ogData.image ? (
                    <img
                        src={ogData.image}
                        alt={displayTitle}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span style="color: #999; font-size: 12px;">Thumbnail</span>';
                        }}
                    />
                ) : (
                    <span>Thumbnail</span>
                )}
            </div>
        </BentoCard>
    );
};

// Photography Card Component (supports 1x1, 1x2, 2x2 sizes)
const PhotographyCard = ({ image, size = '1x1', placeholderText = 'Photo' }) => {
    const sizeConfig = {
        '1x1': { colSpan: 1, rowSpan: 1, aspectRatio: '1 / 1' },
        '1x2': { colSpan: 2, rowSpan: 1, aspectRatio: '2 / 1' },
        '2x1': { colSpan: 1, rowSpan: 2, aspectRatio: '1 / 2' },
        '2x2': { colSpan: 2, rowSpan: 2, aspectRatio: '1 / 1' },
    };

    const config = sizeConfig[size] || sizeConfig['1x1'];

    return (
        <BentoCard
            colSpan={config.colSpan}
            rowSpan={config.rowSpan}
            style={{
                padding: '0',
                aspectRatio: config.aspectRatio,
                position: 'relative',
                background: '#e8e8e8',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
            hoverScale={true}
        >
            {image ? (
                <img
                    src={`${process.env.PUBLIC_URL}/${image}`}
                    alt={placeholderText}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            ) : (
                <span style={{ color: '#999', fontSize: '12px' }}>{placeholderText}</span>
            )}
        </BentoCard>
    );
};

// Section Header Component
const SectionHeader = ({ title, colSpan = 4 }) => {
    return (
        <div style={{
            gridColumn: `span ${colSpan}`,
            padding: '24px 0 8px 0',
        }}>
            <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a',
            }}>{title}</h2>
        </div>
    );
};

// Main App Component
export default function App() {
    const isPc = useMedia({ minWidth: "960px" });
    const isTablet = useMedia({ minWidth: "600px" });
    const isMobile = !isTablet;

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "App.jsx"
        });
    }, []);

    const containerStyle = {
        display: 'flex',
        flexDirection: isPc ? 'row' : 'column',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: isPc ? '40px 40px' : '20px',
        gap: isPc ? '50px' : '30px',
        minHeight: '100vh',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '14px',
        flex: 1,
        alignContent: 'start',
    };

    const colSpan = isMobile ? 2 : 4;

    return (
        <div style={containerStyle}>
            <ProfileSidebar isPc={isPc} />
            <main style={{ flex: 1 }}>
                {/* About me Section */}
                <AnimatedSection gridStyle={gridStyle}>
                    <SectionHeader title="About me 👋" colSpan={colSpan} />

                    <TwitterCard isMobile={isMobile} />
                    <WantedlyCard />
                    <PhotoCard label="My cat" image="me/cat.png" />

                    <GitHubCard username="ike04" />
                    <SNSIconCard />
                    <ZennCard />

                    <PhotoCard image="me/pikmin.png" />
                    <QiitaCard />
                </AnimatedSection>

                {/* Projects Section */}
                <AnimatedSection gridStyle={gridStyle}>
                    <SectionHeader title="Projects 🛠️" colSpan={colSpan} />

                    {ProjectsData.data.map((item, index) => (
                        <ProjectCard
                            key={index}
                            url={item.url}
                            colSpan={2}
                        />
                    ))}
                </AnimatedSection>

                {/* Writings Section */}
                <AnimatedSection gridStyle={gridStyle}>
                    <SectionHeader title="Writings 🧑‍💻" colSpan={colSpan} />

                    {WritingsData.data.map((item, index) => (
                        <BlogCard
                            key={index}
                            title={item.title}
                            url={item.url}
                            source={new URL(item.url).hostname}
                            colSpan={2}
                        />
                    ))}
                </AnimatedSection>

                {/* Slides Section */}
                <AnimatedSection gridStyle={gridStyle}>
                    <SectionHeader title="Slides 📁" colSpan={colSpan} />

                    <SlideCard
                        title=""
                        source="speakerdeck.com"
                        url="https://speakerdeck.com/zozotech/zozomatch-message"
                        colSpan={2}
                    />
                </AnimatedSection>

                {/* Photography Section */}
                <AnimatedSection gridStyle={gridStyle}>
                    <SectionHeader title="Photography 📸" colSpan={colSpan} />

                    <PhotographyCard size="2x2" image="photography/trip.png" />
                    <PhotographyCard size="1x1" image="photography/camp.png" />
                    <PhotographyCard size="1x1" image="photography/pokegenic.png" />
                    <PhotographyCard size="1x2" image="photography/trip2.png" />
                </AnimatedSection>
            </main>
        </div>
    );
}
