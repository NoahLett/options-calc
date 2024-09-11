const basePath = 'https://finnhub.io/api/v1';

export const getStockQuote = async (stockTicker) => {
  const url = `${basePath}/quote?symbol=${stockTicker}&token=${import.meta.env.VITE_FINHUB_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}