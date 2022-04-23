import axios from 'axios'

export const submit = (url, data) => {
  return axios.post("https://planetapi.coolchong.cn" + url, data);
}
