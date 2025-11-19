import { ref } from "vue";

export const useCryptoListApi = () => {
  const coins = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCoins = async (perPage = 20, page = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const binanceInfo = await $fetch(
        "https://fapi.binance.com/fapi/v1/exchangeInfo"
      );
      const futuresSymbols = binanceInfo.symbols.map((s) => s.symbol);

      const data = await $fetch(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          method: "GET",
          params: {
            vs_currency: "usd",
            order: "volume_desc",
            per_page: perPage,
            page: page,
            sparkline: false,
            price_change_percentage: "24h",
          },
        }
      );

      const filtered = data
        .map((c) => {
          const binanceSymbol = c.symbol.toUpperCase() + "USDT";
          return {
            id: c.id,
            symbol: binanceSymbol,
            name: c.name,
            image: c.image,
            current_price: c.current_price,
            price_change_percentage_24h: c.price_change_percentage_24h,
          };
        })
        .filter((c) => futuresSymbols.includes(c.symbol));

      coins.value = filtered;
    } catch (err) {
      error.value = "خطا در دریافت لیست ارزها";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    coins,
    loading,
    error,
    fetchCoins,
  };
};
