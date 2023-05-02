import React, { useEffect, useState } from "react";
import "./displayQuestion.css"


function DisplayQuestion() {
  const [data, setData] = useState([]);
  
  //const [activeQuestion, setActiveQuestion] = useState(0)
  useEffect(() => {
    fetch("https://nasswebapp.azurewebsites.net/getQuestions",{method:'get'})
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  });

    const quiz  = data
    //console.log(quiz)
    var jp = require('jsonpath');
   
    var question = jp.query(quiz,'$.questionList')
    //console.log(question);

    // document.body.onload = addElement;

    // function addElement() {
    //   // create a new div element
    //   const newDiv = document.createElement("div");

    //   // and give it some content
    //   const newContent = document.createDocumentFragment();

    //   const questionsList = jp.query(quiz,'$.questionList');
    //   // add the text node to the newly created div
    //   newDiv.appendChild(newContent);

    //   // add the newly created element and its content into the DOM
    //   const currentDiv = document.getElementById("div1");
    //   document.body.insertBefore(newDiv, currentDiv);
    // }

    // const element = document.getElementById("dynamicDiv"); // assuming ul exists
    // const fragment = document.createDocumentFragment();
    // const browsers = jp.query(quiz,'$.questionList');

    // browsers.forEach((browser) => {
    //   const li = document.createElement("li");
    //   li.textContent = browser;
    //   fragment.appendChild(li);
    // });

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    var questionCount = jp.query(quiz,"$..question").length
    //console.log(questionCount)
    var questionValue ='$.questionList['+ currentQuestion +'].question'
    var optionAValue = '$.questionList['+ currentQuestion +'].optionA'
    var optionBValue = '$.questionList['+ currentQuestion +'].optionB'
    var optionCValue = '$.questionList['+ currentQuestion +'].optionC'
    var optionDValue = '$.questionList['+ currentQuestion +'].optionD'

    const setQuestionId = (currentQuestion)=>{
      questionValue ='$.questionList['+ currentQuestion +'].question'
      optionAValue = '$.questionList['+ currentQuestion +'].optionA'
      optionBValue = '$.questionList['+ currentQuestion +'].optionB'
      optionCValue = '$.questionList['+ currentQuestion +'].optionC'
      optionDValue = '$.questionList['+ currentQuestion +'].optionD'
    }

    const handleNextButtonClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionCount) {
      setCurrentQuestion(nextQuestion);
      setQuestionId(nextQuestion)
      if(nextQuestion == questionCount-1){
        setShowSubmit(true)
      }
    }
  };

    const handleBackButtonClick = () => {
      const nextQuestion = currentQuestion - 1;
      if (nextQuestion >= 0) {
        setCurrentQuestion(nextQuestion);
        setQuestionId(nextQuestion)
        setShowSubmit(false)
      } 
      else{
        alert("You reached the first question")
      }
    };

    const handleSubmitButtonClick = ()=>{
          alert("saved successfully")
    };

    const handleResetButtonClick = ()=>{
      document.getElementById('one').checked=false;
      document.getElementById('two').checked=false;
      document.getElementById('three').checked=false;
      document.getElementById('four').checked=false;
    };

  return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <p className="fw-bold">Q{currentQuestion + 1}: {jp.query(quiz,questionValue)}</p>
            <div>
              <input type="radio" name="box" id="one" />
              <label htmlFor="one" className="box first">
                <div className="course">
                  <span className="circle"></span>
                  <span className="subject">{jp.query(quiz,optionAValue)}  </span>
                </div>
              </label>
              <input type="radio" name="box" id="two" />
              <label htmlFor="two" className="box second">
                <div className="course"> 
                <span className="circle"></span> 
                <span className="subject">{jp.query(quiz,optionBValue)} </span>  
                </div>
              </label>
              <input type="radio" name="box" id="three" />
              <label htmlFor="three" className="box third">
                <div className="course"> 
                <span className="circle"></span> 
                <span className="subject"> {jp.query(quiz,optionCValue)} </span>
                </div>
              </label>
              <input type="radio" name="box" id="four" />
              <label htmlFor="four" className="box forth">
                <div className="course"> 
                  <span className="circle"></span> 
                  <span className="subject"> {jp.query(quiz,optionDValue)}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
             <div>
          <button type="button" class="btn btn-secondary" onClick={handleBackButtonClick} >Previous</button>
          {/* <button type="button" class="btn btn-info" onclick={handleResetButtonClick}>Reset</button> */}
          {
            showSubmit?
            (<button type="button" class="btn btn-success" onClick={handleSubmitButtonClick} >Submit</button>):
            (<button type="button" class="btn btn-warning" onClick={handleNextButtonClick} >Next</button>)             
          }            
        </div>
      </div>
    );
}

export default DisplayQuestion;

//setData(result)