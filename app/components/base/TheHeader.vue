<template>
  <header
    class="flex items-center justify-between h-[64px] w-full px-4 mb-1.5 bg-[#181a20] relative rounded-lg"
  >
    <div class="flex items-center">
      <svg
        class="w-6 h-fit text-white mx-2"
        xmlns="http://www.w3.org/2000/svg"
        width="1024"
        height="1024"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z"
        />
      </svg>
      <img src="/logo.png" alt="logo" class="mx-2 h-[64px]" />
      <TheDropDown title="Futures" :items="futuresMenu" />
      <TheDropDown title="Options" :items="optionsMenu" />
      <TheDropDown title="Trading  Bots" :items="tradingBots" />
      <TheDropDown title="Copy Trading" />
      <TheDropDown title="Smart Money" />
      <TheDropDown title="Data" :items="data" />
      <TheDropDown title="More" :items="more" />
    </div>

    <div class="flex items-center gap-3">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="text-white hover:text-[#F0B90B] cursor-pointer transition-all w-6"
      >
        <path
          d="M12 2c2.364 0 4.301 4.051 4.484 9.2H21V13h-4.523c-.225 5.053-2.144 9-4.477 9s-4.252-3.947-4.478-9H3v-1.8h4.516C7.699 6.051 9.636 2 12 2zM9.324 13c.105 2.146.54 4.006 1.136 5.332.764 1.697 1.447 1.868 1.54 1.868.093 0 .776-.171 1.54-1.868.597-1.326 1.031-3.186 1.136-5.332H9.324zM12 3.8c-.093 0-.776.171-1.54 1.868C9.845 7.035 9.403 8.97 9.316 11.2h5.368c-.087-2.23-.529-4.165-1.144-5.532C12.776 3.971 12.093 3.8 12 3.8z"
          fill="currentColor"
        ></path>
        <path
          d="M20.698 11.83a8.6 8.6 0 00-8.6-8.6 8.6 8.6 0 00-8.6 8.6 8.6 8.6 0 008.6 8.6 8.6 8.6 0 008.6-8.6zm1.8 0c0 5.743-4.656 10.4-10.4 10.4-5.744 0-10.4-4.657-10.4-10.4 0-5.744 4.656-10.4 10.4-10.4 5.744 0 10.4 4.656 10.4 10.4z"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        class="w-6 text-white hover:text-[#F0B90B] cursor-pointer transition-all"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 1.8c.828 0 1.5.616 1.5 1.374v17.652c0 .758-.672 1.374-1.5 1.374H7.179C4.87 22.2 3 20.487 3 18.375V5.625C3 3.513 4.871 1.8 7.179 1.8H19.5zM7.4 18.5a2.1 2.1 0 00-1.91 1.23c.411.43 1.014.704 1.689.704H19.07V18.5H7.4zM7.18 3.566c-1.243 0-2.25.922-2.25 2.059v11.96a3.883 3.883 0 012.471-.886h11.67V3.566H7.18zm4.716 9.574a1 1 0 01.996 1.005 1 1 0 01-.995 1.005 1 1 0 01-.996-1.005 1 1 0 01.995-1.005zM11.9 5.4c1.622 0 2.9 1.388 2.9 2.9 0 1.266-.935 2.348-2 2.736v.765a.901.901 0 01-1.8 0v-.917c0-.856.677-1.359 1.173-1.533.477-.168.827-.657.827-1.05 0-.559-.512-1.1-1.1-1.1-.207 0-.49.113-.738.362-.248.248-.361.53-.361.738A.901.901 0 019 8.3c0-.793.388-1.51.889-2.012.5-.501 1.219-.889 2.011-.889z"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        class="text-white hover:text-[#F0B90B] cursor-pointer transition-all w-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.14 8.04v7.92L12 19.92l6.86-3.96V8.04L12 4.077 5.14 8.04zm15.52 8.094l-.012.199a1.5 1.5 0 01-.738 1.1l-7.16 4.134-.179.088c-.365.15-.777.15-1.142 0l-.179-.088-7.16-4.134a1.5 1.5 0 01-.737-1.1l-.013-.2V7.867a1.5 1.5 0 01.75-1.299l7.16-4.134a1.5 1.5 0 011.5 0l7.16 4.134a1.5 1.5 0 01.75 1.3v8.267z"
          fill="currentColor"
        ></path>
        <path
          d="M12 8.82l3.182 3.182L12 15.184l-3.182-3.182L12 8.82z"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="text-white w-6 hover:text-[#F0B90B] cursor-pointer transition-all"
      >
        <path
          d="M2 12c0-3.781 2.1-7.07 5.195-8.77.711-.39 1.461.32 1.37 1.126l-.028.282A10.11 10.11 0 008.5 5.5l.013.514a10 10 0 009.472 9.472l.515.013c.388 0 .77-.022 1.146-.065.805-.092 1.516.658 1.126 1.37l-.164.286A9.993 9.993 0 0112 22v-1.8a8.178 8.178 0 006.258-2.905C11.933 17.168 6.83 12.066 6.703 5.742a8.176 8.176 0 00-2.898 5.968L3.8 12a8.2 8.2 0 008.2 8.2V22l-.515-.014a10 10 0 01-9.472-9.472L2 12z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
import TheDropDown from "../utils/TheDropDown.vue";

const futuresMenu = [
  {
    label: "USDT Perpetual",
    children: [
      { label: "BTCUSDT", icon: "/icons/btc.svg" },
      { label: "ETHUSDT", icon: "/icons/eth.svg" },
      { label: "BNBUSDT", icon: "/icons/bnb.svg" },
      { label: "SOLUSDT", icon: "/icons/sol.svg" },
      { label: "XRPUSDT", icon: "/icons/xrp.svg" },
      { label: "DOGEUSDT", icon: "/icons/doge.svg" },
      { label: "ADAUSDT", icon: "/icons/ada.svg" },
      { label: "TRXUSDT", icon: "/icons/trx.svg" },
      { label: "DOTUSDT", icon: "/icons/dot.svg" },

      { label: "SEIUSDT", icon: "/icons/sei.svg" },
      { label: "SUIUSDT", icon: "/icons/sui.svg" },
      { label: "PEPEUSDT", icon: "/icons/pepe.svg" },
      { label: "SHIBUSDT", icon: "/icons/shib.svg" },
    ],
  },
  {
    label: "USDC Perpetual",
    children: [
      { label: "ARBUSDT", icon: "/icons/arb.svg" },
      { label: "OPUSDT", icon: "/icons/op.svg" },
      { label: "SEIUSDT", icon: "/icons/sei.svg" },
      { label: "SUIUSDT", icon: "/icons/sui.svg" },
      { label: "PEPEUSDT", icon: "/icons/pepe.svg" },
      { label: "SHIBUSDT", icon: "/icons/shib.svg" },
    ],
  },
  {
    label: "USDT Delivery",
    children: [
      { label: "MATICUSDT", icon: "/icons/matic.svg" },
      { label: "LTCUSDT", icon: "/icons/ltc.svg" },
      { label: "BCHUSDT", icon: "/icons/bch.svg" },
      { label: "ATOMUSDT", icon: "/icons/atom.svg" },
      { label: "ETCUSDT", icon: "/icons/etc.svg" },
      { label: "XLMUSDT", icon: "/icons/xlm.svg" },
      { label: "FILUSDT", icon: "/icons/fil.svg" },
      { label: "ICPUSDT", icon: "/icons/icp.svg" },
      { label: "APTUSDT", icon: "/icons/apt.svg" },
      { label: "ARBUSDT", icon: "/icons/arb.svg" },
      { label: "OPUSDT", icon: "/icons/op.svg" },
      { label: "SEIUSDT", icon: "/icons/sei.svg" },
      { label: "SUIUSDT", icon: "/icons/sui.svg" },
      { label: "PEPEUSDT", icon: "/icons/pepe.svg" },
      { label: "SHIBUSDT", icon: "/icons/shib.svg" },
    ],
  },
  {
    label: "COIN-M Perpetual",
    children: [
      { label: "SEIUSDT", icon: "/icons/sei.svg" },
      { label: "SUIUSDT", icon: "/icons/sui.svg" },
      { label: "PEPEUSDT", icon: "/icons/pepe.svg" },
      { label: "SHIBUSDT", icon: "/icons/shib.svg" },
    ],
  },
  {
    label: "COIN-M Delivery",
    children: [
      { label: "SUIUSDT", icon: "/icons/sui.svg" },
      { label: "PEPEUSDT", icon: "/icons/pepe.svg" },
      { label: "SHIBUSDT", icon: "/icons/shib.svg" },
    ],
  },
];

const tradingBots = [
  { label: "Overview" },
  { label: "Spot Grid" },
  { label: "Futures Grid" },
  { label: "Futures DCA" },
  { label: "Arbitrage Bot" },
  { label: "Rebalancing Bot" },
  { label: "Spot DCA" },
  { label: "TWAP" },
];
const optionsMenu = [
  {
    label: "Options Home",
    icon: null,
    route: "/options",
  },
  {
    label: "Classic Options",
    icon: "chevron-right",
    children: [
      { label: "BTC Options", icon: "btc", route: "/options/classic/btc" },
      { label: "ETH Options", icon: "eth", route: "/options/classic/eth" },
      { label: "BNB Options", icon: "bnb", route: "/options/classic/bnb" },
      { label: "SOL Options", icon: "sol", route: "/options/classic/sol" },
      { label: "XRP Options", icon: "xrp", route: "/options/classic/xrp" },
      { label: "DOGE Options", icon: "doge", route: "/options/classic/doge" },
    ],
  },
  {
    label: "Easy Options",
    icon: null,
    route: "/options/easy",
  },
  {
    label: "Options RFQ",
    icon: null,
    route: "/options/rfq",
  },
  {
    label: "BLOCK",
    icon: null,
    route: "/options/block",
  },
];
const data = [
  {
    label: "Markets",
  },
  {
    label: "Futures Data",
    children: [
      { label: "Trading Data" },
      { label: "Real-Time Funding Rate" },
      { label: "Funding Rate History" },
    ],
  },
  {
    label: "Options Data",
    children: [
      { label: "Options Data Overview" },
      { label: "Max pain" },
      { label: "Exercised History" },
    ],
  },
  {
    label: "Heatmap",
  },
];
const more = [
  {
    label: "FAQ",
  },
  {
    label: "Learn",
  },
  {
    label: "Spot Trading",
  },
  {
    label: "Demo Trading",
  },
];
</script>

<style scoped></style>
