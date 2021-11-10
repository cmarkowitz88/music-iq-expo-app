import axios from 'axios'


export default {
     getData: () =>
    
    axios({
      "method": "GET",
      "url": "http://127.0.0.1:3000/getQuestions",
      "headers": {
        "content-type": "application/json",
        "useQueryString": true
      }, "params": {
        "language_code": "en"
      }
    })
      
  }