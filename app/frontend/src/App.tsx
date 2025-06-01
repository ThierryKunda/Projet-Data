import type {  ParentComponent } from 'solid-js';
import { A } from '@solidjs/router';

import styles from './App.module.css';

const App: ParentComponent = (props) => {
  return (
    <div>
      <header>
        <h1>OptiFin</h1>
        <nav class={styles.NavBar}>
          <A href='/profile' activeClass={styles.SectionActive}>Votre profil</A>
          <A href='/portfolio' activeClass={styles.SectionActive}>Votre portefeuille</A>
          <A href='/stock-market' activeClass={styles.SectionActive}>Les marchés financiers</A>
        </nav>
    </header>
    <main>{props.children}</main>
    </div>
  );
};

export default App;
