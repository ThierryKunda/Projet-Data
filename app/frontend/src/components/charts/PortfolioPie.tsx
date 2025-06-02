import * as d3 from 'd3';
import { PortfolioData } from '../../utils';
import { For } from 'solid-js';

export default function PortfolioPie(props: { investments: PortfolioData }) {

    // Group by Type and display the total amount for each type
    const groupedData = d3.group(props.investments, d => d.Type);
    const pieData = Array.from(groupedData, ([key, values]) => ({
        Type: key ?? 'Inconnu',
        Amount: d3.sum(values, d => d.Amount)
    }));

    const pie = d3.pie<{ Type: string; Amount: number }>().value(d => d.Amount);
    const data = pie(pieData);
    const width = 1000, height = 400, radius = Math.min(width, height) / 2;
    
    const color = d3.scaleOrdinal<string>()
    .domain(props.investments.map(d => d.Type ?? d.Share))
    .range(d3.schemeCategory10);
    const arc = d3.arc<d3.PieArcDatum<{ Type: string; Amount: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const legendRectSize = 18;
    const legendSpacing = 6;

    return <div>
        <h3>Répartition des investissements par type d'actif</h3>
        <svg width={width} height={height}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                <For each={data}>
                    {(d) => (
                        <><path
                            d={arc(d) as string | undefined}
                            fill={color(d.data.Type ?? d.data) as string} />
                            <text transform={`translate(${arc.centroid(d)})`} dy=".35em" text-anchor="middle">
                                {d.data.Amount} €
                            </text></>
                    )}
                </For>
            </g>
            <g transform={`translate(${width / 2 + radius + 60},${height / 2 - radius})`}>
                <For each={data}>
                    {(investment, index) => (
                        <g transform={`translate(0, ${index() * (legendRectSize + legendSpacing)})`}>
                            <rect
                                width={legendRectSize}
                                height={legendRectSize}
                                fill={color(investment.data.Type)}
                            />
                            <text
                                x={legendRectSize + legendSpacing}
                                y={legendRectSize - 4}
                            >
                                {investment.data.Type}
                            </text>
                        </g>

                    )}
                </For>
            </g>
        </svg>
    </div>
}