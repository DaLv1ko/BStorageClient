import React, {Component} from 'react';
import {FormErrors} from "../../js/FormErrors";
import IncomeDataListComponent from "./IncomeDataListComponent";
import IncomeService from "../../services/IncomeService";

export default class IncomeFormComponent extends Component {


    constructor(props) {
        super(props)


        let today = new Date(),
            date = today.getDate() + '.' + ((today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1)) + '.' + today.getFullYear();


        this.state = {
            currentState: 1,
            doing: 'add',
            id: '',
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            supplier: '',
            itemId: this.props.itemId,
            date: date,
            currentDate: date,
            formErrors: {
                amount: '',
                price: '',
                date: '',
            },
            formValid: false,
            dateValid: true,
            amountValid: false,
            priceValid: false
        }
        this.getIncomeItem = this.getIncomeItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getTitle = this.getTitle.bind(this)
        this.getButton = this.getButton.bind(this)
        this.cancel = this.cancel.bind(this)
        this.closeForm = this.closeForm.bind(this)

        this.changeTypeHandler = this.changeTypeHandler.bind(this)
        this.changeBrandHandler = this.changeBrandHandler.bind(this)
        this.changeModelHandler = this.changeModelHandler.bind(this)
        this.changePriceHandler = this.changePriceHandler.bind(this)
        this.changeAmountHandler = this.changeAmountHandler.bind(this)
        this.changeSupplierHandler = this.changeSupplierHandler.bind(this)
        this.changeDateHandler = this.changeDateHandler.bind(this)


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("hui")
        console.log(this.props.itemId)
        console.log(prevState.itemId)
        if ((this.props.itemId !== prevState.itemId)) {
            console.log("updating")
            this.getIncomeItem();

        }
    }

    componentDidMount() {

            console.log("incform")

        this.getIncomeItem();
    }

    getIncomeItem() {
        const {itemId} = this.props;
        if (itemId !== '') {
            IncomeService.getIncomeById(itemId)
                .then((res) => {
                    this.setState({
                        id: res.data.id,
                        type: res.data.type.type,
                        brand: res.data.brand.brand,
                        model: res.data.model.model,
                        price: res.data.price,
                        amount: res.data.amount,
                        date: res.data.date,
                        supplier: res.data.supplier.supplier,
                        itemId:itemId
                    })
                })
        }
    }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }


    getDateInput() {
        if (this.state.addOrUpdate === '_add') {


            if (this.state.addDate) {
                this.state.date = this.state.currentDate;
            }
            return <input placeholder="дд.мм.рррр" name="date" value={this.state.date}
                          onChange={this.changeDateHandler}/>
        } else {
            return <input placeholder="дд.мм.рррр" name="date" value={this.state.date}
                          onChange={this.changeDateHandler}/>
        }
    }

    closeForm() {
        this.props.resetItemId();
        let popup = document.getElementById('popup');
        popup.classList.remove('open');
        this.cancel();
    }

    cancel() {

        this.setState({
            currentState: 1,
            doing: 'add',
            id: '',
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            supplier: '',
            itemId: '',

            formErrors: {
                amount: '',
                price: '',
                date: '',
            },
            formValid: false,
            dateValid: true,
            amountValid: false,
            priceValid: false,

            date: this.state.currentDate,

            addDate: true,

        })
    }

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value})
    }
    changeBrandHandler = (event) => {
        this.setState({brand: event.target.value})
    }
    changeModelHandler = (event) => {
        this.setState({model: event.target.value})
    }
    changePriceHandler = (event) => {
        this.setState({price: event.target.value})
        this.handleUserInput(event);
    }
    changeAmountHandler = (event) => {
        this.setState({amount: event.target.value})
        this.handleUserInput(event);
    }
    changeSupplierHandler = (event) => {
        this.setState({supplier: event.target.value})
    }
    changeDateHandler = (event) => {
        this.setState({date: event.target.value})
        this.handleUserInput(event);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let amountValid = this.state.amountValid;
        let priceValid = this.state.priceValid;
        let dateValid = this.state.dateValid;

        switch (fieldName) {
            case 'amount': {
                amountValid = value > 0 && Number.isInteger(+value);
                fieldValidationErrors.amount = amountValid ? '' : 'Кількість некоректна';
                break;
            }

            case 'price': {
                priceValid = value > 0 && Number.isInteger(+value);
                fieldValidationErrors.price = priceValid ? '' : 'Ціна некоректна';
                break;
            }
            case 'date': {
                dateValid = /^\s*(3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2})\s*$/g.test(value);
                fieldValidationErrors.date = dateValid ? '' : 'Дата некоректна';
                break;
            }

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            amountValid: amountValid,
            priceValid: priceValid,
            dateValid: dateValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.amountValid && this.state.priceValid && this.state.dateValid
        })
    };

    getTitle(id) {
        if (id === '') {
            return <h2 className="title_form add_title_form">Додати товар</h2>
        } else {
            return <h2 className="title_form">Редагувати товар</h2>
        }
    }

    getButton(id) {
        if (id === '') {
            return <button disabled={!this.state.formValid} type="submit" className="search_but__popup">Додати
            </button>
        } else {

                this.state.amountValid= true;
                this.state.priceValid= true;

            return <button disabled={!this.state.formValid} type="submit" className="search_but__popup">Редагувати
            </button>
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const item = {
            id: this.state.id,
            type: this.state.type,
            model: this.state.model,
            brand: this.state.brand,
            price: this.state.price,
            amount: this.state.amount,
            supplier: this.state.supplier,
            date: this.state.date
        }
        this.props.onAddOrUpdate(item);
        this.closeForm()
    }


    render() {

        return (
            <section id='popup' className="popup">
                <div className="popup_body" >
                    <div className="popup_content">
                        {this.getTitle(this.state.id)}
                        <a onClick={() => this.closeForm()} className="popup_close"><i
                            className="fas fa-times" aria-hidden="true"/></a>
                        <form onSubmit={this.onSubmit}
                              className="popup-form">

                            <div className="popup-box">
                                <label>Тип </label>
                                <input placeholder="tv/phone/..." name="type" value={this.state.type}
                                       onChange={this.changeTypeHandler} list="types"/>
                            </div>
                            <div className="popup-box">
                                <label>Бренд </label>
                                <input placeholder="samsung/lg/..." name="brand" value={this.state.brand}
                                       onChange={this.changeBrandHandler} list="brands"/>
                            </div>
                            <div className="popup-box">
                                <label>Модель </label>
                                <input placeholder="nu7120/kj312/..." name="model" value={this.state.model}
                                       onChange={this.changeModelHandler} list="models"/>
                            </div>
                            <div className="popup-box">
                                <label>Ціна </label>
                                <input type="number" placeholder="UAH" name="price" value={this.state.price}
                                       onChange={this.changePriceHandler}/>
                            </div>

                            <div className="popup-box">
                                <label>Кількість </label>
                                <input type="number" placeholder="1+" name="amount" value={this.state.amount}
                                       onChange={this.changeAmountHandler}/>
                            </div>
                            <div className="popup-box">
                                <label>Постачальник</label>
                                <input placeholder="poland/solo/..." name="supplier" value={this.state.supplier}
                                       onChange={this.changeSupplierHandler} list="suppliers"/>
                            </div>

                            <div className="popup-box">
                                <label>Дата</label>
                                <input placeholder="дд.мм.рррр" name="date" value={this.state.date}
                                       onChange={this.changeDateHandler}/>
                            </div>

                            <FormErrors formErrors={this.state.formErrors}/>

                            <div className="popup-box popup-box-butt ">
                                {this.getButton(this.state.id)}
                                <button type="button" onClick={() => this.closeForm()}
                                        className="search_but__popup close-popup">Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <IncomeDataListComponent/>
            </section>
        );
    }
}


