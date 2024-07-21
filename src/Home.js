import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const bgColor = {
  backgroundColor:'#f5f5f7'
};
const fontLabel = {
  color:'#a6a4a2',
  fontSize:12
};
const fcTblTitle = {
  color:'#566787',
  fontSize:14
};
const fcTblTd = {
  color:'#a6a4a2',
  fontSize:14
};

function Home() {
  const [data, setData] = useState([])
  const [values, setValues] = useState({
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

  useEffect(()=> {
    axios.get('http://localhost:3000/referrals')
    .then(res => setData(res.data))
    .catch(err => console.log(err)); 
  }, []) 

  //SUBMIT
  const handleSubmit = (event) => {
    const emailRegex = /^\s*(?!.*[._-]{2})[\w\.-]+@([\w-])+\.+[\w-]{2,24}\s*$/;
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
      axios.post('http://localhost:3000/referrals', values)
      .then(res => {
        console.log(res, 'response')
        window.location.reload()
      })
      .catch(err => console.log(err)); 
    }
  }

  //DELETE
  const handleDelete = (id) => {
    const remove = window.confirm('Would you like to delete?')
    if (remove) {
      axios.delete('http://localhost:3000/referrals/' + id)
      .then(res => {
        window.location.reload()
      })
      .catch(err => console.log(err)); 
    }
  }

  return (
    <div className="rounded border mt-4 ms-5 me-5  shadow" style={bgColor}>   
      <div className="row">
        {/* 1st Row */}
        <div className="col pb-16 bg-white ms-4 mt-2 pt-5  me-4" style={fontLabel}>
          <h1>Referral Builder</h1>
            <br/>
              <h6>PERSONAL DETAILS</h6>
                <br/>
                  <form onSubmit={handleSubmit}  className="row g-3 needs-validation pb-5" noValidate>
                    <div className="row pb-3">
                      <br/>
                      <hr/>
                      <div className="col">
                      <div className="mb-2">
                        <label htmlFor="validationGivenName">GIVEN NAME</label>
                        <input type="text" name="givenName" className="form-control" placeholder="Enter Given Name" id="validationGivenName"
                          onChange={e => setValues({...values, givenName:e.target.value})} required></input>
                        <div className="invalid-feedback">Please choose your Given Name.</div>
                      </div>
                      </div>
                      <div className="col">
                      <div className="mb-2">
                        <label htmlFor="validationSurname">SURNAME</label>
                        <input type="text" name="surname" className="form-control" placeholder="Enter Surname" id="validationSurname"
                          onChange={e => setValues({...values, surname:e.target.value})} required></input>
                        <div className="invalid-feedback">Please choose your Surname.</div>
                      </div>
                      </div>
                    </div>
                    <div className="row pb-5">
                      <div className="col">
                      <div className="mb-2">
                        <label htmlFor="validationEmail">EMAIL</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email" id="validationEmail"  
                          onChange={e => setValues({...values, email:e.target.value})} required></input>
                        <div className="invalid-feedback">Please choose the correct Email.</div>
                      </div>
                      </div>
                      <div className="col">
                      <div className="mb-2">
                        <label htmlFor="validationPhone">PHONE</label>
                        <input type="number" min="0" step="1" name="phoneNumber" className="form-control" placeholder="Enter Phone" id="validationPhone"
                          onChange={e => setValues({...values, phoneNumber:e.target.value})} required></input>
                        <div className="invalid-feedback">Please choose the correct Phone Number.</div>
                      </div>
                      </div>
                    </div>
                
                  <h6>ADDRESS</h6>
                    <br/>
                      <div className="row pb-3">
                        <hr />
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationHome">HOME NAME OR #</label>
                            <input type="text" name="homeName" className="form-control" placeholder="Enter Home Name" id="validationHome"
                              onChange={e => setValues({...values, homeName:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your home name.</div>
                          </div>
                          </div>
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationStreet">STREET</label>
                            <input type="text" name="street" className="form-control" placeholder="Enter Street" id="validationStreet"
                              onChange={e => setValues({...values, street:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your street name.</div>
                          </div>
                          </div>
                        </div>
                        <div className="row pb-3">
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationSuburbs">SUBURB</label>
                            <input type="text" name="suburb" className="form-control" placeholder="Enter Suburb" id="validationSuburbs"
                              onChange={e => setValues({...values, suburb:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your suburbs.</div>
                          </div>  
                          </div>
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationState">STATE</label>
                            <input type="text" name="state" className="form-control" placeholder="Enter state"  id="validationState"
                              onChange={e => setValues({...values, state:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your state.</div>
                          </div>
                          </div>
                        </div>
                        <div className="row pb-5">
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationPostCode">POST CODE</label>
                            <input type="text" name="postCode" className="form-control" placeholder="Enter Post Code" id="validationPostCode"
                              onChange={e => setValues({...values, postCode:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your post code.</div>
                          </div>
                          </div>
                          <div className="col">
                          <div className="mb-2">
                            <label htmlFor="validationCountry">COUNTRY</label>
                            <input type="text" name="country" className="form-control" placeholder="Enter Country"  id="validationCountry"
                              onChange={e => setValues({...values, country:e.target.value})} required></input>
                            <div className="invalid-feedback">Please choose your country.</div>
                          </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button className="btn btn-outline-secondary w-100" type="button">UPLOAD AVATAR</button>
                          </div>
                          <div className="col">
                            <button className="btn btn-success w-100 " type="submit">CREATE REFERRAL</button>
                        </div>
                      </div>
                  </form>
          </div>

        {/* 2nd row */}
          <div className="col px-4 pt-5">
            <section>
              <div className="table-responsive text-nowrap">
                  <table className="table">
                      <thead>
                          <tr>
                            <th scope="col" style={fcTblTitle}>GIVEN NAME</th>
                            <th scope="col" style={fcTblTitle}>SURNAME</th>
                            <th scope="col" style={fcTblTitle}>EMAIL</th>
                            <th scope="col" style={fcTblTitle}>PHONE</th>
                            <th scope="col" style={fcTblTitle}>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((dt, i) => (
                            <tr key={i}>
                              <td style={fcTblTd}>{dt.givenName}</td>
                              <td style={fcTblTd}>{dt.surname}</td>
                              <td style={fcTblTd}>{dt.email}</td>
                              <td style={fcTblTd}>{dt.phoneNumber}</td>
                              <td>
                                <div style={{float:'left'}} className='me-1'>
                                    <Link to={`/update/${dt.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                      </svg>
                                    </Link>
                                  </div>
                                  <div style={{float:'left', marginLeft: 2}}>
                                    <Link><svg role="button" onClick={e => handleDelete(dt.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                      </svg>
                                    </Link>
                                  </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
              </section>
            </div>
        </div>
    </div>
  )
}

export default Home