import React from 'react';
import PicturesItem from '../pictures-item/pictures-item.js';

const PicturesList = (props) => {
  const PicturesItems = props.images.map((image) =>
    <PicturesItem
      key={image.id}
      image={image}
      id={image.id}
    />
  );

  return (
    <ul className="pictures__list">
      {PicturesItems}
    </ul>
  );
}

export default PicturesList;