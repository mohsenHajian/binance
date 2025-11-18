import { ref, onMounted, onUnmounted } from "vue";

export function useFuturesDetails(symbol = "BTCUSDT") {
  const _symbol = ref(symbol.toUpperCase());

  const perpPrice = ref(0);
  const change = ref(0);
  const changePercent = ref(0);
  const markPrice = ref(0);
  const indexPrice = ref(0);
  const fundingRate = ref(0);
  const fundingCountdownFormatted = ref("00:00:00");

  const high24h = ref(0);
  const low24h = ref(0);
  const volumeBTC = ref(0);
  const volumeUSDT = ref(0);
  const openInterestUSDT = ref(0);

  let ws = null;
  let countdownTimer = null;
  let nextFundingTime = 0;

  const formatCountdown = () => {
    const ms = nextFundingTime - Date.now();
    if (ms <= 0) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const startCountdown = () => {
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      fundingCountdownFormatted.value = formatCountdown();
    }, 1000);
  };

  const startSocket = () => {
    const stream = `${_symbol.value.toLowerCase()}@ticker/${_symbol.value.toLowerCase()}@markPrice`;
    ws = new WebSocket(`wss://fstream.binance.com/stream?streams=${stream}`);

    ws.onmessage = (msg) => {
      const { stream, data } = JSON.parse(msg.data);

      if (stream.endsWith("@ticker")) {
        perpPrice.value = parseFloat(data.c);
        change.value = parseFloat(data.p);
        changePercent.value = parseFloat(data.P);
        high24h.value = parseFloat(data.h);
        low24h.value = parseFloat(data.l);
        volumeBTC.value = parseFloat(data.v);
        volumeUSDT.value = parseFloat(data.q);
        openInterestUSDT.value = parseFloat(data.oi ?? 0);
      }

      if (stream.endsWith("@markPrice")) {
        markPrice.value = parseFloat(data.p);
        indexPrice.value = parseFloat(data.i);
        fundingRate.value = parseFloat(data.r) * 100; // ← درصد واقعی + صحیح

        nextFundingTime = data.T;
        startCountdown();
      }
    };
  };

  const setSymbol = (newSymbol) => {
    _symbol.value = newSymbol.toUpperCase();
    if (ws) ws.close();
    startSocket();
  };

  onMounted(startSocket);

  onUnmounted(() => {
    if (ws) ws.close();
    clearInterval(countdownTimer);
  });

  return {
    symbol: _symbol,
    perpPrice,
    change,
    changePercent,
    markPrice,
    indexPrice,
    fundingRate,
    fundingCountdownFormatted,
    high24h,
    low24h,
    volumeBTC,
    volumeUSDT,
    openInterestUSDT,
    setSymbol,
  };
}
