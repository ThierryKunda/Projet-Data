import pandas as pd
import yfinance as yf

class DataFetcher:
    def __init__(self, symbols: str):

        self.tickers = [yf.Ticker(sym) for sym in symbols.split(',')]

    def _fetch_data(self, start_date: str = None, end_date: str = None):
        res = []
        for ticker in self.tickers:
            data = ticker.history(start=start_date, end=end_date)
            data.insert(0, "Share", ticker.ticker)
            res.append(data)
        return pd.concat(res, axis=0)

    def get_shares_info(self, start_date: str = None, end_date: str = None):
        df = self._fetch_data(start_date, end_date)
        df = df.rename(columns={'Close': 'Price'})
        df = df.reset_index()
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
        return df[["Share", "Date", "Price", "Volume"]].to_dict(orient='records')

