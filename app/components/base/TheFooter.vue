<script setup>
import { onMounted } from "vue";
import { useCryptoListApi } from "../../composable/useCryptos";
import { useRouter, useRoute } from "#imports";

const { coins, loading, fetchCoins } = useCryptoListApi();

const router = useRouter();
const route = useRoute();

onMounted(() => {
  fetchCoins(20, 1);
});

function selectCoin(symbol) {
  router.replace({
    query: {
      ...route.query,
      symbol: symbol.toLowerCase(),
    },
  });
}
</script>

<template>
  <div
    class="fixed bottom-0 w-full overflow-hidden h-8 items-center bg-[#181A20] border-t-4 border-[#0b0e11]"
  >
    <div v-if="loading" class="text-white text-center">Loading...</div>
    <div v-else class="ticker-wrapper whitespace-nowrap">
      <div class="ticker animate-scroll">
        <span
          v-for="coin in coins"
          :key="coin.id"
          class="inline-block mx-4 text-white font-mono text-[12px] text-[#4F5867] hover:text-[#4F5867]/95 cursor-pointer"
          @click="selectCoin(coin.symbol)"
        >
          <img :src="coin.image" alt="" class="inline w-3 h-3 mr-1" />
          {{ coin.symbol }}
          <span
            :class="
              coin.price_change_percentage_24h >= 0
                ? 'text-green-400'
                : 'text-red-400'
            "
          >
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </span>
        </span>
        <!-- Duplicate for seamless scroll -->
        <span
          v-for="coin in coins"
          :key="coin.id + '-dup'"
          class="inline-block mx-6 text-white font-mono text-[12px] text-[#4F5867] hover:text-[#4F5867]/95 cursor-pointer"
          @click="selectCoin(coin.symbol)"
        >
          <img :src="coin.image" alt="" class="inline w-3 h-3 mr-1" />
          {{ coin.symbol }}
          <span
            :class="
              coin.price_change_percentage_24h >= 0
                ? 'text-green-400'
                : 'text-red-400'
            "
          >
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.ticker {
  display: inline-block;
  white-space: nowrap;
}

/* Scroll animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: inline-block;
  white-space: nowrap;
  animation: scroll 60s linear infinite;
  animation-play-state: running; /* حالت پیش‌فرض */
}

.ticker-wrapper:hover .animate-scroll {
  animation-play-state: paused;
}
</style>
