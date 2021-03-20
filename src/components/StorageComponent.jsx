import React, {Component} from 'react';
import '../css/storage.css';
import StorageService from "../services/StorageService";
import {FormErrors} from "./FormErrors";
import ReactLoading from 'react-loading'


class StorageComponent extends Component {

    constructor(props) {
        super(props)


        this.state = {
            storages: [],
            number: null,
            id: this.props.match.params.id,
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            maxAmount: '',
            customer: '',
            debt: '',
            date: '',
            formErrors: {
                amount: ''
            },
            formValid: false,
            amountValid: false
        }

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let amountValid = this.state.amountValid;
        switch (fieldName) {
            case 'amount':
                if (value <= this.state.maxAmount && value > 0) {
                    amountValid = true
                } else {
                    amountValid = false;
                }
                fieldValidationErrors.amount = amountValid ? '' : ' некоректна';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            amountValid: amountValid,

        }, this.validateForm);
    }


    validateForm() {
        this.setState({
            formValid: this.state.amountValid
        })
    };

    sellStorage() {
        let sell = {
            type: this.state.type,
            brand: this.state.brand,
            model: this.state.model,
            price: this.state.price,
            amount: this.state.amount,
            customer: this.state.customer,
            debt: this.state.debt,
            date: this.state.date
        };

        StorageService.sellStorage(this.state.id, sell).then((res => {
            this.state.storages.map(
                storage => {
                    if (storage.id === this.state.id) {
                        console.log(res.data)
                        if (res.data.amount === 0) {

                            this.setState({storages: this.state.storages.filter(storage => storage.id !== this.state.id)});
                        } else {
                            storage.amount = res.data.amount;
                            this.setState({storages: this.state.storages})
                        }
                    }
                }
            )
            this.closeForm();
        }));


    }

    componentDidMount() {
        StorageService.getStorage().then((res) => {
            this.setState({storages: res.data});
        }, error => {
            this.props.history.push('/login')
        });
    }

    goToIncome() {
        this.props.history.push(`/income`);
    }

    goToSale() {
        this.props.history.push(`/sell`);
    }

    goToMain() {
        this.props.history.push(`/main`);
    }

    cancel() {
        this.state.formErrors.amount = ''
        this.state.id = ''
        this.state.type = ''
        this.state.brand = ''
        this.state.model = ''
        this.state.price = ''
        this.state.amount = ''
        this.state.customer = ''
        this.state.debt = ''
        this.state.date = ''
        this.state.maxAmount = ''
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }


    changePriceHandler = (event) => {
        this.setState({price: event.target.value})
    }
    changeAmountHandler = (event) => {
        this.setState({amount: event.target.value})
    }

    changeDateHandler = (event) => {
        this.setState({date: event.target.value})
    }

    changeCustomerHandler = (event) => {
        this.setState({customer: event.target.value})
    }

    changeDebtHandler = (event) => {
        this.setState({debt: event.target.value})
    }

    isEmpty() {
        return this.state.storages.length === 0;
    }

    sellForm() {
        this.setState({addOrUpdate: '_add'});
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    closeForm() {
        let popup = document.getElementById('popup');
        popup.classList.remove('open');
        this.cancel();
    }

    openBurger() {
        const menu = document.getElementById('header__menu');
        menu.classList.toggle('show');
    }

    render() {
        return (

            <div>
                <header className="header lock-padding">

                    <div className="container-fluid p-0">
                        <div className="header_wrapburg">
                            <span className="title">СКЛАД</span>
                            <div className="header__burger">
                                <span id="trigger" onClick={() => {
                                    this.openBurger()
                                }}/>
                            </div>
                        </div>
                        <div id="header__menu" className="row header__menu">
                            <div className="col-lg-4 menu">
                                {/*<ul className="menu_inner ">*/}
                                {/*    <li><a href="/income">Прихід</a></li>*/}
                                {/*</ul>*/}
                                <ul className="menu_inner" onClick={() => this.goToIncome()}>
                                    <li><a>Прихід</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4  menu">
                                <ul className="menu_inner menu_inner__active">
                                    <li className="current_page"><a>Склад</a></li>
                                    <li className="current_page_mobile"  onClick={() => this.goToMain()}><a>Головна сторінка</a></li>
                                    <li><a><i className="fas fa-times" onClick={() => this.goToMain()}/></a></li>
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

                {/*<header className="header lock-padding">*/}
                {/*    <div className="container-fluid p-0">*/}
                {/*        <div className="row m-0">*/}
                {/*            <div className="col-lg-4 p-0 menu">*/}
                {/*                <ul className="menu_inner" onClick={() => this.goToIncome()}>*/}
                {/*                    <li><a>Прихід</a></li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 p-0 menu">*/}
                {/*                <ul className="menu_inner menu_inner__active">*/}
                {/*                    <li><a>Склад</a></li>*/}
                {/*                    <li><i className="fas fa-times" onClick={() => this.goToMain()} id="active_page"/>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 p-0 menu">*/}
                {/*                <ul className="menu_inner" onClick={() => this.goToSale()}>*/}
                {/*                    <li><a>Продаж</a></li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</header>*/}

                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 search_box">
                                <input type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <input className="search_but dandruff" type="submit" value="Знайти"/>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="frame">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 frame__box">
                                <table>
                                    <thead>
                                    <tr className="table_head">
                                        <th>№</th>
                                        <th>ТИП</th>
                                        <th>БРЕНД</th>
                                        <th>МОДЕЛЬ</th>
                                        <th>ОСТАННЯ ЦІНА</th>
                                        <th>КІЛЬКІСТЬ</th>
                                        <th>ДІЇ</th>
                                    </tr>
                                    </thead>
                                    <script>
                                        {this.state.number = 1}
                                    </script>
                                    <tbody>

                                    {
                                        this.state.storages.map(
                                            storage =>
                                                <tr key={storage.id} className="table_body">
                                                    <td>{this.state.number++}</td>
                                                    <td>{storage.type.type}</td>
                                                    <td>{storage.brand.brand}</td>
                                                    <td>{storage.model.model}</td>
                                                    <td>{storage.lastPrice}</td>
                                                    <td>{storage.amount}</td>
                                                    <td>
                                                        <button type="button" onClick={() => {

                                                            this.state.id = storage.id;
                                                            this.state.type = storage.type.type;
                                                            this.state.brand = storage.brand.brand;
                                                            this.state.model = storage.model.model;
                                                            this.state.maxAmount = storage.amount;
                                                            this.sellForm();
                                                        }}
                                                                id="addGoods" className="update_button"
                                                        >Продати
                                                        </button>

                                                    </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>


                                </table>


                            </div>
                            <ReactLoading className="react_loading" hidden={!this.isEmpty()}
                                          type={"cylon"} color={"white"} height={500} width={500}/>
                        </div>
                    </div>
                </section>
                <section id='popup' className="popup">
                    <div className="popup_body">
                        <div className="popup_content">
                            <a onClick={() => this.closeForm()} className="popup_close"><i
                                className="fas fa-times" aria-hidden="true"/></a>

                            <form className="popup-form">
                                <div className="popup-box">
                                    <h3 className="title">Продати</h3>
                                </div>
                                <div className="popup-box">
                                    <label>Тип </label>
                                    <input placeholder="tv/phone/..." name="type" value={this.state.type}
                                           list="types"/>
                                </div>
                                <div className="popup-box">
                                    <label>Бренд </label>
                                    <input placeholder="samsung/lg/..." name="brand" value={this.state.brand}
                                           list="brands"/>
                                </div>
                                <div className="popup-box">
                                    <label>Модель </label>
                                    <input placeholder="nu7120/kj312/..." name="model" value={this.state.model}
                                           list="models"/>
                                </div>

                                <div className="popup-box">
                                    <label>Ціна </label>
                                    <input placeholder="UAH" name="price" value={this.state.price}
                                           onChange={this.changePriceHandler}/>
                                </div>
                                <div>
                                    <FormErrors formErrors={this.state.formErrors}/>
                                </div>
                                <div className="popup-box">
                                    <label>Кількість </label>

                                    <input type="number" placeholder="1+" name="amount" max={this.state.maxAmount}
                                           value={this.state.amount}
                                           onChange={this.handleUserInput}/>
                                </div>
                                <div className="popup-box">
                                    <label>Покупець </label>
                                    <input placeholder="ииии" name="customer" value={this.state.customer}
                                           onChange={this.changeCustomerHandler}/>
                                </div>
                                <div className="popup-box">
                                    <label>Борг </label>
                                    <input placeholder="UAH" name="debt" value={this.state.debt}
                                           onChange={this.changeDebtHandler}/>
                                </div>
                                <div className="popup-box">
                                    <label>Дата </label>
                                    <input placeholder="xxxx-xx-xx" name="date" value={this.state.date}
                                           onChange={this.changeDateHandler}/>
                                </div>
                                <div className="popup-box">
                                    <button type="button" className="add_button" disabled={!this.state.formValid}
                                            onClick={() => {
                                                this.sellStorage();
                                            }
                                            }>Продати
                                    </button>
                                    <button type="button" onClick={() => this.closeForm()}
                                            className="cancel_button">Скасувати
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

            </div>

        );
    }
}

export default StorageComponent;