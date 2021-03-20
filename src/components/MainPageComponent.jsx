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

    openBurger(){
        const menu = document.getElementById('header__menu');
        menu.classList.toggle('show');
    }

    render() {
        return (

            <div>
                <header className="header lock-padding">
                    <div className="container-fluid p-0">
                        <div className="header_wrapburg">
                            <span className="title">BStorage</span>
                            <div className="header__burger">
                                <span id="trigger" onClick={() => {
                                    this.openBurger()
                                }}/>
                            </div>
                        </div>
                        <div id="header__menu" className="row header__menu">
                            <div className="col-lg-4 menu">
                                <ul className="menu_inner"  onClick={() => this.goToIncome()}>
                                    <li>
                                        <a>Прихід</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4  menu">
                                <ul className="menu_inner"  onClick={() => this.goToStorage()}>
                                    <li><a>Склад</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4  menu">
                                <ul className="menu_inner" onClick={() => this.goToSale()}>
                                    <li><a>Продаж</a></li>
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