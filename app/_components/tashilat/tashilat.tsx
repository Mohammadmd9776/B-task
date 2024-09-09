import React from 'react';
import { data } from '../../data.json';
import SingleTashilat from './single-tashilat';
import styles from './tashilat.module.scss';

const TashilatList = () => {
  return (
    <div className={styles['grid-container']}>
      {data.map((item) => (
        <SingleTashilat  {...item} />
      ))}
    </div>
  );
};

export default TashilatList;
