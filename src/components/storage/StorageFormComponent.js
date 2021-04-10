import React, {Component} from 'react';
import {FormErrors} from "../../js/FormErrors";

export default class StorageFormComponent extends Component {


    constructor(props) {
        super(props)


        let today = new Date(),
            date = today.getDate() + '.' + ((today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1)) + '.' + today.getFullYear();


        this.state = {
            item: '',
            id: '',
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            supplier: '',
            customer:'',
            currentDate: date,
            date:date,
            debt:'',
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

        this.onSubmit = this.onSubmit.bind(this)
        this.cancel = this.cancel.bind(this)
        this.closeForm = this.closeForm.bind(this)

        this.changeTypeHandler = this.changeTypeHandler.bind(this)
        this.changeBrandHandler = this.changeBrandHandler.bind(this)
        this.changeModelHandler = this.changeModelHandler.bind(this)
        this.changePriceHandler = this.changePriceHandler.bind(this)
        this.changeAmountHandler = this.changeAmountHandler.bind(this)
        this.changeSupplierHandler = this.changeSupplierHandler.bind(this)
        this.changeDateHandler = this.changeDateHandler.bind(this)
        this.changeDebtHandler = this.changeDebtHandler.bind(this)
        this.changeCustomerHandler = this.changeCustomerHandler.bind(this)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if ((prevState.item !== this.props.item)) {
            this.setState({
                id: this.props.item.id,
                item: this.props.item,
                brand: this.props.item.brand.brand,
                type: this.props.item.type.type,
                model: this.props.item.model.model,
                maxAmount: this.props.item.amount
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


    closeForm() {
            let popup = document.getElementById('popup');
            popup.classList.remove('open');
            this.cancel();
    }

    cancel() {

        this.setState({
            id:'',
            item:'',
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            maxAmount: '',
            customer: '',
            debt: '',
            date: this.state.currentDate,
            addDate: true,
            itemId: '',
            formValid: false,
            dateValid: true,
            amountValid: false,
            priceValid: false,
            formErrors: {
                amount: '',
                price: '',
                date: '',
            }
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
    changeCustomerHandler = (event) => {
        this.setState({customer: event.target.value})
    }

    changeDebtHandler = (event) => {
        this.setState({debt: event.target.value})
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let amountValid = this.state.amountValid;
        switch (fieldName) {
            case 'amount':
                amountValid = value <= this.state.maxAmount && value > 0;
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


    onSubmit(e) {
        e.preventDefault();
        const item = {
            type: this.state.type,
            model: this.state.model,
            brand: this.state.brand,
            price: this.state.price,
            amount: this.state.amount,
            customer: this.state.customer,
            debt: this.state.debt,
            date: this.state.date
        }
        this.props.sellStorage(item, this.state.id);
        this.closeForm()
    }


    render() {

        return (
            <section id='popup' className="popup">
                <div className="popup_body">
                    <div className="popup_content ">
                        <h2 className="title_form">Продати</h2>
                       <i onClick={this.closeForm}
                            className="fas fa-times popup_close" aria-hidden="true"/>
                        <form onSubmit={this.onSubmit} className="popup-form">
                            <div className="popup-box">
                                <label>Тип </label>
                                <input placeholder="tv/phone/..." name="type" value={this.state.type}
                                       list="types" readOnly={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Бренд </label>
                                <input placeholder="samsung/lg/..." name="brand" value={this.state.brand}
                                       list="brands" readOnly={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Модель </label>
                                <input placeholder="nu7120/kj312/..." name="model" value={this.state.model}
                                       list="models" readOnly={true}/>
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

                                <input type="number" placeholder="1+" name="amount"
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
                                <input placeholder="дд.мм.рррр" name="date" value={this.state.date}
                                       onChange={this.changeDateHandler}/>
                            </div>
                            <div className="popup-box  popup-box-butt">
                                <button type="submit" className="add_button" disabled={!this.state.formValid}
                                >Продати
                                </button>
                                <button type="button" onClick={() => this.closeForm()} className="cancel_button"
                                >Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


