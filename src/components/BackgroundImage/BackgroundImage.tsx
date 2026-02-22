import React, { useState } from 'react';
import imgBack from "../../Assets/img/background.jpg";
import styles from './BackgroundImage.module.scss';

const BackgroundImage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={imgBack}
      alt="background"
      className={`${styles.wrapperBack} ${loaded ? styles.loaded : ''}`}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
};

export default BackgroundImage;
