import { ref, watch, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useFuturesStore } from "../stores/futures";

export function useFuturesDetails(symbolRef) {
  const store = useFuturesStore();
  const _symbol = ref(symbolRef.value.toUpperCase());

  // --- Reactive refs ---
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

  // -------- Snapshot API call --------
  const fetchSnapshot = async () => {
    try {
      const symbol = _symbol.value;
      const respTicker = await axios.get(
        `https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${symbol}`
      );
      const data = respTicker.data;

      perpPrice.value = parseFloat(data.lastPrice);
      change.value = parseFloat(data.priceChange);
      changePercent.value = parseFloat(data.priceChangePercent);
      high24h.value = parseFloat(data.highPrice);
      low24h.value = parseFloat(data.lowPrice);
      volumeBTC.value = parseFloat(data.volume);
      volumeUSDT.value = parseFloat(data.quoteVolume);
      openInterestUSDT.value = parseFloat(data.openInterest ?? 0);

      const respMark = await axios.get(
        `https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`
      );
      const markData = respMark.data;
      markPrice.value = parseFloat(markData.markPrice);
      indexPrice.value = parseFloat(markData.indexPrice);
      fundingRate.value = parseFloat(markData.lastFundingRate) * 100;
      nextFundingTime = markData.nextFundingTime;
      startCountdown();
    } catch (err) {
      console.error("Failed to fetch snapshot:", err);
    }
  };

  // -------- WebSocket --------
  const startSocket = () => {
    if (ws) ws.close();
    const stream = `${_symbol.value.toLowerCase()}@ticker/${_symbol.value.toLowerCase()}@markPrice`;
    ws = new WebSocket(`wss://fstream.binance.com/stream?streams=${stream}`);

    ws.onmessage = (msg) => {
      const { stream, data } = JSON.parse(msg.data);

      if (data.s !== _symbol.value) return;

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
        fundingRate.value = parseFloat(data.r) * 100;
        nextFundingTime = data.T;
        startCountdown();
      }
    };
  };

  // -------- Refresh Symbol --------
  const refreshSymbol = async (newSymbol) => {
    _symbol.value = newSymbol.toUpperCase();

    await fetchSnapshot();
    startSocket();
  };

  watch(
    symbolRef,
    async (newSymbol) => {
      if (!newSymbol) return;
      await refreshSymbol(newSymbol);
    },
    { immediate: true }
  );

  // onMounted(async () => {
  //   await refreshSymbol(_symbol.value);
  // });

  onUnmounted(() => {
    if (ws) ws.close();
    clearInterval(countdownTimer);
  });

  const setSymbol = (newSymbol) => {
    symbolRef.value = newSymbol;
  };

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
