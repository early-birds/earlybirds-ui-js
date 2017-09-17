import React from 'react';
import styles from './style.css';

const RecosItem = ({ product }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={product.photo} />
    </div>
  )
}

export default RecosItem;
