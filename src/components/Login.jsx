import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import "./displayQuestion.css";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

const Login=()=>
{ 
    const [email,setEmail]=useState(""); 
    const [password,setPassword]=useState(""); 
    const [dataInput, setDataInput]=useState(""); 
    const navigate = useNavigate();
    const [registerUsername, setRegisterUsername] = useState("");
    const submitThis=()=>{
        const info={email:email,password:password}; 
        console.log(info);
        sessionStorage.setItem("userID",email);
        navigate("/displayQuestions")
        setDataInput([info]);
    }
    
    const registerUser=()=>{
        const info={ registerUsername:registerUsername,registerEmail:email,registerPassword:password}; 
        console.log(info);
        setDataInput([info]);
        navigate("/")
    }

    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
        return;
        }

        setJustifyActive(value);
    };
    
    const handleLinkedInLogin = ()=>{
        console.log("LinkedIn Logic successful");
            return (
                console.log("LinkedIn Logic successful")
            );
    }
    return(
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <label className="form-label">Username</label>
                    <MDBInput wrapperclassName='mb-4' id='registerUsername' type='text' value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)}/>
                </MDBTabsPane>
                <label className="form-label">Email</label>
                <MDBInput wrapperclassName='mb-4' type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label className="form-label">Password</label>
                <MDBInput wrapperclassName='mb-4' type='password'  id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <MDBBtn className="mb-4 w-100" onClick={justifyActive === 'tab1' ? submitThis : registerUser} type='submit'>Sign 
                    {justifyActive === 'tab1' ? "in" : "up"}
                </MDBBtn>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <center>
                        (OR)<br /><br />
                        <MDBBtn className='mx-2' color='tertiary' onClick={handleLinkedInLogin}>
                            <img src={linkedin} alt='LinkedIn' id='loginLinkedIn'></img>
                        </MDBBtn>
                    </center>
                </MDBTabsPane>
            </MDBTabsContent>

        </MDBContainer>
    )
} 

export default Login;