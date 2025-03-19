<template>
    <div class="max-w-screen-xl mx-auto p-3">
        <h2 class="mb-3 text-2xl">節慶活動</h2>
        <div class="relative flex flex-col min-h-50 rounded overflow-hidden mb-3" >
            <div class="flex flex-col" v-for="(n,index) in nowPage" :key="n.actId">
                <div @click="showListContent(index)" class="flex flex-auto items-center hover:bg-emerald-200 p-3 dark:hover:bg-emerald-900" :class="{'dark:bg-emerald-900':!listIsClose[index],'dark:bg-gray-800':listIsClose[index],'bg-emerald-200':!listIsClose[index],'bg-white':listIsClose[index]}">
                    <h2 class="inline-block">{{ n.actName }}</h2>
                    <font-awesome v-show="listIsClose[index]" class="ml-auto" icon="chevron-down"/>
                    <font-awesome v-show="!listIsClose[index]" class="ml-auto" icon="chevron-up"/>
                </div>
                <div :class="{'hidden':listIsClose[index]}" class=" grid grid-cols-12 bg-emerald-100 px-6 py-4 dark:bg-gray-600">
                    <div class="col-span-12 md:col-span-6 mb-3">
                        <div class="mb-2">
                            <strong>
                                <font-awesome icon="location-dot" />
                                {{ n.cityName }}
                            </strong>
                        </div>
                        <p class="indent-8">{{ n.description }}</p>
                    </div>
                    <div class="col-span-12 md:col-span-5 md:col-start-8">
                        <div class="flex gap-2 items-center">
                            <font-awesome icon="map-location-dot"/>
                            {{ n.address }}
                        </div>
                        <div class="flex gap-2 items-center">
                            <font-awesome icon="calendar-days" />
                            {{ n.startTime }}～{{ n.endTime }}
                        </div>
                        <div class="flex gap-2 items-center">
                            <font-awesome icon="phone" />
                            {{ n.tel }}
                        </div>
                        <div class="flex gap-2 items-center">
                            <font-awesome icon="sitemap" />
                            {{ n.org }}
                        </div>
                        <div class="flex gap-2 items-center" v-show="n.website">
                            <font-awesome icon="window-maximize" />
                            <a class="italic text-emerald-500 hover:text-emerald-600" :href="n.website">{{ n.website }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="nowLoading" class=" absolute top-0 left-0 w-full bg-gray-100 h-full rounded p-2 flex items-center justify-center dark:bg-gray-800">
                Loading...
            </div>
        </div>
        <ul class="flex justify-center gap-3">
            <li class="p-2 border-b  border-emerald-600 rounded dark:border-emerald-400" :class="{'bg-gray-400':cantPre,'cursor-default':cantPre,'dark:bg-gray-600':cantPre,'dark:text-gray-700':cantPre,'bg-white':!cantPre,'cursor-pointer':!cantPre,'hover:bg-emerald-100':!cantPre,'dark:bg-gray-800':!cantPre,'dark:text-white':!cantPre,'dark:hover:bg-emerald-600':!cantPre,'dark:hover:border-gray-300':!cantPre}" @click="prePage">
                &laquo;
            </li>
            <li class=" p-2 border-b cursor-pointer border-emerald-600 hover:bg-emerald-100 rounded dark:border-emerald-400 dark:text-white dark:hover:bg-emerald-600 dark:hover:border-gray-300 " @click="getNowPageInfo(p.pageNum),isPage(p.pageId)" :class="{'bg-emerald-100':p.pageActive,'dark:bg-emerald-600':p.pageActive,'bg-white':!p.pageActive,'dark:bg-gray-800':!p.pageActive,'dark:border-gray-300':!p.pageActive,'dark:border-gray-300':p.pageActive}" v-for="p in allPageNum" :key="p.pageId">
                {{ p.pageNum }}
            </li>
            <li class="p-2 border-b  border-emerald-600  rounded dark:border-emerald-400" :class="{'bg-gray-400':cantNext,'cursor-default':cantNext,'dark:bg-gray-600':cantNext,'dark:text-gray-700':cantNext,'bg-white':!cantNext,'cursor-pointer':!cantNext,'hover:bg-emerald-100':!cantNext,'dark:bg-gray-800':!cantNext,'dark:hover:text-white':!cantNext,'dark:hover:bg-emerald-600':!cantNext,'dark:hover:border-gray-300':!cantNext}" @click="nextPage">
                &raquo;
            </li>
        </ul>
    </div>
</template>
<script setup name="Festival">
    import { useApiStore } from '@/stores/Api';

    const { getApiFestival } = useApiStore()

    let nowPage = reactive([])
    let allPage = reactive([])
    let nowPageNum = ref(1)
    let allPageNum = computed(()=>{
        let n = Math.ceil(allPage.length / 10)
        let page = []
        for( let i=0 ; i<n ; i++ ){
            if(i===0){
                let p = {
                    pageNum: i+1,
                    pageId: i+1,
                    pageActive:true
                }
                page.push(p)
            } else {
                let p = {
                    pageNum: i+1,
                    pageId: i+1,
                    pageActive:false
                }
                page.push(p)
            }
        }
        return page
    })
    let nowLoading = ref(true)
    // 取得資料
    async function getFestival(){
        nowLoading.value = true
        const f = await getApiFestival()
        Object.assign(allPage,f.data)
        getNowPageInfo(1)
        nowLoading.value = false    
    }
    // 取得當前頁面資料
    function getNowPageInfo(n){
        nowPage.splice(0)
        for(let i=10*n-10 ; i<10*n ;i++){
            if(allPage[i]){
                nowPage.push(allPage[i])
            }
        }
        window.scrollTo(0,0)
    }
    // 手風琴開合
    let listIsClose = reactive([false,true,true,true,true,true,true,true,true,true])
    function showListContent(index){
        for(let i=0 ; i<listIsClose.length ; i++){
            if(i != index){
                listIsClose[i] = true
            }
        }
        listIsClose[index] = !listIsClose[index]
    }
    // 頁數判斷
    let cantPre = ref(true)
    let cantNext = ref(false)
    function isPage(id){
        allPageNum.value.forEach(item=>{
            item.pageActive = false
            if(item.pageId === id){
                item.pageActive = true
                nowPageNum.value = item.pageNum
            }
        })
        cantPre.value = false
        cantNext.value = false
        if(nowPageNum.value === 1){
            cantPre.value = true
        }
        if(nowPageNum.value === allPageNum.value.length){
            cantNext.value = true
        }
        for(let i=0 ; i<listIsClose.length ; i++){
            listIsClose[i] = true
        }
    }
    // 下、上一頁
    function prePage(){        
        if(nowPageNum.value > 1){
            nowPageNum.value -= 1
            isPage(nowPageNum.value)
            getNowPageInfo(nowPageNum.value)
        }
    }
    function nextPage(){
        if(nowPageNum.value < allPageNum.value.length){
            nowPageNum.value += 1
            isPage(nowPageNum.value)
            getNowPageInfo(nowPageNum.value)
        }
    }
    onMounted(()=>{
        getFestival()
        window.scrollTo(0,0)
    })
</script>
<style scoped>
    
</style>