import { useState, useEffect } from 'react';
import styles from '../styles/style.module.css';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showShortUrl, setShowShortUrl] = useState(false);
  const [recentUrls, setRecentUrls] = useState([]);

  const fetchRecentUrls = async () => {
    try {
      const timestamp = new Date().toISOString();
      const response = await fetch(`/api/db?timestamp=${timestamp}`);
      
      if (response.ok) {
        const data = await response.json();
        setRecentUrls(data);
      } else {
        console.error('Error fetching recent URLs:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred during fetch:', error);
    }
  };
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchRecentUrls();
    }, 1); // Poll every millisecond

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleShorten = async () => {
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
  
      if (response.ok) {
        const { shortUrl } = await response.json();
        setShortUrl(shortUrl);
        setShowShortUrl(true);
      } else {
        console.error('Error shortening URL:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred during fetch:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>URL Shortener</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className={styles.inputStyle}
          placeholder="Enter your URL"
        />
        <button onClick={handleShorten} className={styles.buttonStyle}>
          Shorten URL
        </button>
      </div>
      {showShortUrl && shortUrl && (
        <div className={styles.resultContainer}>
          <p>Short URL:</p>
          <a href={`http://localhost:3000/api/redirect/${shortUrl}`} target="_blank" rel="noopener noreferrer" className={styles.shortUrlStyle}>
            {`https://punya.16/${shortUrl}`}
          </a>
        </div>
      )}
      <div className={styles.recentUrlsContainer}>
        <h3>Recent URLs</h3>
        <ul>
          {recentUrls.map((url) => (
            <li key={url.short_url}>
              <a href={`http://localhost:3000/api/redirect/${url.short_url}`} target="_blank" rel="noopener noreferrer">
                {`https://punya.16/${url.short_url}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
