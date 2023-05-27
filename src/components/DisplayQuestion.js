import React, { useEffect, useState } from "react";
import "./displayQuestion.css"

function DisplayQuestion() {

    const initialAnsList =[{}]
    const [ansList, setAnsList] = useState([]);
    //var ansList  = []
    const [data, setData] = useState([]);
    //const [activeQuestion, setActiveQuestion] = useState(0)
    useEffect(() => {
      fetch("http://127.0.0.1:8000/getQuestions",{method:'get'})
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.error(error));
    });

    const quiz  = data
    //console.log(quiz)
    var jp = require('jsonpath');
    var question = jp.query(quiz,'$.questionList')
    //console.log(question);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    var questionCount = jp.query(quiz,"$..question").length
    //console.log(questionCount)
    var questionValue ='$.questionList['+ currentQuestion +'].question'
    var questionId = '$.questionList['+ currentQuestion +'].questionId'
    var optionAValue = '$.questionList['+ currentQuestion +'].optionA'
    var optionBValue = '$.questionList['+ currentQuestion +'].optionB'
    var optionCValue = '$.questionList['+ currentQuestion +'].optionC'
    var optionDValue = '$.questionList['+ currentQuestion +'].optionD'

    const setQuestionId = (currentQuestion)=>{
      questionValue= '$.questionList['+ currentQuestion +'].question'
      questionId   = '$.questionList['+ currentQuestion +'].questionId'
      optionAValue = '$.questionList['+ currentQuestion +'].optionA'
      optionBValue = '$.questionList['+ currentQuestion +'].optionB'
      optionCValue = '$.questionList['+ currentQuestion +'].optionC'
      optionDValue = '$.questionList['+ currentQuestion +'].optionD'
    }

//#region Button click region

    const handleNextButtonClick = () => {
        
      var qId = jp.query(quiz,questionId)[0];
      var ansId = '';
      if(document.getElementById('one').checked){
            ansId = jp.query(quiz,optionAValue)[0]
      }
      if(document.getElementById('two').checked){
        ansId = jp.query(quiz,optionBValue)[0]
      }
      if(document.getElementById('three').checked){
        ansId = jp.query(quiz,optionCValue)[0]
      }
      if(document.getElementById('four').checked){
        ansId = jp.query(quiz,optionDValue)[0]
      }

      console.log("before anslist")
      // ansList.push(ans)
      const newItem = {qId: qId, aId : ansId };
      console.log(newItem)
      const updatedArray = [...ansList, newItem];
      setAnsList((updatedArray));

      //setAnsList(ansList => ansList.concat(ans))
      console.log(ansList)

      const nextQuestion =  currentQuestion+ 1;
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

    //#endregion

  return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <p className="fw-bold">Q{currentQuestion + 1}: {jp.query(quiz,questionValue)}</p>
            <div>
              
              <label htmlFor="one" className="box first">
                <div className="course">
                  <input type="radio" className="circle" name="box" id="one" />
                  <span className="subject">{jp.query(quiz,optionAValue)}  </span>
                </div>
              </label>
              
              <label htmlFor="two" className="box second">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="two" />
                <span className="subject">{jp.query(quiz,optionBValue)} </span>  
                </div>
              </label>
              
              <label htmlFor="three" className="box third">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="three" />
                <span className="subject"> {jp.query(quiz,optionCValue)} </span>
                </div>
              </label>
              
              <label htmlFor="four" className="box forth">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="four" />
                  <span className="subject"> {jp.query(quiz,optionDValue)}</span>
                </div>
              </label>
            
            </div>
          </div>
        </div>
             <div >
                <button type="button" className="btn btn-secondary" onClick={handleBackButtonClick} >&lt; Previous</button>
                {/* <button type="button" className="btn btn-info" onclick={handleResetButtonClick}>Reset</button> */}
                {
                  showSubmit?
                  (<button type="button" className="btn btn-success" onClick={handleSubmitButtonClick} >Submit</button>):
                  (<button type="button" className="btn btn-success" onClick={handleNextButtonClick} > Next &gt; </button>)             
                }            
              </div>
        </div>
    );
}

export default DisplayQuestion;