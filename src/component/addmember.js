import React, { Component } from 'react';
import { MDBInput , MDBInputGroup, MDBBtn } from 'mdbreact';



import axios from 'axios';

class Addmember extends Component {
    constructor(props) {
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
            img_react :'https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png'

         }
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
    // reset = ()=>{
    //     this.formadd.reset();
    // }
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
           alert('Add member success !!!');
       
        }, 1001)
        this.state.members()
    }
    onClick = nr => () => {
        this.setState({
          radio: nr
        });
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
            <form onSubmit={this.sumbit} className='col-7 text-center'>

                <MDBInputGroup
                    material
                    containerClassName="m-0"
                    prepend="Name"
                    inputs={
                    <>
                        <MDBInput noTag type="text" hint="Frist Name" onChange={this.handleName} required/>
                        <MDBInput noTag type="text" hint="Last Name" onChange={this.handleLastname} required/>
                    </>
                    }
               />
               <div className = "form-inline">
                    <MDBInput label="Age" icon="envelope" onChange={this.handleAge} required/>
                    <MDBInput label="JOB" icon="envelope" onChange={this.handleJob} required/>
                    <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label=" Single " type="radio" id="radio1" value='Single'onChange={this.handleStatus} />
                    <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label=" Not Single " type="radio" id="radio2" value='Not Single' onChange={this.handleStatus}/>
               </div>
               <MDBInput type="textarea" label="Address" rows="1" onChange={this.handleAddress} required/>
               <MDBBtn color="primary" type="submit">Add</MDBBtn>
               

            </form>    
                </div>
                
            </div>
            

         );
    }
}
 
export default Addmember;