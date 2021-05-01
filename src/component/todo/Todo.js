import React,{useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol,MDBCard,MDBInput,MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';

function Todo() {
    const [userInfo, setUserInfo] = useState()
    const [userList, setuserList] = useState()
    let history = useHistory();

    const handleButton = () => {
        const data = userInfo


        axios.post(`http://localhost:8080/api/add`,
            { ...data }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
                // store the user in localStorage
                alert("Todo add Successfull!!")
                history.push('/');
            }).catch(error => {
                alert("Title already Exit!!")
                console.error('There was an error!', error);
                
            });


    }

   

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    

    const deleteUser = (id) => {
       
        axios.post(`http://localhost:8080/api/delete-todo`,
            { id }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Todo Deleted Successfull!!")
                history.push('/');
            }).catch(error => {
                console.error('There was an error!', error);
               
            });
    }

    const editUser = (id) => {
       
        axios.post(`http://localhost:8080/api/edit-todo/`,
            { id }
        )
            .then(res => {
                
                history.push('/edit-todo');
            }).catch(error => {
                console.error('There was an error!', error);
               
            });
    }

    useEffect( () => {
        
        axios.get(
          'http://localhost:8080/api/todo-list',
          
        )
      .then(res => {
        setuserList(res.data.data)
        }).catch(error => {
            console.log('There was an error!', error);
        });
    });

    const handlerUser =()=>{
        return userList && userList.map((user,index)=>{
            return <MDBCol size="4">
                    <MDBCard className="p-3">
                        
                        <p style={{fontWeight:"600"}}>{user.title}</p>
                        <p className="text-justify">{user.text}</p>
                        <MDBRow>
                            <MDBCol size="6">
                                <p className="float-left" ><button type="submit"  className="btn btn-green" style={{padding: ".84rem 1.14rem"}} onClick={()=>editUser(user.id)}>
                Edit</button></p>
                            </MDBCol>
                            <MDBCol size="6">
                                <p className="float-right"><button type="submit"  className="btn btn-red" style={{padding: ".84rem 1.14rem"}} onClick={()=>deleteUser(user.id)}>
                Delete</button></p>
                            </MDBCol>
                        </MDBRow>
                        
                        
                        </MDBCard>
                    </MDBCol>
            
            
            
           })
    }
    return(
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="2">
                    </MDBCol>
                    <MDBCol size="8">
                        <MDBCard className=" p-3">
                            <MDBRow className="border-bottom">
                                <MDBCol size="6">
                                <p>TODO App</p>
                                </MDBCol>
                                <MDBCol size="6" >
                                <p  className="float-right">Todo List</p>
                                </MDBCol>
                            </MDBRow>
                        
                            <p className="mt-3 border-bottom">Note Details </p>
                            <MDBRow className="border-bottom">
                                <MDBCol size="12">
                                    <MDBInput label="Title" size="sm"  name="title" type="text" 
                                    onChange={(event) => handleOnChange(event)}
                                    required>
                                    </MDBInput>
                                    <MDBInput label="Text" size="sm"  name="text" type="text" 
                                    onChange={(event) => handleOnChange(event)}
                                    required>
                                    </MDBInput>
                                    
                                </MDBCol>
                                
                                <MDBCol size="12" >
                                <button type="submit" className="btn btn-blue btn-rounded " onClick={handleButton}>Submit</button>
                                </MDBCol>
                            </MDBRow>
                            <p className="mt-3 border-bottom">TODO List </p>
                            
                            <MDBRow>{handlerUser()}</MDBRow>
                            
                            
                            
                            
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="2"></MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Todo;