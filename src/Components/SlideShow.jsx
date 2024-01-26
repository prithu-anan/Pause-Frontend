import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../StyleSheets/SlideShow.css';
import { Link } from 'react-router-dom';

// const fadeImages = [
//   {
//     url:
//       'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//     caption: 'First Slide',
//     description: 'This is the first slide',
//   },
//   {
//     url:
//       'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
//     caption: 'Second Slide',
//     description: 'This is the second slide',
//   },
//   {
//     url:
//       'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//     caption: 'Third Slide',
//     description: 'This is the third slide',
//   },
// ];

const SlideShow = (props) => {
  return (
    <div className="slide-container">
      <Slide duration={5000}>
        {[0, 1, 2].map((item, index) => (
          <div key={index}>
            <div style={{ position: 'relative' }}>
              <img style={{ width: '100%', height: '50em'}} src={props?.landscape?.length === 3 ? props?.landscape?.[index] : props?.landscape?.[0]} alt="" />
              <h2 className='collection-name' style={{ position: 'absolute', left: '50px', zIndex: 1, color: 'white', fontSize: '40px' }}>
                {props.name}
              </h2>
              <h2 className='collection-description' style={{ position: 'absolute', left: '50px', zIndex: 1, color: 'white', fontSize: '20px' }}>
                {props.description}
              </h2>
              <Link to={`/collection/${props._id}`}>
                <button
                    className='shop-the-collection-button' 
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'black'; 
                      e.target.style.color = 'white'; 
                      e.target.style.borderColor = 'black'; 
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white'; 
                      e.target.style.color = 'black'; 
                      e.target.style.borderColor = 'white'; 
                    }}
                >
                      Shop The Collection
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShow;
