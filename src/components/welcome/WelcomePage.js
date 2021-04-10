import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class WelcomePage extends Component {

    componentDidMount() {
        console.log("welcome")
    }

    goToIncome() {
        this.props.history.push(`/income`);
    }

    goToStorage() {
        this.props.history.push(`/storage`);
    }

    goToSale() {
        this.props.history.push(`/sale`);
    }

    openBurger() {
        const menu = document.getElementById('header__menu');
        menu.classList.toggle('show');
    }

    render() {
        return (

            <div>



                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 search_box">
                                <span>asd</span>
                            </div>
                        </div>
                    </div>
                </section>


            </div>

        );
    }
}

