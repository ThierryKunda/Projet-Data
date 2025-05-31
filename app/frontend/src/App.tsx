import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <header>
      <h1>OptiFin</h1>
      <nav class={styles.NavBar}>
        <A href='/profile' activeClass={styles.SectionActive}>Votre profil</A>
        <A href='/portfolio' activeClass={styles.SectionActive}>Votre portefeuille</A>
        <A href='/stock-market' activeClass={styles.SectionActive}>Les marchés financiers</A>
      </nav>
    </header>
  );
};

export default App;
