import React from "react"
import styles from "./Dashboard.module.css"
import {AiOutlineLogout} from "react-icons/ai"
import { useHistory } from "react-router"

function Dashboard(){

    const studentArr = JSON.parse(sessionStorage.getItem("studentArr"))

    const history = useHistory()
    const [student, setStudent] = React.useState("")
    const handleNameFilter = (event) => {
        setStudent(event.target.value)
    }

    const handleLogout = () => {
        sessionStorage.removeItem("studentArr")
        sessionStorage.removeItem("key")
        history.push("/")
    }

    if(sessionStorage.getItem("key") === undefined || sessionStorage.getItem("key") === null ){
        history.push("/")
    }
    if(studentArr === undefined){
        history.push("/")
    }
    return(
        <>
            <div>
                <div className={styles.logoContainer}>
                    <img src="https://www.podareducation.org/Uploads/Campus/2020-6-12--12-29-25-34_corporatesitelogo_new.png" className="m-2" alt="Podar logo" height="50px" />
                    <AiOutlineLogout onClick={handleLogout} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout"/>
                </div>
            </div>
            <div>
                <input type="search" name="student" value={student} onChange={handleNameFilter} placeholder="Search a student" />
            </div>
            <div className={styles.CardsContainer}>
                {
                    studentArr && studentArr.filter(item => item.Name.toLocaleLowerCase().includes(student.toLocaleLowerCase())).map(item => {

                        return(
                            <div className={styles.StudentCard}>
                                <img className="rounded-circle" src={item.StudentPhoto} alt={"student "+item.Name} />
                                <p>{item.Name} </p>
                                <p>{item.StudentEmail} </p>
                                <p>Board: {item.Board} </p>
                                <p>ID: {item.StudentId}  </p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Dashboard