'use client';
import { useState } from 'react';
import RegisterForm from '../register-form/register-form';
import TashilatList from '../tashilat/tashilat';
import styles from './main-component.module.scss';

const MainComponent = () => {
  const [state, setState] = useState('form');

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button onClick={() => setState('form')}>ثبت نام</button>
        <button onClick={() => setState('list')}>لیست</button>
      </div>
      <div className={styles.contentContainer}>
        {state === 'form' ? <RegisterForm /> : <TashilatList />}
      </div>
    </div>
  );
};

export default MainComponent;
