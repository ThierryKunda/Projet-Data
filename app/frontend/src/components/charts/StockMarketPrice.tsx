import * as d3 from 'd3';

import { createEffect, For } from 'solid-js';

import { SharesData } from "../../utils";

export default function StockMarketPrice(props: {shareValue: SharesData}) {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 },
          width = 1000 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    const data = props.shareValue.map(d => ({
        x: new Date(d.Date),
        y: d.Price,
        share: d.Share,
    }));

    const groupedData = d3.groups(data, d => d.share);
    const color = d3.scaleOrdinal()
    .domain(groupedData.map(([group]) => group))
    .range(d3.schemeCategory10);


    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.x) as [Date, Date])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) ?? 0]).nice()
      .range([height, 0]);

    // Adding/updating axes
    let xRef: SVGGElement | undefined;
    let yRef: SVGGElement | undefined;
    
    createEffect(() => {
        if (xRef) d3.select(xRef).call(d3.axisBottom(x));
        if (yRef) d3.select(yRef).call(d3.axisLeft(y));
    });

    let canvasRef: SVGSVGElement | undefined;
    createEffect(() => {
        if (canvasRef) {
            d3.select(canvasRef).call(d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([1, 10])
                .on("zoom", (event) => {
                    d3.select(canvasRef).attr("transform", event.transform);
                }));
        }
    });

    return (
        <svg ref={canvasRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
            <g ref={xRef} transform={`translate(0,${height - margin.bottom})`} />
            <text transform={`translate(${width / 2}, ${height + margin.top})`} text-anchor="middle">Date</text>
            <g ref={yRef} transform={`translate(${margin.left},${margin.top})`} />
            <text transform={`translate(${margin.left / 3 }, ${height / 2}) rotate(-90)`} text-anchor="middle">Valeur (en $)</text>
            {/* <Line data={data} xScale={x} yScale={y} /> */}
            <For each={groupedData}>
                {([share, values]) => (
                    <g>
                        <text x={x(values[values.length-1].x) + 10} y={y(values[values.length-1].y) + 5} fill={color(share) as string}>{share}</text>
                        <Line data={values} xScale={x} yScale={y} color={color(share) as string}/>
                    </g>
                )}
            </For>
        </svg>
    );
}

const Line = (props: { data: { x: Date, y: number }[], xScale: d3.ScaleTime<number, number>, yScale: d3.ScaleLinear<number, number>, color: string }) => {
    const line = d3.line<{ x: Date, y: number }>()
        .x(d => props.xScale(d.x))
        .y(d => props.yScale(d.y));

    return <path
                fill="none"
                stroke={props.color}
                stroke-width="1.5"
                d={line(props.data) ?? undefined}
            />   
}