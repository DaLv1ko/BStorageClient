import 'bootstrap/dist/css/bootstrap.css'

import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import IncomePage from "../pages/IncomePage";
import StorageComponent from "../components/StorageComponent";
import SaleComponent from "../components/SaleComponent";
import MainPageComponent from "../components/MainPageComponent";
import '../css/style.css'

import React, {Component} from "react";


import AuthService from "../services/AuthService";

import Login from "../components/LoginComponent";
import Register from "../components/RegisterComponent";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {


        return (
           <Router>
               <Switch>
                   <Route exact path={["/", "/main", "/home"]} component={MainPageComponent} />
                   <Route exact path="/login" component={Login} />
                   <Route exact path="/register" component={Register} />


                   <Route path="/income" component={IncomePage} />
                   <Route path="/storage" component={StorageComponent} />
                   <Route path="/sell" component={SaleComponent} />
               </Switch>
           </Router>


        );
    }
}

export default App;

