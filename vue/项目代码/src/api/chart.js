import instance from '@/utils/request.js'
function getChartData(data) {
    return instance({
        url: "/data/title",
        method: "post",
        data      //data: data   
    })
}
function getStatistics(data) {
    return instance({
        url: "/data/statistics",
        method: "post",
        data      //data: data   
    })
}

export { getChartData, getStatistics }