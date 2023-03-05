import axios from "axios";
import Element from 'element-ui'
import router from "./router";
//axios.defaults.baseURL = "http://localhost:8081"
axios.defaults.baseURL = "http://124.223.6.219:8081"
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
})
request.interceptors.request.use(config => {
   // config.headers['Authorization'] = localStorage.getItem("token") // 请求头带上token
    if (config.method === 'post') {

        // 修改 Content-Type
        // config.headers['Content-Type'] =
        //     'application/x-www-form-urlencoded';

        // 将对象参数转换为序列化的 URL 形式（key=val&key=val）
        config.data = stringify(config.data);
    }

   // config.data = stringify(config.data); //后面加的
    return config
})


request.interceptors.response.use(response => {

        let res = response.data;
        if (res.code === 200) {
            return response
        } else {

            Element.Message.error(res.msg? res.msg : '系统异常！', {duration: 3 * 1000})
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        if(error.response.status === 401) {
            router.push("/login")
        }
        //Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    }
)
export default request