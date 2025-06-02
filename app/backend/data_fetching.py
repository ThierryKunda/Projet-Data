import pandas as pd
import yfinance as yf

class MarketDataFetcher:
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
    
class UserDataFetcher:
    def __init__(self):
        pass

    def get_user_investments(self):
        data = [
            { "Share": 'AAPL', "Amount": 1500, "Type": 'Action' },
            { "Share": 'AMZN', "Amount": 2000, "Type": 'Action' },
            { "Share": 'GOOGL', "Amount": 1200, "Type": 'Action' },
            { "Share": 'MSFT', "Amount": 1800, "Type": 'Action' },
            { "Share": '^TNX', "Amount": 1000, "Type": 'Obligation' },
            { "Share": '^IRX', "Amount": 800, "Type": 'Obligation' },
            { "Share": '^FVX', "Amount": 900, "Type": 'Obligation' },
            { "Share": '^TYX', "Amount": 1100, "Type": 'Obligation' },
            { "Share": 'XLK', "Amount": 700, "Type": 'ETF' },
            { "Share": 'SPY', "Amount": 750, "Type": 'ETF' },
            { "Share": 'VT', "Amount": 800, "Type": 'ETF' },
            { "Share": 'XLC', "Amount": 650, "Type": 'ETF' },
            { "Share": 'XLI', "Amount": 900, "Type": 'ETF' },
            { "Share": 'VTI', "Amount": 850, "Type": 'ETF' },
        ]
        return data