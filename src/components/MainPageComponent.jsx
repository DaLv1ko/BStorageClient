import React, {Component} from 'react';
import AuthService from "../services/AuthService";
import HeaderComponent from "./HeaderComponent";
import {Link} from 'react-router-dom'

class MainPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    componentDidMount() {
    }

    logOut() {
        AuthService.logout();
        this.props.history.push('/login');
    }

    render() {
        return (

            <div>
                <HeaderComponent
                    page={'main'}
                />
                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 search_box">
                                <Link to="/login" className="search_but dandruff"
                                   onClick={this.logOut}>ВИЙТИ З АККАУНТУ</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default MainPageComponent;