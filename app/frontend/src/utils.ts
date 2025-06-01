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