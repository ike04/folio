import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMedia from "use-media";
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress } from '@mui/material';

const OgpFetcher = (props) => {
    const [progress, setProgress] = React.useState(false);
    const [ogp, setOgp] = useState(null);
    const [date, setDate] = useState(null);
    const url = props.url;

    const isMobile = useMedia({ minWidth: "519px" });
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
    const isPc = useMedia({ minWidth: "960px" })

    const textStyle = {
        textAlign: 'left',
        paddingLeft: '8px',
        paddingRight: '8px'
    }

    const outputStyle = {
        textAlign: 'center',
        border: 'solid',
        borderColor: '#d3d3d3',
        margin: '20px 10%',
        boxShadow: '10px 10px 15px -10px',
        borderRadius: '10px',
        cursor: 'pointer'
    }

    function click() {
        window.open(url, '_blank')
        window.gtag("event", "techblog", {
            event_category: "click",
            event_label: "output",
        });
    };

    useEffect(() => {
        const fetchOgp = async () => {
            try {
                setProgress(true)
                const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
                const html = response.data.contents;
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const ogp = {
                    title: doc.querySelector('meta[property="og:title"]').getAttribute('content'),
                    image: doc.querySelector('meta[property="og:image"]').getAttribute('content'),
                    description: doc.querySelector('meta[property="og:description"]').getAttribute('content'),
                    publishedDate: doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content')
                };
                setOgp(ogp);
                setDate(formatPublishedDate(ogp.publishedDate));
                setProgress(false)
            } catch (error) {
                setProgress(false)
                console.error('Error fetching OGP:', error);
            }
        }

        const formatPublishedDate = (rawDate) => {
            if (rawDate) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const date = new Date(rawDate * 1000);
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
            } else {
                return '';
            }
        }


        fetchOgp();
    }, []);

    return (
        <>
            {progress ? <CircularProgress align="center" /> :
                ogp && (
                    isMobile ?
                        <Grid xs={6} >
                            <div style={outputStyle} onClick={() => click()}
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        // Enter or Space で実行
                                        click();
                                    }
                                }} >
                                <img src={ogp.image} style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                                <h3 style={textStyle}>{ogp.title}</h3>
                                <p style={textStyle}>{date}</p>
                            </ div>
                        </Grid>
                        :
                        <div style={outputStyle} onClick={() => click()}
                            role="button"
                            tabIndex="0"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    // Enter or Space で実行
                                    click();
                                }
                            }} >
                            <img src={ogp.image} style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                            <h3 style={textStyle}>{ogp.title}</h3>
                            <p style={textStyle}>{date}</p>
                        </ div>
                )}
        </>
    );
}

export default OgpFetcher;
