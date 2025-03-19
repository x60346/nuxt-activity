<template>
    <header class="sticky top-0 z-10" :class="{'dark':darkMode}">
        <nav class="bg-emerald-500 shadow-xs shadow-emerald-900 dark:bg-gray-900 dark:shadow-emerald-300 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between gap-3 mx-auto p-4">
                <NuxtLink to="/" class="text-white text-2xl">藝文查詢平台</NuxtLink>
                <span class="cursor-pointer border border-emerald-300 text-emerald-500 bg-white rounded-2xl  px-2 mr-auto dark:bg-gray-500 dark:text-white dark:border-gray-400" @click="darkModeToggle">
                    <font-awesome v-show="!darkMode" icon="sun"/>
                    <font-awesome v-show="darkMode" icon="moon"/>
                </span>
                <button type="button" @click="nevIsOpenToggle" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                    <font-awesome class=" text-2xl" icon="bars"/>
                </button>
                <div class="w-full md:block md:w-auto" :class="{'hidden':nevIsOpen}" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-emerald-400 rounded-lg md:bg-emerald-500 bg-emerald-100 md:flex-row md:space-x-8  md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <nuxt-link to="/ArtActivity" class="block py-2 px-3 text-emerald-900 rounded-sm md:text-white hover:bg-emerald-700 hover:text-white md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white " active-class="text-white bg-emerald-700 rounded-sm dark:bg-gray-700 md:bg-emerald-700 md:text-emerald-700 ">舞動藝文</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/Festival" class="block py-2 px-3 text-emerald-900 rounded-sm md:text-white hover:bg-emerald-700 hover:text-white md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white " active-class="text-white bg-emerald-700 rounded-sm dark:bg-gray-700 md:bg-emerald-700 md:text-emerald-700 ">節慶活動</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/AroundActivity" class="block py-2 px-3 text-emerald-900 rounded-sm md:text-white hover:bg-emerald-700  hover:text-white md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white " active-class="text-white bg-emerald-700 rounded-sm dark:bg-gray-700 md:bg-emerald-700 md:text-emerald-700 ">查找周圍活動</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main class="bg-gray-200 text-emerald-900 dark:bg-gray-700 dark:text-gray-200" :class="{'dark':darkMode}">
        <slot></slot>
    </main>
    <footer :class="{'dark':darkMode}">
        <div class="text-center bg-emerald-500 text-white p-3 dark:bg-gray-900"><strong>此頁面僅供學習使用</strong></div>
    </footer>
</template>

<script setup name="default">
    let nevIsOpen = ref(true)
    function nevIsOpenToggle(){
        nevIsOpen.value = !nevIsOpen.value
    }

    let darkMode = ref(false)
    function darkModeToggle(){
        darkMode.value = !darkMode.value
    }
</script>

<style>
</style>