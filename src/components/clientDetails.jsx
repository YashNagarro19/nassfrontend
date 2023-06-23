import React, { createContext, useState } from "react";
import {
    MDBContainer,
    MDBInput,
    MDBRadio,
    MDBTextArea,
    MDBBtn
  }
  from 'mdb-react-ui-kit';
import countries from './countries.json';
import companySize from './companySize.json';
import Select from 'react-select';

const ClientDetails=() => {
    const [clientname,setClientName]=useState(""); 
    const [description,setDescription]=useState(""); 
    const [domain,setDomain]=useState(""); 
    const [country,setCountry] = useState([]);
    const [size,setSize] = useState([]);
    
    const handleSubmitButtonClick = ()=>{
        var userId = sessionStorage.getItem("userID");
        var details = {
            clientName: clientname,
            description: description,
            geography: country,
            domain: domain,
            companySize: size,
            userId: userId
        };
        var clientDetails = JSON.stringify(details);
        console.log(clientDetails);
    }

    const handleResetButtonClick = ()=>{

    }

    const handleCountryChange = (selectedCountry) => {
        setCountry(selectedCountry.value);
    }

    const handleSize = (selectedSize) => {
        setSize(selectedSize.value);
    }

    //var countryLst = JSON.parse(countries);
    return(
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <label className="form-label">Name</label>
            <MDBInput wrapperclassName='mb-4' type='text' id='clientName' onChange={(e) =>  setClientName(e.target.value)}/>
            <label className="form-label">Description</label>
            <MDBTextArea wrapperclassName='mb-4' id='description' onChange={(e) =>  setDescription(e.target.value)}></MDBTextArea>
            <label className="form-label">Domain</label>
            <MDBInput wrapperclassName='mb-4' type='text' id='domain' onChange={(e) =>  setDomain(e.target.value)}/>
            <label className="form-label">Geography</label>
            <div>
            {
                <Select placeholder="Select your country" onChange={handleCountryChange}
                options={countries.map(opt => ({ label: opt.name, value: opt.name }))}>
                </Select>
            }
            </div>
            <label className="form-label">Company Size</label>
            <div>
            {
                <Select placeholder="Choose company size" isSearchable={false} onChange={handleSize}
                options={companySize.map(opt => ({ label: opt.size, value: opt.id }))}>
                </Select>
            }
            </div>
            <div className="container mb-5">
                <div>
                    <button type="button" className="btn btn-secondary" onClick={handleResetButtonClick}>Reset</button>
                    <button type="button" className="btn btn-success" onClick={handleSubmitButtonClick}>Submit</button>
                </div>
            </div>
        </MDBContainer>
    );
    
}

export default ClientDetails;