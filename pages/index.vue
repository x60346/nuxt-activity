<template>
    <div class="p-3 mx-auto max-w-screen-xl">
        <div class="text-center text-3xl bg-gray-100 rounded shadow-2xs p-6 mb-3 dark:bg-emerald-800 dark:shadow-gray-500">
            <h1>{{ recommendT.title }}</h1>
        </div>
        <div class="grid grid-cols-12 rounded bg-gray-100 shadow-2xs px-3 mb-3 dark:bg-gray-800">
            <div class="col-span-12 flex items-center md:mb-0 md:col-span-4 md:me-3">
                <h2 class="px-3 py-6 mb-0">{{ recommendT.content }}</h2>
            </div>
            <div class="col-span-12 bg-emerald-600 shadow-2xs shadow-emerald-400 rounded px-3 mb-6 py-5 md:col-span-8 md:mt-3 dark:bg-emerald-700 dark:shadow-gray-500">
                <h4 class=" text-2xl text-white px-3 pb-2 mb-2">熱門活動：</h4>
                    <div class="flex flex-col gap-2 px-3">
                        <button v-for="h in hotActivity" :key="h.uuid" v-show="h.title" class="listItem line-clamp-1 w-full text-left break-all p-3 " @click="toActivityInfo(h.uuid)">{{ h.title }}</button>
                        <button v-for="(n,index) in hotNum" :key="index" v-show="!showHotActivity" class="listItem line-clamp-1 w-full text-left break-all p-3" disabled>讀取中……</button>
                    </div>
            </div>
        </div>
        <div class="grid grid-cols-2 text-center md:gap-3">
            <nuxt-link :to="{name:'Festival'}" class="button col-span-2 text-2xl mb-3 p-3 md:col-span-1 md:px-3 md:py-4 md:mb-0 dark:shadow-gray-500">節慶相關</nuxt-link>
            <nuxt-link :to="{name:'AroundActivity'}" class="button col-span-2 text-2xl mb-3 p-3 md:col-span-1 md:px-3 md:py-4 md:mb-0 dark:shadow-gray-500">周圍活動</nuxt-link>
        </div>
    </div>

</template>

<script setup name="index">
    import { useApiStore } from '@/stores/Api';

    const { getApiTitleRecommend , getApiHotActivity} = useApiStore()

    // 標語
    let recommendT = reactive({
    title:'',
    content:''
    })
    async function getTitleRecommend(){
    const t = await getApiTitleRecommend()
    recommendT.title = t.data.title
    recommendT.content = t.data.note
    }

    // 熱門活動
    let hotActivity = reactive([])
    let showHotActivity = ref(false)
    const hotNum = ref(6)  // 顯示活動數量
    async function getHotActivity(n) {
    const ha = await getApiHotActivity()
    for(let i=0 ; i<n ; i++){
        let a = {
        title:ha.data[i].title,
        uuid:ha.data[i].UID
        }
        hotActivity.push(a)
    }
    showHotActivity.value = true
    }

    // 跳轉資訊頁
    const aRouter = useRouter()
    function toActivityInfo(uuid){
    aRouter.push('/activityInfo/'+ uuid)
    }

    onMounted(()=>{
    getTitleRecommend()
    getHotActivity(hotNum.value)
    window.scrollTo(0,0)
    })
</script>

<style>
    
</style>