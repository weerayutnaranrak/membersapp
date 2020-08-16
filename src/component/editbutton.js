import React, { Component } from 'react';
import axios from 'axios';

import {  MDBBtn,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter,MDBInputGroup,MDBInput } from 'mdbreact';

class Editbutton extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            id: props.id,
            name:[],
            lastname:[],
            age:[],
            job:[],
            status:[],
            address:[],
            radio: 0,
        }


    }

    onClick = nr => () => {
        this.setState({
        radio: nr
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        console.log(this.state.modal)
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
            this.setState({
                modal: !this.state.modal
            });
        
    
        }, 1001)
        
    }
    
    render() { 
        return ( 
            <span>
                <MDBBtn color="warning" onClick={this.toggle}>Edit</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                    <form onSubmit={this.sumbit} className='col-7 text-center'>
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
                                <MDBInput label="Age" icon="envelope" onChange={this.handleAge} value={this.state.age} required/>
                                <MDBInput label="JOB" icon="envelope" onChange={this.handleJob} value={this.state.job} required/>
                                <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label=" Single " type="radio" id="radio1" value='Single'onChange={this.handleStatus} />
                                <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label=" Not Single " type="radio" id="radio2" value='Not Single' onChange={this.handleStatus}/>
                        </div>
                        <MDBInput type="textarea" label="Address" rows="1" onChange={this.handleAddress} value={this.state.address} required/>
                        <MDBBtn color="primary" type="submit">Add</MDBBtn>
                        <MDBBtn color="warning" onClick={this.resetForm}>Reset</MDBBtn>

                        </form>    
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={this.update(this.state.id)}>Edit</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </span>
         );
    }
}
 
export default Editbutton;