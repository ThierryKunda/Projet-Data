import * as d3 from 'd3';

export async function fetchSharesInformation(shareSymbols: string): Promise<SharesData> {
   if (shareSymbols) {
        const data = await d3.json<SharesData>(`http://127.0.0.1:8000/shares/${shareSymbols}`);
       if (data) {
           return data;
       }
       return [];
   }
   return [];
}

export type SharesData = {
    Share: string;
    Date: string;
    Price: number;
    Volume: number;
}[];

export async function fetchPortfolioInformation(): Promise<PortfolioData> {
    return new Promise((resolve) => {
        d3.json<PortfolioData>('http://127.0.0.1:8000/user_investments').then((data) => {
            if (data) {
                resolve(data);
            } else {
                resolve([]);
            }
        });
    });
}

export type PortfolioData = {
    Share: string;
    Amount: number;
    Type?: string;
}[];