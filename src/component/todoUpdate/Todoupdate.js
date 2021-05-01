import React,{useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol,MDBCard,MDBInput } from 'mdbreact';
import axios from 'axios';

function Todoupdate() {
    const [userInfo, setUserInfo] = useState()
    const [userList, setuserList] = useState()
    let history = useHistory();

    const handleButton = () => {
        const data = userInfo

        
        axios.post(`http://localhost:8080/api/update-todo`,
            { ...data }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
                // store the user in localStorage
                alert("Todo update Successfull!!")
                history.push('/');
            }).catch(error => {
                alert("Something went wroung!!")
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

    

    

    

    useEffect( () => {
        let id ="1"
        axios.post(`http://localhost:8080/api/edit-todo/`,
            { id }
        )
        .then(res => {
            
            setuserList(res.data.data)
        }).catch(error => {
            console.error('There was an error!', error);
           
        });
    });

    const handlerUser =()=>{
        return userList && userList.map((user,index)=>{
            return <MDBCol size="12">
                    <MDBInput  name="id" value={user.id} type="hidden" 
                    onChange={(event) => handleOnChange(event)}
                    required>
                    </MDBInput>
                    <MDBInput label='Title' size="sm"  name="title" value={user.title} type="text" 
                    onChange={(event) => handleOnChange(event)}
                    required>
                    </MDBInput>
                    <MDBInput label="Text" size="sm"  name="text" value={user.text} type="text" 
                    onChange={(event) => handleOnChange(event)}
                    required>
                    </MDBInput>
                    <MDBCol size="12" >
                        <button type="submit" className="btn btn-blue btn-rounded " onClick={handleButton}>Update</button>
                    </MDBCol>
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
                            <MDBRow >
                                {handlerUser()}
                                
                                
                            </MDBRow>
                            
                            
                            
                            
                            
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="2"></MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Todoupdate;