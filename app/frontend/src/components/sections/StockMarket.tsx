import { createResource, createSignal, Setter, Switch, Match } from 'solid-js';

import StockMarketPrice from '../charts/StockMarketPrice';

import styles from '../../styles/StockMarket.module.css';

import { fetchSharesInformation } from '../../utils';

export default function StockMarket() {
    const [shareSearch, setShareSearch] = createSignal('');
    const [share] = createResource(shareSearch, fetchSharesInformation);
    return <div class={styles.StockMarket}>
        <SearchBar
            setShareSearch={setShareSearch}
        />
        <Switch>
            <Match when={share.error}>
                <p>Share not found</p>
            </Match>
            <Match when={share.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={share()}>
                <div class={styles.Charts}>
                    <StockMarketPrice shareValue={share() ?? []} />
                </div>
            </Match>
        </Switch>
    </div>
}

const SearchBar = (props: { setShareSearch: Setter<string> }) => {
     const [shareInput, setShareInput] = createSignal('MSCI');
     const [startDate, setStartDate] = createSignal('2025-01-01');
     const [endDate, setEndDate] = createSignal('2025-12-31');

     const updateShareSearch = () => {
        props.setShareSearch(
            shareInput() +
            `?start_date=${startDate()}&end_date=${endDate()}`);
     };
    return <div class={styles.SearchBar}>
        <input type="text" name='update-share' value={shareInput()} onInput={(e) => setShareInput(e.currentTarget.value)}
            placeholder='Rechercher une action, une obligation, un ETF ou un indice...' />
        <input type="date" placeholder="Date de début" value={startDate()} name="start-date" id="start-date" onInput={(e) => setStartDate(e.currentTarget.value)} />
        <input type="date" placeholder="Date de fin" value={endDate()} name="end-date" id="end-date" onInput={(e) => setEndDate(e.currentTarget.value)} />
        <button class={styles.SearchButton} onClick={updateShareSearch}>Rechercher</button>
    </div>
}