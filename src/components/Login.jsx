import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import useLinkedIn, { LinkedIn } from 'react-linkedin-login-oauth2';
import "./displayQuestion.css"

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
        const [registerEmail, setRegisterEmail] = useState("");
        const [registerPassword,setRegisterPassword]=useState(""); 

        const submitThis=()=>{
            const info={email:email,password:password}; 
            console.log(info);
            navigate("/displayQuestions")
            setDataInput([info]);
        }
        
        const registerUser=()=>{
            const info={ registerUsername:registerUsername,registerEmail:registerEmail,registerPassword:registerPassword}; 
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
                //#region commented       
            // <div>
            // 	<form action="" onSubmit={submitThis}> 
            //     <div className="container p-3 my-5 d-flex flex-column w-50">
            // 		<div className='my-3'> 
            // 			<label className='mb-4' htmlFor="email">Email</label>
            // 			<input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
            // 		</div> 
            // 		<div> 
            // 			<label className='mx-4' htmlFor="passw">Password</label>
            // 		    <input type="text" name="passw" id="passw" value={passw} onChange={(e)=>setPassw(e.target.value)}/> 
            // 		</div>  
                    
            //         </div>
            //         <button type="submit" >Login</button>
            // 	</form>
            // </div>
        //#endregion
            
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
                    <MDBTabsPane show={justifyActive === 'tab1'}>
                    <div className="text-center mb-3">
                        <p>Sign in with:</p>
                        <div style={{width: '100%'}}>
                        <MDBBtn  outline rounded className='mx-2' color='info' onClick={handleLinkedInLogin} id='loginLinkedIn' >LinkedIn</MDBBtn>
                        </div>
                        <p className="text-center mt-3">or:</p>
                    </div>
                    <label className="form-label">Email</label>
                    <MDBInput wrapperclassName='mb-4' type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label className="form-label">Password</label>
                    <MDBInput wrapperclassName='mb-4' type='password'  id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <MDBBtn className="mb-4 w-100" onClick={submitThis} type='submit'>Sign in</MDBBtn>
                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">
                        <p>Sign up with:</p>

                        <div style={{width: '100%'}}>
                        <MDBBtn  outline rounded className='mx-2' color='info' id='loginLinkedIn'>LinkedIn</MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>
                    <label className="form-label">Username</label>
                    <MDBInput wrapperclassName='mb-4' id='registerUsername' type='text' value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)}/>
                    <label className="form-label">Email</label>
                    <MDBInput wrapperclassName='mb-4' id='registerEmail' value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)} type='email'/>
                    <label className="form-label">Password</label>
                    <MDBInput wrapperclassName='mb-4' id='registerPassword' type='password' value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)}/>

                    <MDBBtn className="mb-4 w-100" onClick={registerUser} type='submit'>Sign up</MDBBtn>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
        )
    } 

export default Login;