import React, { useEffect, useState, useRef } from "react";
import "./displayQuestion.css"
let ansList  = [];

function DisplayQuestion() {

//#region Declaration and assigment of variables

    const [data, setData] = useState([]);
    useEffect(() => {
      fetch("https://nassams.azurewebsites.net/getQuestions",{method:'get'})
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.error(error));
    });

    const quiz  = data
    var jp = require('jsonpath');
    var question = jp.query(quiz,'$.questionList')
    const radioButtonsRef = useRef([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);

    var questionCount = jp.query(quiz,"$..question").length
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

    const getSelectedAns = ()=>{
      var qId = jp.query(quiz,questionId)[0];
      var ansId = null;
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
      return [qId,ansId];
    }

    const checkSelectedAns = (answerId)=>{
      var ansA = jp.query(quiz,optionAValue)[0]
      var ansB = jp.query(quiz,optionBValue)[0]
      var ansC = jp.query(quiz,optionCValue)[0]
      var ansD = jp.query(quiz,optionDValue)[0]
      if(answerId == ansA){
        document.getElementById("one").checked = true;
      }
      if(answerId == ansB){
        document.getElementById("two").checked = true;
      }                
      if(answerId == ansC){
        document.getElementById("three").checked = true;
      }    
      if(answerId == ansD){
        document.getElementById("four").checked = true;
      }     
    }

    const getArrayId = (qId)=>{
      var arrayId = -1
      for (let i = 0; i < ansList.length; i++) {
        if(ansList[i].qId == qId){
          arrayId = i
          break;
        }
      }
      return arrayId;
    }
//#endregion

//#region Button click region

    const handleNextButtonClick = () => {
      var [qId, ansId] = getSelectedAns();
      if(ansId == null)
      {
        alert("Please select option to proceed")
      }
      else{
        const newItem = {qId: qId, aId : ansId};
        if(ansList.length == 0){
          ansList.push(newItem)
        }
        else{
          var arrayId = getArrayId(qId)
          if(arrayId != -1) {
            ansList[arrayId].aId = ansId
          }
          else {
            ansList.push(newItem)
          }
        }
        const nextQuestion =  currentQuestion + 1;
        if (nextQuestion < questionCount) {
          setCurrentQuestion(nextQuestion);
          setQuestionId(nextQuestion)
          qId = jp.query(quiz,questionId)[0];
          if(nextQuestion == questionCount-1){
           setShowSubmit(true)
          }
        }
        var arrayId = getArrayId(qId)
        if(arrayId != -1){
          checkSelectedAns(ansList[arrayId].aId)
        }
        else{
          handleResetButtonClick()
        }
        console.log("ansList next button:",ansList)
      }
    };

    const handlePreviousButtonClick = () =>{
      const previousQuestion = currentQuestion - 1;
      if (previousQuestion < 0) {
        alert("You reached the first question")
      }
      else{
            var [qId, ansId] = getSelectedAns();
            if(ansId == null){
              let updateList =[]
              ansList.forEach((item)=>{
                if(item.qId == qId){
                  updateList = ansList.filter(item => item.qId !== qId);
                  ansList = updateList;
                }
              })
            }
            setCurrentQuestion(previousQuestion);
            setQuestionId(previousQuestion)
            qId = jp.query(quiz,questionId)[0];
            ansList.forEach((item)=>{
              if(item.qId == qId){
                checkSelectedAns(item.aId)
              }
            })
            setShowSubmit(false);
          }
          console.log("ansList previous button: ", ansList)
    };

    const handleSubmitButtonClick = ()=>{
      handleNextButtonClick();
      alert("saved successfully")
    };

    const handleResetButtonClick = ()=>{
      radioButtonsRef.current.forEach((radioButton) => {
        radioButton.checked = false;
      });
    };

//#endregion

//#region Display region
  return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <p className="fw-bold">Q{currentQuestion + 1}: {jp.query(quiz,questionValue)}</p>
            <div>
              
              <label htmlFor="one" className="box first">
                <div className="course">
                  <input type="radio" className="circle" name="box" id="one"  value="optionA" ref={(el) => (radioButtonsRef.current[0] = el)} />
                  <span className="subject">{jp.query(quiz,optionAValue)}  </span>
                </div>
              </label>
              
              <label htmlFor="two" className="box second">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="two" value="optionB" ref={(el) => (radioButtonsRef.current[1] = el)} />
                <span className="subject">{jp.query(quiz,optionBValue)} </span>  
                </div>
              </label>
              
              <label htmlFor="three" className="box third">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="three"  value="optionC" ref={(el) => (radioButtonsRef.current[2] = el)} />
                <span className="subject"> {jp.query(quiz,optionCValue)} </span>
                </div>
              </label>
              
              <label htmlFor="four" className="box forth">
                <div className="course"> 
                <input type="radio" className="circle" name="box" id="four" value="optionD" ref={(el) => (radioButtonsRef.current[3] = el)} />
                  <span className="subject"> {jp.query(quiz,optionDValue)}</span>
                </div>
              </label>
            
            </div>
          </div>
        </div>
             <div >
                <button type="button" className="btn btn-secondary" onClick={handlePreviousButtonClick} >&lt; Previous</button>
                <button type="button" className="btn btn-info" onClick={handleResetButtonClick}>Reset</button>
                {
                  showSubmit?
                  (<button type="button" className="btn btn-success" onClick={handleSubmitButtonClick} >Submit</button>):
                  (<button type="button" className="btn btn-success" onClick={handleNextButtonClick} > Next &gt; </button>)             
                }            
              </div>
        </div>
    );
//#endregion
}

export default DisplayQuestion;