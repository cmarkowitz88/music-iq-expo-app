import axios from 'axios'


export default function getQuestions(){

    
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
      .then((response) => {
        //console.log(response.data)
        //let questions = []
        let questions = response.data;
        //console.log(questions)
        //console.log(questions.length)

        
        // for(var i=0;i<questions.length; i++){
        //     console.log(questions[i]);
        // }
        console.log("In Get Questions Function")
        //console.log(questions);
        return questions;
        
      
      })
      .catch((error) => {
        console.log(error)
      })
  }