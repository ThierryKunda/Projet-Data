import { For } from "solid-js";

import { PortfolioData } from "../../utils";
import styles from "../../styles/Portfolio.module.css";

export default function PortfolioTable(props: { investments: PortfolioData }) {
    return <div>
        <h3>Tous les investissements</h3>
        <table class={styles.InvestmentTable}>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Montant</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <For each={props.investments}>
                    {(investment) => (
                        <tr>
                            <td>{investment.Share}</td>
                            <td>{investment.Amount}</td>
                            <td>{investment.Type}</td>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
    </div>
}