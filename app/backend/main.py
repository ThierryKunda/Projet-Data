from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from data_fetching import DataFetcher

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/shares/{symbol}")
def get_share_info(symbol: str, start_date: str = None, end_date: str = None):
    ticker = DataFetcher(symbol)
    return ticker.get_shares_info(start_date=start_date, end_date=end_date)