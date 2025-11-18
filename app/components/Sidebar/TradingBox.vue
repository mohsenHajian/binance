<template>
  <div class="box h-[49vh] flex flex-col px-4 py-3">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-2 mb-2.5">
        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-[70px] h-6 active:opacity-[0.8] cursor-pointer"
        >
          Cross
        </button>
        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-[70px] h-6 active:opacity-[0.8] cursor-pointer"
        >
          20x
        </button>
        <button
          class="flex items-center justify-center rounded-[4px] bg-[#2E343F] text-xs w-fit h-6 px-3 active:opacity-[0.8] cursor-pointer"
        >
          s
        </button>
      </div>
      <svg
        class="text-gray-500 hover:text-white cursor-pointer relative -top-1 w-4 h-fit"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.9 10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 014.9 14h-1a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 013.9 10h1zm7.6 0a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1zm7.6 0a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  </div>
</template>
