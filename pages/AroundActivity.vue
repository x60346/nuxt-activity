<template>
    <div class="max-w-screen-xl mx-auto p-3">
        <div class="flex mb-3">
            <h2 class="mr-3 text-2xl">
                周圍活動
                <p class=" text-sm">
                    （{{ userPosition.lon.toFixed(2) }}，{{ userPosition.lat.toFixed(2) }}）
                </p>
            </h2>
            <button class=" cursor-pointer bg-emerald-500 rounded text-white py-2 px-4 hover:bg-emerald-600" @click="getPosition">
                <font-awesome icon="repeat" />
                重新定位
            </button>
        </div>

        <div class="relative flex flex-col gap-y-2 min-h-50">
            <nuxt-link v-for="n in nowPage" :key="n.UID" :to="{path:'/activityInfo/'+ n.UID}" class="listItem p-2 mx-2">{{ n.title }}</nuxt-link>
            <div v-show="nowLoading" class=" absolute top-0 left-0 w-full bg-gray-100 h-full rounded p-2 flex items-center justify-center dark:bg-gray-800">
                Loading...
            </div> 
        </div>
    </div>
    

</template>
<script setup name="AroundActivity">
    import { useApiStore } from '@/stores/Api';

    const { getApiNearbyActivity } = useApiStore()

    // 顯示資訊
    let nowPage = reactive([])
    let nowLoading = ref(true)

    // 取得定位
    let userPosition = reactive({
        lat:0,
        lon:0
    })
    watch(userPosition,value=>{
        getNearbyActivity(value.lat,value.lon)
    })
    function getPosition(){
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(position=>{
                userPosition.lat = position.coords.latitude
                userPosition.lon = position.coords.longitude
                window.scrollTo(0,0)
            },geoLocationError)
        } else {
            alert('當前瀏覽器不支援定位！')
        }
    }
    function geoLocationError(){
        alert("無法找到您的位置，請重新嘗試或確認網路狀態。")
    }
    // 取得定位點附近資訊
    async function getNearbyActivity(lat,lon){
        nowLoading.value = true
        const userPosition = await getApiNearbyActivity(lat,lon)
        nowPage.splice(0)
        Object.assign(nowPage,userPosition.data)
        nowLoading.value = false
    }
    onMounted(()=>{
        getPosition()
        window.scrollTo(0,0)
    })
</script>
<style scoped>
    
</style>