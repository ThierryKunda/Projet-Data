/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';

import './index.css';
import App from './App';
import UserProfile from './components/sections/UserProfile';
import Portfolio from './components/sections/Portfolio';
import StockMarket from './components/sections/StockMarket';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
  <Router root={App}>
    <Route path="/profile" component={UserProfile} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/stock-market" component={StockMarket} />
  </Router>
  ),
  root!
);
