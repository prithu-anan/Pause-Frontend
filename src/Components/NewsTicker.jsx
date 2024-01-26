import React, { useEffect, useState } from 'react';
import '../StyleSheets/NewsTicker.css';
import { getHeaders } from '../api-helpers';

const NewsTicker = () => {
  const [header1, setHeader1] = useState('');
  const [header2, setHeader2] = useState('');
  const [header3, setHeader3] = useState('');
  const [header4, setHeader4] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let headers;
      try {
        headers = await getHeaders();
        setHeader1(headers.header1);
        setHeader2(headers.header2);
        setHeader3(headers.header3);
        setHeader4(headers.header4);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

    return (
      <div className="news-ticker">
        <div className="ticker-text">
          <span><img src="/pause.png" alt="" height="20px" width="45px"/></span>
          <span>{header1}</span>
          <span><img src="/pause.png" alt="" height="20px" width="45px"/></span>
          <span>{header2}</span>
          <span><img src="/pause.png" alt="" height="20px" width="45px"/></span>
          <span>{header3}</span>
          <span><img src="/pause.png" alt="" height="20px" width="45px"/></span>
          <span>{header4}</span>
          <span><img src="/pause.png" alt="" height="20px" width="45px"/></span>
          {/* Add more news items here */}
        </div>
      </div>
    );
  };

export default NewsTicker;