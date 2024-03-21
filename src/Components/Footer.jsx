import React, { useEffect, useState } from 'react';
import '../StyleSheets/Footer.css';
import { getFooter } from '../api-helpers';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';

const Footer = () => {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [emailFooter, setEmailFooter] = useState('');
  const [phoneFooter, setPhoneFooter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let footers;
      try {
        footers = await getFooter();
        setFacebook(footers.facebook);
        setInstagram(footers?.instagram);
        setTiktok(footers?.tiktok);
        setEmailFooter(footers?.email);
        setPhoneFooter(footers?.phone);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <footer
        position="gutterBottom"
    >
      <div className="footer-content">
        <div className="footer-section" style={{color: 'white'}}>
          <h2 style={{marginBottom: 8}}>Contact Us</h2>
          <ul>
            <li style={{marginBottom: 5}}><a href={`mailto:${emailFooter}`} style={{color: 'white'}}><p>Email: {emailFooter}</p></a></li>
            <li style={{marginBottom: 5}}><a href={`tel:${phoneFooter}`} style={{color: 'white', marginTop: 8}}><p>Phone: {phoneFooter}</p></a></li>
          </ul>
        </div>
        <div className="footer-section" style={{color: 'white'}}>
          <h2 style={{marginBottom: 8}}>Follow Us</h2>
          <a href={`${facebook}`} target='blank' style={{color: 'white'}}><FacebookOutlinedIcon/></a>
          <a href={`${instagram}`} target='blank' style={{color: 'white'}}><InstagramIcon/></a>          
          <a href={`${tiktok}`} target='blank' style={{color: 'white'}}><AudiotrackOutlinedIcon/></a>
        </div>
        <div className="footer-section" style={{color: 'white'}}>
          <h2 style={{marginBottom: 8}}>Quick Links</h2>
          <ul>
            <li style={{marginBottom: 5}}><a href='/' style={{color: 'white'}}>Home</a></li>
            <li style={{marginBottom: 5}}><a href='https://www.instagram.com/direct/t/17851149599737728/' target='blank' style={{color: 'white'}}>Contact</a></li>
            {/* {
              localStorage.getItem('admin') && (
                <li><a href={`/dashboard/${JSON.parse(localStorage.getItem('admin'))._id}`} style={{color: 'black'}}>Admin</a></li>
              )
            }
            {
              localStorage.getItem('admin') && (
                <li><a href={`/`} style={{color: 'black'}} onClick={() => {localStorage.removeItem('admin')}}>Log Out</a></li>
              )
            } */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{color: 'white'}}>&copy; 2022 PAUSE. All Rights Reserved. Developed By <a 
          href="https://sites.google.com/view/devninjas?usp=sharing" 
          target='blank' 
          style={{color: 'white', fontWeight: 'bold', fontSize: '1.2rem'}}
        >DevNinjas</a></p>
      </div>
    </footer>
  );
};

export default Footer;
