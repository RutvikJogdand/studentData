import React, { useState } from "react"
import axios from "axios"
import styles from "./Login.module.css"
import Swal from "sweetalert2"
import {useHistory} from "react-router-dom"

function Login(){

    const [username, setUsername] = useState("")
    const [user_password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const [studentArr, setArr] = useState([])

    const history = useHistory()

    const handleUsername = (event) => {
        setUsername(event.target.value)
        setStatus("")
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        setStatus("")
    }

    let token = "gyCU+zA1eIroSi4liEo8uw=="
    const handleLogin = () => {
        if(username && user_password){

            setLoading(true)
            axios
            .post("http://13.126.21.168:8020/podaratomapis/PodarApp.svc/DoLogin",{
                
                "Username":username,
                "Password":user_password
              }, 
              {
                headers: 
                {
                  'authenticationkey': `${token}` 
                }
              })
            .then(res => {
                console.log(res)
                setStatus(res.data.Status)
                setLoading(false)
                setArr(res.data.userListDetails)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
        else{
           Swal.fire("Please enter the right credentials")
        }
    }

    if(status === "0"){
        Swal.fire("Wrong Credentials entered")
    }

    if(status === "1"){
        sessionStorage.setItem("key",token)
        sessionStorage.setItem("studentArr", JSON.stringify(studentArr) )
        // console.log(studentArr)
    }
    
    if(sessionStorage.getItem("key") && JSON.parse(sessionStorage.getItem("studentArr")) &&  JSON.parse(sessionStorage.getItem("studentArr")).length !== 0 ){
        history.push("/dashboard")
    }
    return(
        <div className={styles.ContainerDiv}>
            <img className="img-responsive img-fluid" src="https://www.podareducation.org/Uploads/Campus/2020-6-12--12-29-25-34_corporatesitelogo_new.png" alt="logo" />
            <br/>
            <br/>
            <input className="form-control" type="text" name="username" value={username} placeholder="Enter username" onChange={handleUsername} />
            <input className="form-control" type="password" name="user_password" value={user_password} placeholder="Enter Password" onChange={handlePassword} />
            {
                loading ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <button className="btn" onClick={handleLogin}> Login </button>
            }
        </div>
    )
}

export default Login