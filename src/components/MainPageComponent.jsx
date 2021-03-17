import React, {Component} from 'react';
import IncomeService from "../services/IncomeService";
import AuthService from "../services/AuthService";

class MainPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    componentDidMount() {

        IncomeService.getBrands().then((res) => {
            },error=>{
                this.props.history.push('/login')
            }
        );
    }

    logOut() {
        AuthService.logout();
        this.props.history.push('/login');
    }

    goToIncome() {
        this.props.history.push(`/income`);
    }

    goToStorage() {
        this.props.history.push(`/storage`);
    }

    goToSale() {
        this.props.history.push(`/sell`);
    }

    render() {
        return (

            <div>
                <header>
                    <div className="container-fluid p-0">
                        <div className="row m-0">
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner">

                                    <li className="button_text" onClick={() => this.goToIncome()}>Прихід</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner">

                                    <li className="button_text" onClick={() => this.goToStorage()}>Склад</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner">
                                    <li className="button_text" onClick={() => this.goToSale()}>Продаж</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>



                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 search_box">
                                <a href="/login" className="search_but dandruff"
                                   onClick={this.logOut}>ВИЙТИ З АККАУНТУ</a>
                            </div>
                        </div>
                    </div>
                </section>



            </div>

        );
    }
}

export default MainPageComponent;