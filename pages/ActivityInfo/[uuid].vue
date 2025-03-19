<template>
    <div class="max-w-screen-xl mx-auto p-3">
        <div class=" relative min-h-72 bg-white rounded p-4 dark:bg-gray-800">
            <div class="mb-2" v-show="info.masterUnit[0]">{{ info.masterUnit[0] }}</div>
            <h2 class="text-2xl mb-3" v-show="info.title">{{ info.title }}</h2>
            <div class="grid grid-cols-12 md:gap-3">
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class=" flex items-center gap-3 mb-3 px-3" v-show="info.showInfo[0].time">
                        <font-awesome icon="calendar-days"/>
                        {{ info.showInfo[0].time }}<span v-show="info.showInfo[0].endTime">～</span>{{ info.showInfo[0].endTime }}
                    </div>
                    <div class="flex items-center gap-3 mb-3 px-3" v-show="info.showInfo[0].location">
                        <font-awesome icon="location-dot" />
                        {{ info.showInfo[0].location }}
                    </div>
                    <div class="flex items-center gap-3 mb-3 px-3" v-show="info.showInfo[0].price[0]">
                        <font-awesome icon="dollar-sign" />
                        <div class="flex flex-col">
                            <div v-for="(i, index) in info.showInfo[0].price" :key="index">{{ i }}</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 text-center p-2" v-show="info.webSales">
                        <a class=" text-xl button p-3" :href="info.webSales">立即報名</a>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6 lg:col-span-8 md:order-first">
                    <div class="p-2 mb-3" v-show="info.descriptionFilterHtml">
                        <div class="border border-emerald-700 rounded p-6 whitespace-pre-line leading-7">
                            {{ info.descriptionFilterHtml }}
                        </div>
                    </div>
                    <div class="flex items-center gap-3 px-3 mb-2" v-show="info.masterUnit[0]">
                        <div>主辦單位：</div>
                        <div>{{ info.masterUnit[0] }}</div>
                    </div>
                    <div class="flex items-start gap-3 px-3 mb-2" v-show="info.subUnit[0] || info.otherUnit[0]" >
                        <div>協辦單位：</div>
                        <div>
                            <div v-show="info.subUnit[0]" >{{ info.subUnit[0] }}</div>
                            <div v-show="info.otherUnit[0]" >{{ info.otherUnit[0] }}</div>
                        </div>
                    </div>
                    <div class="flex items-start gap-3 px-3" v-show="info.sourceWebName">
                        <div>資料來源：</div>
                        <a :href="info.sourceWebPromote" class=" italic text-emerald-500 hover:text-emerald-600">{{ info.sourceWebName }}</a>
                    </div>
                </div> 
            </div>
            <div v-show="nowLoading" class=" absolute top-0 left-0 w-full bg-gray-100 h-full rounded flex items-center justify-center p-2 dark:bg-gray-800 ">
                Loading...
            </div> 
        </div>
    </div>
</template>
<script setup name="ActivityInfo">
    import { useApiStore } from '@/stores/Api';
    const route = useRoute()
    const props = route.params.uuid

    const { getApiInfo } = useApiStore()

    let info = reactive({
        masterUnit:[],
        subUnit:[],
        otherUnit:[],
        title:'',
        descriptionFilterHtml:'',
        showInfo:[
            {
                time:'',
                endTime:'',
                location:'',
                price:[]
            }
        ],
        webSales:'',
        sourceWebName:'',
        sourceWebPromote:''
    })

    let nowLoading = ref(true)

    async function getInfo(){
            nowLoading.value = true
            const i = await getApiInfo(props)
            if(i.data){
                if(i.data[0].showInfo[0]){
                    i.data[0].showInfo[0].price = i.data[0].showInfo[0].price ? i.data[0].showInfo[0].price.split(';') : '-'
                    i.data[0].showInfo[0].location = i.data[0].showInfo[0].location ? i.data[0].showInfo[0].location : '-'
                    
                    if(i.data[0].showInfo[0].time === i.data[0].showInfo[0].endTime){
                        i.data[0].showInfo[0].endTime = ''
                    }
                } else {
                    let data = {
                        time:'-',
                        endTime:'',
                        location:'-',
                        price:'-'
                    }
                    i.data[0].showInfo.push(data)
                }
                i.data[0].descriptionFilterHtml = i.data[0].descriptionFilterHtml ? i.data[0].descriptionFilterHtml : '無介紹內容'
                i.data[0].masterUnit[0] = i.data[0].masterUnit[0] ? i.data[0].masterUnit[0] : '-'

                Object.assign(info,i.data[0])
                // if(!i.data.showInfo){
                //     info.showInfo[0].time = ''
                //     info.showInfo[0].endTime = ''
                //     info.showInfo[0].location = ''
                //     info.showInfo[0].price = ''
                // }
            } else {
                info.descriptionFilterHtml = '此活動沒有提供任何資料'
            }
            nowLoading.value = false
    }

    onMounted(()=>{
        getInfo()
        window.scrollTo(0,0)
    })
</script>
<style scoped>
    
</style>