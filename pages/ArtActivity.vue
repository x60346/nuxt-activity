<template>
    <div class="bg-emerald-200 dark:bg-emerald-900">
        <ul class="max-w-screen-xl mx-auto p-1 mb-3 flex gap-3 justify-evenly flex-wrap">
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[0],'text-white':typeSelect[0],'dark:bg-emerald-700':typeSelect[0]}" @click="getActionByType(7),changeType(0)">
                講座
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[1],'text-white':typeSelect[1],'dark:bg-emerald-700':typeSelect[1]}" @click="getActionByType(1),changeType(1)">
                音樂
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[2],'text-white':typeSelect[2],'dark:bg-emerald-700':typeSelect[2]}" @click="getActionByType(2),changeType(2)">
                戲劇
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[3],'text-white':typeSelect[3],'dark:bg-emerald-700':typeSelect[3]}" @click="getActionByType(3),changeType(3)">
                舞蹈
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[4],'text-white':typeSelect[4],'dark:bg-emerald-700':typeSelect[4]}" @click="getActionByType(4),changeType(4)">
                親子
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[5],'text-white':typeSelect[5],'dark:bg-emerald-700':typeSelect[5]}" @click="getActionByType(8),changeType(5)">
                電影
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[6],'text-white':typeSelect[6],'dark:bg-emerald-700':typeSelect[6]}" @click="getActionByType(6),changeType(6)">
                展覽
            </li>
            <li class=" cursor-pointer rounded text-emerald-800 hover:bg-emerald-700 hover:text-white dark:text-gray-100 dark:hover:bg-emerald-700 p-2" :class="{'bg-emerald-700':typeSelect[7],'text-white':typeSelect[7],'dark:bg-emerald-700':typeSelect[7]}" @click="getActionByType(15),changeType(7)">
                其他
            </li>
        </ul>
    </div>
    <div class="max-w-screen-xl mx-auto p-3">
        <div class="relative flex flex-col gap-y-2 min-h-50">
            <nuxt-link v-for="n in nowPage" :key="n.UID" :to="{path:'/activityInfo/'+ n.UID}" class="listItem p-2 mx-2 ">{{ n.title }}</nuxt-link>
            <div v-show="nowLoading" class=" absolute top-0 left-0 w-full bg-gray-100 h-full rounded flex items-center justify-center dark:bg-gray-800">
                Loading...
            </div> 
        </div>
    </div>
    
</template>

<script setup name="ArtActivity">
    import { useApiStore } from '@/stores/Api';

    const { getApiActionByType } = useApiStore()

    let nowPage = reactive([])
    let nowLoading = ref(true)
    async function getActionByType(type){
        nowLoading.value = true
        const abt = await getApiActionByType(type)
        nowPage.splice(0)
        for(let i=0 ; i<30 ;i++){
            nowPage.push(abt.data[i])
        }
            nowLoading.value = false
    }
    let typeSelect = reactive([true,false,false,false,false,false,false,false])
    function changeType(n){
        typeSelect.forEach((item,index)=>{
            typeSelect[index] = false
        })
        typeSelect[n] = true
    }
    onMounted(()=>{
        getActionByType(7)
        window.scrollTo(0,0)
    })
</script>

<style scoped>
    
</style>