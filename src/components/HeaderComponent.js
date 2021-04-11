import React, {Component} from "react";
import {Link} from 'react-router-dom'

export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.openBurger = this.openBurger.bind(this)
    }

    openBurger() {
        const menu = document.getElementById('header__menu');
        const headerBurger = document.getElementById('header__burger');
        menu.classList.toggle('show');
        headerBurger.classList.toggle('crist');
    }

    render() {
        const {clearSearch, page} = this.props;

        const div1 = () => {
            if (page === 'income') {
                return (
                    currentPage(page)
                )
            } else return (
                link('income')
            )
        }
        const div2 = () => {
            if (page === 'storage') {
                return (
                    currentPage(page)
                )
            } else return (
                link('storage')
            )
        }
        const div3 = () => {
            if (page === 'sale') {
                return (
                    currentPage(page)
                )
            } else return (
                link('sale')
            )
        }

        const link = (page) => {
            let link = ''
            if (page === 'income') link = <Link to='/income'>Прихід</Link>
            if (page === 'storage') link = <Link to='/storage'>Склад</Link>
            if (page === 'sale') link = <Link to='/sale'>Продаж</Link>
            return (<ul className="menu_inner" onClick={clearSearch}>
                {link}
            </ul>)
        }

        const currentPage = (page) => {
            console.log(page)
            let currentPage = ''
            if (page === 'income') currentPage = 'Прихід'
            if (page === 'storage') currentPage = 'Склад'
            if (page === 'sale') currentPage = 'Продаж'
            return (
                <ul className="menu_inner menu_inner__active">
                    <li className="current_page"><a>{currentPage}</a></li>
                    <li className="current_page_mobile"><Link to='/main'>Головна сторінка</Link></li>
                    <li><Link to='/main'><i className="fas fa-times"/></Link></li>
                </ul>
            )

        }

        const title = (page) => {
            let title = ''
            if (page === 'income') title = 'Прихід'
            if (page === 'storage') title = 'Склад'
            if (page === 'sale') title = 'Продаж'
            if (page === 'main') title = 'BStorage'
            return (<span className="title">{title}</span>)
        }

        return (
            <header className="header lock-padding">
                <div className="container-fluid p-0">
                    <div className="header_wrapburg">
                        {title(page)}

                        <div id="header__burger" className="header__burger" onClick={this.openBurger}>
                            <span/>
                        </div>
                    </div>
                    <div id="header__menu" className="row header__menu">
                        <div className="col-lg-4 menu">
                            {div1()}
                        </div>
                        <div className="col-lg-4 menu">
                            {div2()}
                        </div>
                        <div className="col-lg-4 menu">
                            {div3()}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}