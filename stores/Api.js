import { defineStore } from "pinia";
import axios from "axios";

export const useApiStore = defineStore('Api',()=>{
    const apiService = axios.create({
        baseURL:'https://cloud.culture.tw/frontsite'
    })
    async function getApiTitleRecommend(){
        try {
            const d = await apiService.get('/trans/SearchShowAction.do?method=doFindIssueTypeJ')
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getApiHotActivity(){
        try {
            const d = await apiService.get('/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesByCategory&category=6')
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getApiFestival(){
        try {
            const d = await apiService.get('/trans/SearchShowAction.do?method=doFindFestivalTypeJ')
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getApiActionByType(type){
        try {
            const d = await apiService.get('/trans/SearchShowAction.do',{
                params:{
                    method:'doFindTypeJ',
                    category:type
                }
            })
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getApiNearbyActivity(lat,lon){
        try {
            const d = await apiService.get('/opendata/activityOpenDataJsonAction.do',{
                params:{
                    method:'doFindActivitiesNearBy',
                    lat,
                    lon,
                    range:4
                }
            })
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getApiInfo(uuid){
        try {
            const d = await apiService.get('/opendata/activityOpenDataJsonAction.do',{
                params:{
                    method:'doFindActivityById',
                    id:uuid
                }
            })
            return d
        } catch (error) {
            console.log(error.message);
        }
    }
    return {getApiTitleRecommend, getApiHotActivity, getApiFestival, getApiActionByType, getApiNearbyActivity, getApiInfo}
})