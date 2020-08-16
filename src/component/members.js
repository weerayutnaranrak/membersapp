import React, { Component } from 'react';
import {  MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBInput , MDBInputGroup,  MDBCardFooter  } from 'mdbreact';


import axios from 'axios';
class Members extends Component {
   constructor(props){
       super(props);
       this.state = {
            name:[],
            lastname:[],
            age:[],
            job:[],
            status:[],
            address:[],
            radio: 0,
            img_go: 'https://cdn.ednsquare.com/s/*/18cb30d7-340e-41c6-a045-7fdf428f9202.png',
            img_react :'https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png',
            members_list:[],
            modal: false,
            id:[],
            edit:true,
            readonly:true,
            delate:false,
            value:[]
            
       }
   }
   editMember = ()=>{
       this.setState({
        edit:!this.state.edit,
        readonly:!this.state.readonly,
        delate:!this.state.delate
       })
   }
    
   componentDidMount(){
       this.members()
   }
   handleName = (event) => {
    this.setState({
        name: event.target.value
    })
    }
    handleLastname = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }
    handleAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }
    handleJob = (event) => {
        this.setState({
            job: event.target.value
        })
    }
    handleAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleStatus = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    sumbit = (event) => {
        event.preventDefault();
        let insert = {
            name: this.state.name,
            lastname: this.state.lastname,
            age:this.state.age,
            job:this.state.job,
            status:this.state.status,
            address:this.state.address
        }
        axios.post(`/api/members`, insert).then((res) => {
            console.log(res.data)
        })
        setTimeout(()=> {
        this.resetForm();
        alert('Add member success !!!');
        this.members()
    
        }, 1001)
        
    }
    
    resetForm = ()=>{
        this.setState({
            name:[],
            lastname:[],
            age:[],
            job:[],
            status:[],
            address:[],
            radio: '',
        })
    }

    onClick = nr => () => {
        this.setState({
        radio: nr
        });
    }

   members(){
    axios.get(`/api/members`).then((res) => {
        if (res.data === null) {
          this.setState({
            members_list: []
          })
        } else {
          this.setState({
            members_list: res.data
          })
        }
      })
   }

   removeMember = (id) => {
    axios.delete(`/api/members/${id}`).then((res) => {
      console.log(res.data)
      this.members()
    });
    alert("Delate Member success !!")
 
  }
  update = (id) => {
    let update = {
        name: this.state.name,
        lastname: this.state.lastname,
        age:this.state.age,
        job:this.state.job,
        status:this.state.status,
        address:this.state.address
    }
    axios.put(`/api/members/${id}`, update).then((res) => {
        console.log(res.data)

    })
        setTimeout(()=> {
            window.location.reload()
            alert('Edit member success !!!');
            
        }, 1001)

    }
   
    render() { 
        return ( 
        <div className='container'>

            <div className='row'>
            <div className='col-4 mt-3'>
                <div className='text-center' style={{  fontSize: 35, fontWeight: 'bold' }}>Golang API + React</div>
                <img height={150} style={{ marginBottom: 32, borderRadius: 100 }} src={this.state.img_go} />
                <img height={150} style={{ marginBottom: 32, borderRadius: 100 }} src={this.state.img_react} />
                
            </div>
            <form onSubmit={this.sumbit} className='col-7 text-center mt-4'>

                <MDBInputGroup
                    material
                    containerClassName="m-0"
                    prepend="Name"
                    inputs={
                    <>
                        <MDBInput noTag type="text" hint="Frist Name" onChange={this.handleName} value={this.state.name} required/>
                        <MDBInput noTag type="text" hint="Last Name" onChange={this.handleLastname} value={this.state.lastname} required/>
                    </>
                    }
               />
               <div className = "form-inline">
                    <MDBInput label="Age" icon="baby-carriage" onChange={this.handleAge} value={this.state.age} required type="number"/>
                    <MDBInput label="JOB" icon="briefcase" onChange={this.handleJob} value={this.state.job} required/>
                    
                    <MDBInput onClick={this.onClick('Single')} checked={this.state.radio==='Single' ? true : false} label="Single" type="radio" id="radio1" value='Single'onChange={this.handleStatus} />
                    <MDBInput onClick={this.onClick('Not Single')} checked={this.state.radio==='Not Single' ? true : false} label="Not Single" type="radio" id="radio2" value='Not Single' onChange={this.handleStatus}/>
                    
                   
               </div>
               <MDBInput type="textarea" label="Address" rows="1" onChange={this.handleAddress} value={this.state.address} required/>
               <MDBBtn color="primary" type="submit">Add</MDBBtn>
               <MDBBtn color="warning" onClick={this.resetForm}>Reset</MDBBtn>

            </form>    
            <div className='col-12 form-inline'>
                <MDBBtn color="warning" onClick={this.editMember}>Edit Members</MDBBtn>
                <h2 className='text-center m-2' style={{  fontSize: 28, fontWeight: 'bold' }}>Member Total : {this.state.members_list.length}</h2>

            </div>
                {
                    this.state.members_list.map((item) => (
                        <div className='col-4'>
                <MDBCard wide className='mt-3'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header light-blue lighten-3'
                    cascade
                    tag='div'
                >
                    <h2 className='text-center m-2' style={{  fontSize: 28, fontWeight: 'bold' }}>Member</h2>
                </MDBCardImage>
                <MDBCardBody cascade >
                    <MDBInputGroup
                        material
                        containerClassName="m-0"
                        prepend="Name"
                        inputs={
                        <>
                            <MDBInput noTag type="text" hint={item.name} onChange={this.handleName} readOnly={this.state.readonly} />
                            <MDBInput noTag type="text" hint={item.lastname} onChange={this.handleLastname} readOnly={this.state.readonly}/>
                        </>
                        }
                        />
                    <MDBInputGroup containerClassName="mb-3" prepend="Job" hint={item.job} readOnly={this.state.readonly} onChange={this.handleJob} className= {!this.state.readonly? '':"disabled"} /> 
                    <MDBInputGroup containerClassName="mb-3" prepend="Age" hint={item.age} readOnly={this.state.readonly} onChange={this.handleAge} type="number" className= {!this.state.readonly? '':"disabled"}/>    
                    {/* <MDBInput label={item.job} outline  readOnly={this.state.readonly} onChange={this.handleJob}/>
                    <MDBInput label={item.age} outline  readOnly={this.state.readonly} onChange={this.handleAge}/> */}
                    <div className='form-inline'>
                    <select className="browser-default custom-select mb-3" onChange={this.handleStatus} disabled={this.state.edit} >
                        <option value={item.status}>{item.status}</option>
                        <option value="Single">Single</option>
                        <option value="Not Single">Not Single</option>
                    </select>
                        {/* <MDBInput onClick={this.onClick('Single')} checked={item.status ==="Single" ? true : false} label=" Single " type="radio" id="radio1" value='Single'onChange={this.handleStatus} />
                        <MDBInput onClick={this.onClick('Not Single')} checked={item.status ==="Not Single" ? true : false} label=" Not Single " type="radio" id="radio2" value='Not Single' onChange={this.handleStatus}/> */}
                    </div>
                    {/* <MDBInput label={item.address} outline  readOnly={this.state.readonly} onChange={this.handleAddress}/> */}
                    <MDBInputGroup containerClassName="mb-3" prepend="Address" hint={item.address} readOnly={this.state.readonly} onChange={this.handleAddress} className= {!this.state.readonly? '':"disabled"}/>
                </MDBCardBody>
                <MDBCardFooter className='text-center'>
                    <MDBBtn color="danger" onClick={this.removeMember.bind(this, item._id)} disabled={this.state.delate} >Delate</MDBBtn>
                    <MDBBtn color="warning" disabled={this.state.edit} onClick={this.update.bind(this, item._id)}>Save</MDBBtn>
                </MDBCardFooter>
                </MDBCard>
            </div>
                    ))
                }
            </div>

        </div>
         );
    }
}
 
export default Members;