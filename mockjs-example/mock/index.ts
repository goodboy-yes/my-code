import { MockMethod } from 'vite-plugin-mock'
import Mock from "mockjs"
export default [
  {
    url: '/api/get',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'get请求数据',
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    response: {
      code: 0,
      data: {
        name: 'post请求数据',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    response:()=>{
      return {
        code: 0,
        data: Mock.mock({
          "number|1-100.1-10": 1
        })
      }
    }
    
    
  },
] as MockMethod[]