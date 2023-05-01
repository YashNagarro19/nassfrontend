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

    document.body.onload = addElement;

    function addElement() {
      // create a new div element
      const newDiv = document.createElement("div");

      // and give it some content
      const newContent = document.createDocumentFragment();

      const questionsList = jp.query(quiz,'$.questionList');
      // add the text node to the newly created div
      newDiv.appendChild(newContent);

      // add the newly created element and its content into the DOM
      const currentDiv = document.getElementById("div1");
      document.body.insertBefore(newDiv, currentDiv);
    }

    const element = document.getElementById("dynamicDiv"); // assuming ul exists
    const fragment = document.createDocumentFragment();
    const browsers = jp.query(quiz,'$.questionList');

    browsers.forEach((browser) => {
      const li = document.createElement("li");
      li.textContent = browser;
      fragment.appendChild(li);
    });

    //element.appendChild(fragment);

  return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <p className="fw-bold">{jp.query(quiz,'$.questionList[0].question')}</p>
            <div>
              <input type="radio" name="box" id="one" />
              <label htmlFor="one" className="box first">
                <div className="course">
                  <span className="circle"></span>
                  <span className="subject"> {jp.query(quiz,'$.questionList[0].optionA')} </span>
                </div>
              </label>
              <input type="radio" name="box" id="two" />
              <label htmlFor="two" className="box second">
                <div className="course"> <span className="circle"></span> <span className="subject"> {jp.query(quiz,'$.questionList[0].optionB')}</span>
                </div>
              </label>
              <input type="radio" name="box" id="three" />
              <label htmlFor="three" className="box third">
                <div className="course"> <span className="circle"></span> <span className="subject"> {jp.query(quiz,'$.questionList[0].optionC')} </span>
                </div>
              </label>
              <input type="radio" name="box" id="four" />
              <label htmlFor="four" className="box forth">
                <div className="course"> <span className="circle"></span> <span className="subject"> {jp.query(quiz,'$.questionList[0].optionD')}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      
    );
}

export default DisplayQuestion;

//setData(result)