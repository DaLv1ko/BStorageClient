import React, {Component} from 'react';
import AuthService from "../services/AuthService";
import HeaderComponent from "./HeaderComponent";

class MainPage extends Component {

    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
    }

    logOut() {
        AuthService.logout();
        this.props.logOut();
    }

    render() {
        return (
            <div>
                <HeaderComponent page={'main'}/>
                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 search_box">
                                <button className="search_but popup_link"
                                        onClick={this.logOut}>Вийти з аккаунту
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default MainPage;