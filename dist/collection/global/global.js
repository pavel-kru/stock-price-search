export const AV_API_KEY = 'FVKEXCIQ88SLZ4OT';
export const DEMO_DATA_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${AV_API_KEY}`;
export const urlWithSymbolConstructor = (str) => `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${str}&apikey=${AV_API_KEY}`;
