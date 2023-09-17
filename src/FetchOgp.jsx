import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OgpFetcher = () => {
  const [ogps, setOgps] = useState([]);
  const jsonData = {
    "data": [
      {
        "url": "https://techblog.zozo.com/entry/zozotown-android-improve-build-warning",
      },
      {
        "url": "https://techblog.zozo.com/entry/zozotown-android-improve-build-warning" // 別のURLを追加する場合はここに追加
      }
    ]
  };

  useEffect(() => {
    const fetchOgp = async (url) => {
      try {
        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const html = response.data.contents;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const ogp = {
          title: doc.querySelector('meta[property="og:title"]').getAttribute('content'),
          image: doc.querySelector('meta[property="og:image"]').getAttribute('content'),
          description: doc.querySelector('meta[property="og:description"]').getAttribute('content')
        };
        setOgps(prevOgps => [...prevOgps, ogp]);
      } catch (error) {
        console.error('Error fetching OGP:', error);
      }
    }

    jsonData.data.forEach(item => {
      fetchOgp(item.url);
    });
  }, [jsonData]);

  return (
    <div>
      {ogps.map((ogp, index) => (
        <div key={index}>
          <h2>{ogp.title}</h2>
          <img src={ogp.image} alt={ogp.title} />
          <p>{ogp.description}</p>
        </div>
      ))}
    </div>
  );
}

export default OgpFetcher;
