import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";

const fontLabel = {
  color:'#a6a4a2',
  fontSize:12
};

function Update() {
  const [values, setUpdateValues] = useState({
    id: undefined,
    givenName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    homeName: '',
    street: '',
    suburb:'',
    state: '',
    postCode: '',
    country: ''
  })
  
  const {id} = useParams()

  useEffect(()=> {
    axios.get('http://localhost:3000/referrals/' + id)
    .then(res => setUpdateValues(res.data))
    .catch(err => console.log(err)); 
  }, []) 

  const nav = useNavigate();

  const handleUpdate = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newEmail = values.email;
    const isValidEmail = emailRegex.test(newEmail);
    event.preventDefault();
    if (values.givenName === '' || values.surname === '' || values.email === '' || values.phoneNumber === '' ||
      values.homeName === '' || values.street === '' || values.suburb === '' || values.state === '' || values.postCode === '' ||
      values.country === '' || !isValidEmail) {
        const forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.classList.add('was-validated')
          })
    } else {
      axios.put('http://localhost:3000/referrals/' +id, values)
      .then(res => {
        console.log(res)
        nav('/')
      })
      .catch(err => console.log(err));
    }
  }

  return (
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-secondary">
        <div className="w-50 bg-white border shadow px-5 pt-3 pb-5 rounded">
          <h1>Update Referral Builder</h1>
          <br/>
            <h6>Personal Details</h6>
            <br/>
              <form onSubmit={handleUpdate} className="row g-3 needs-validation pb-5" noValidate style={fontLabel}>
                <div className="row pb-3">
                  <br/>
                  <hr/>
                  <div className="col">
                  <div className="mb-2">
                  <label htmlFor="validationGivenName">GIVEN NAME</label>
                  <input type="text" name="givenName" className="form-control" placeholder="Enter Given Name" id="validationGivenName"
                    value={values.givenName} onChange={e => setUpdateValues({...values, givenName:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your Given Name.</div>
                  </div>
                  </div>
                  <div className="col">
                  <div className="mb-2">
                  <label htmlFor="validationSurname">SURNAME</label>
                  <input type="text" name="surname" className="form-control" placeholder="Enter Surname" id="validationSurname"
                    value={values.surname} onChange={e => setUpdateValues({...values, surname:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your Surname.</div>
                  </div>
                  </div>
                </div>
                <div className="row pb-4">
                  <div className="col">
                  <div className="mb-2">
                  <label htmlFor="validationEmail">EMAIL</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter Email" id="validationEmail"
                    value={values.email} onChange={e => setUpdateValues({...values, email:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose the correct Email.</div>
                  </div>
                  </div>
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationPhone">PHONE</label>
                    <input  type="number" min="0" step="1"  name="phoneNumber" className="form-control" placeholder="Enter Phone" id="validationPhone"
                      value={values.phoneNumber} onChange={e => setUpdateValues({...values, phoneNumber:e.target.value})} required></input>
                    <div className="invalid-feedback">Please choose the correct Phone Number.</div>
                  </div>
                  </div>
                </div>
                <br/>
                <h6>Address</h6>
                <br/>
                <div className="row pb-3">
                <hr />
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationHome">HOME NAME OR #</label>
                    <input type="text" name="homeName" className="form-control" placeholder="Enter Home Name" id="validationHome"
                      value={values.homeName} onChange={e => setUpdateValues({...values, homeName:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your home name.</div>
                  </div>
                  </div>
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationStreet">STREET</label>
                    <input type="text" name="street" className="form-control" placeholder="Enter Street" id="validationStreet"
                      value={values.street} onChange={e => setUpdateValues({...values, street:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your street name.</div>
                  </div>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationSuburbs">SUBURB</label>
                    <input type="text" name="suburb" className="form-control" placeholder="Enter Suburb" id="validationSuburbs"
                      value={values.suburb} onChange={e => setUpdateValues({...values, suburb:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your suburbs.</div>
                  </div>
                  </div>
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationState">STATE</label>
                    <input type="text" name="state" className="form-control" placeholder="Enter State" id="validationState"
                      value={values.state} onChange={e => setUpdateValues({...values, state:e.target.value})} required></input>
                    <div className="invalid-feedback">Please choose your State.</div>
                  </div>
                  </div>
                </div>
                <div className="row pb-5">
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationPostCode">POST CODE</label>
                    <input type="text" name="postCode" className="form-control" placeholder="Enter Post Code" id="validationPostCode"
                      value={values.postCode} onChange={e => setUpdateValues({...values, postCode:e.target.value})} required></input>
                  <div className="invalid-feedback">Please choose your Post Code.</div>
                  </div>
                  </div>
                  <div className="col">
                  <div className="mb-2">
                    <label htmlFor="validationCountry">COUNTRY</label>
                    <input type="text" name="country" className="form-control" placeholder="Enter Country" id="validationCountry"
                      value={values.country} onChange={e => setUpdateValues({...values, country:e.target.value})} required></input>
                    <div className="invalid-feedback">Please choose your Country.</div>
                  </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-success w-100 " type="submit">Update</button>
                  </div>
                  <div className="col">
                    <Link to="/" className='btn btn-info w-100' >Back</Link>
                  </div>
                </div>
                </form>
        </div>
      </div>
    )
}
export default Update