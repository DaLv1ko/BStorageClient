import 'bootstrap/dist/css/bootstrap.css'

import { Switch, Route, Link } from "react-router-dom";
import IncomeComponent from "../components/IncomeComponent";
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
            <div>
                {/*<nav className="navbar navbar-expand navbar-dark bg-dark">*/}
                {/*    <Link to={"/"} className="navbar-brand">*/}
                {/*        bezKoder*/}
                {/*    </Link>*/}
                {/*    <div className="navbar-nav mr-auto">*/}
                {/*        <li className="nav-item">*/}
                {/*            <Link to={"/home"} className="nav-link">*/}
                {/*                Home*/}
                {/*            </Link>*/}
                {/*        </li>*/}

                {/*        {showModeratorBoard && (*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/mod"} className="nav-link">*/}
                {/*                    Moderator Board*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        )}*/}

                {/*        {showAdminBoard && (*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/admin"} className="nav-link">*/}
                {/*                    Admin Board*/}
                {/*                </Link>*/}
                {/*            </li>*/}

                {/*        )}*/}
                {/*        {showAdminBoard && (*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/income"} className="nav-link">*/}
                {/*                    Income*/}
                {/*                </Link>*/}
                {/*            </li>*/}

                {/*        )}*/}

                {/*        {currentUser && (*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/user"} className="nav-link">*/}
                {/*                    User*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        )}*/}
                {/*    </div>*/}

                {/*    {currentUser ? (*/}
                {/*        <div className="navbar-nav ml-auto">*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/profile"} className="nav-link">*/}
                {/*                    {currentUser.username}*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <a href="/login" className="nav-link" onClick={this.logOut}>*/}
                {/*                    LogOut*/}
                {/*                </a>*/}
                {/*            </li>*/}
                {/*        </div>*/}
                {/*    ) : (*/}
                {/*        <div className="navbar-nav ml-auto">*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/login"} className="nav-link">*/}
                {/*                    Login*/}
                {/*                </Link>*/}
                {/*            </li>*/}

                {/*            <li className="nav-item">*/}
                {/*                <Link to={"/register"} className="nav-link">*/}
                {/*                    Sign Up*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</nav>*/}

                <div >
                    <Switch>
                        <Route exact path={["/", "/main", "/home"]} component={MainPageComponent} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        

                        <Route path="/income" component={IncomeComponent} />
                        <Route path="/storage" component={StorageComponent} />
                        <Route path="/sell" component={SaleComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

