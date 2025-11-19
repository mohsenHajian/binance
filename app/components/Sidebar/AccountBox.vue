<template>
  <div class="flex flex-col box drag-handle h-[45vh]">
    <div
      class="flex items-center w-full px-4 text-[#EAECEF] h-10 border-b border-[#333B47] text-sm"
    >
      Account
    </div>
    <div class="flex flex-col w-full px-4 mt-2.5">
      <p class="w-full text-xs text-left font-semibold mb-2.5">Margin Ratio</p>
      <div class="flex w-full items-center justify-between">
        <span class="text-[#707A8A] font-normal text-xs">Margin Ratio</span>
        <div class="flex items-center gap-0.5">
          <span class="text-[#2EBD85] text-xs font-normal">0.00%</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="m326.1 231.9l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1a173.13 173.13 0 0 1 254.8 0a25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
              d="M256 128v32m160 128h-32m-256 0H96m69.49-90.51l-22.63-22.63m203.65 22.63l22.63-22.63"
            />
          </svg>
        </div>
      </div>
      <div class="flex w-full items-center justify-between mt-1">
        <span class="text-[#707A8A] font-normal text-xs"
          >Maintenance Margin</span
        >
        <span class="text-[#EAECEF] font-normal text-xs">0.0000 USDT</span>
      </div>
      <div class="flex w-full items-center justify-between mt-1">
        <span class="text-[#707A8A] font-normal text-xs">Margin Balance</span>
        <span class="text-[#EAECEF] font-normal text-xs">0.0000 USDT</span>
      </div>
      <div
        class="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[#333B47]"
      >
        <button
          class="grow h-6 flex items-center justify-center disabled:bg-[#29313D] disabled:text-[#4F5867] rounded-[4px] text-xs font-semibold disabled:cursor-not-allowed"
          :disabled="true"
        >
          Transfer
        </button>
        <button
          class="grow h-6 flex items-center justify-center disabled:bg-[#29313D] disabled:text-[#4F5867] rounded-[4px] text-xs font-semibold disabled:cursor-not-allowed"
          :disabled="true"
        >
          Buy Crypto
        </button>
        <button
          class="grow h-6 flex items-center justify-center disabled:bg-[#29313D] disabled:text-[#4F5867] rounded-[4px] text-xs font-semibold disabled:cursor-not-allowed"
          :disabled="true"
        >
          Swap
        </button>
      </div>
    </div>
  </div>
</template>
