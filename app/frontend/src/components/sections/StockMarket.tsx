import { createEffect, createSignal, Setter } from 'solid-js';

import StockMarketPrice from '../charts/StockMarketPrice';

import styles from '../../styles/StockMarket.module.css';
import SharePrice from '../charts/SharePrice';

export default function StockMarket() {
    const [shareSearch, setShareSearch] = createSignal('');
    createEffect(() => console.log('Share search updated:', shareSearch()));
    return <div class={styles.StockMarket}>
        <SearchBar updateShare={setShareSearch} />
        <div class={styles.Charts}>
            <SharePrice />
            <StockMarketPrice />
        </div>
    </div>
}

const SearchBar = (props: { updateShare: Setter<string> }) => {
    return <div class={styles.SearchBar}>
        <input type="text" name='update-share'
            placeholder='Rechercher une action, une obligation, un ETF ou un indice...'
            onInput={(e) => props.updateShare(e.currentTarget.value)} />
        <button class={styles.SearchButton}>Rechercher</button>
        </div>
}