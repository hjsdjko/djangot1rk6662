const base = {
    get() {
        return {
            url : "http://localhost:8080/djangot1rk6662/",
            name: "djangot1rk6662",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "在线考试系统"
        } 
    }
}
export default base
