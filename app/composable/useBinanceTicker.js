import { ref, onMounted, onUnmounted } from "vue";

export function useBinanceTickers(symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"]) {
  const tickers = ref({});

  let ws;

  const fetchInitialData = async () => {
    const responses = await Promise.all(
      symbols.map((s) =>
        fetch(`https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${s}`).then(
          (r) => r.json()
        )
      )
    );

    responses.forEach((data) => {
      tickers.value[data.symbol] = {
        price: parseFloat(data.lastPrice),
        changePercent: parseFloat(data.priceChangePercent),
        color: parseFloat(data.priceChangePercent) >= 0 ? "#2EBD85" : "#F6465D",
      };
    });
  };

  onMounted(() => {
    fetchInitialData();

    ws = new WebSocket("wss://fstream.binance.com/ws/!ticker@arr");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data.forEach((item) => {
        if (symbols.includes(item.s)) {
          tickers.value[item.s] = {
            price: parseFloat(item.c),
            changePercent: parseFloat(item.P),
            color: parseFloat(item.P) >= 0 ? "#2EBD85" : "#F6465D",
          };
        }
      });
    };
  });

  onUnmounted(() => {
    if (ws) ws.close();
  });

  return { tickers };
}
