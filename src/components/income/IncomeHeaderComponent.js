import React, {Component} from "react";
import {Link} from 'react-router-dom'

export default class IncomeHeaderComponent extends Component {

    openBurger() {
        const menu = document.getElementById('header__menu');
        menu.classList.toggle('show');
    }

    render(){
        const {clearSearch} = this.props;

        return(
            <header className="header lock-padding">
                <div className="container-fluid p-0">
                    <div className="header_wrapburg">
                        <span className="title">ПРИХІД</span>
                        <div className="header__burger">
                                <span id="trigger" onClick={() => {
                                    this.openBurger()
                                }}/>
                        </div>
                    </div>
                    <div id="header__menu" className="row header__menu">
                        <div className="col-lg-4 menu">
                            <ul className="menu_inner menu_inner__active">
                                <li className="current_page"><a>Прихід</a></li>
                                <li className="current_page_mobile"><Link to='/main'>Головна сторінка</Link></li>
                                <li><Link to='/main'><i className="fas fa-times"/></Link></li>

                            </ul>
                        </div>
                        <div className="col-lg-4  menu">
                            <ul className="menu_inner" onClick={clearSearch}>
                                <Link to='/storage'>Склад</Link>
                            </ul>
                        </div>
                        <div className="col-lg-4  menu">
                            <ul className="menu_inner" onClick={clearSearch}>
                                <Link to='/sale'>Продаж</Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}