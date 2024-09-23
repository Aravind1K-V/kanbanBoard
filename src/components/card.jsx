import React from 'react';
import './card.css';

const Card = ({ id, title, tag, available }) => {
  return (
    <div className="cardContainer flex-display-btn gap-5">
      <div className="cardHeading flex-sb">
        <span  className='color-grey text-uppercase'>{id}</span>
        <div className="imageContainer relative" style={{ width: "30px", height: "30px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src="profile_img.jpg"
            alt="UserImage"
          />
          <div className={available ? 'showStatus-online' : 'showStatus-offline'}></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        <p>{title}</p>
      </div>
      <div className="cardTags">
        <div className="tags color-gray"> ... </div>
        {
          tag?.map((elem, index) => {
            return <div key={index} className="tags color-grey"><span>•</span>{elem}</div>
          })
        }
      </div>
    </div>
  );
}

export default Card;
