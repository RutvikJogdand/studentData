import React from "react"
import {Route, Switch} from "react-router-dom"
import Dashboard from "../components/Dashboard/Dashboard"
import Login from "../components/Login/Login"

function Routes(){

    return(
        <>
            <Switch>
                <Route exact path="/" render={() => <Login/> } />
                <Route path="/dashboard" render={() =><Dashboard/> } />
            </Switch>
        </>
    )
}

export default Routes