import { createSignal, createResource, Switch, Match, createEffect } from 'solid-js';

import styles from '../../styles/Portfolio.module.css';
import PortfolioPie from '../charts/PortfolioPie';
import PortfolioTable from '../charts/PortfolioTable';
import { fetchPortfolioInformation, PortfolioData } from '../../utils';

export default function Portfolio() {
    return <div>
        <SearchBar />
        <InvestmentList />
    </div>
}

const SearchBar = () => {
    return <div>
        <h2>Rechercher un investissement</h2>
        <div class={styles.SearchBar}>
            <input class={styles.ShareInput} type="text" name='investment-search'
                placeholder='Rechercher une action, une obligation ou un ETF...' />
                <input class={styles.AmountInput} type="number" name='investment-amount'
                placeholder='Montant (en €)'/>
            <button class={styles.SearchButton}>Investir la somme</button>
        </div>
    </div>
}

const InvestmentList = () => {
    const [investments] = createResource(fetchPortfolioInformation);

    createEffect(() => {
        console.log(investments())
    })

    return <div class={styles.InvestmentList}>
        <h2>Mes investissements</h2>
        <Switch>
            <Match when={investments.loading}>
                <div>Récupération des investissements...</div>
            </Match>
            <Match when={investments.error}>
                <div>Erreur lors du chargement des investissements</div>
            </Match>
            <Match when={investments()}>
                <PortfolioPie investments={investments() ?? []} />
                <PortfolioTable investments={investments() ?? []} />
            </Match>
        </Switch>
    </div>
}