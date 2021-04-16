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
        this.closeIncomeForm = this.closeIncomeForm.bind(this)
        this.escFunction = this.escFunction.bind(this)

        this.changeTypeHandler = this.changeTypeHandler.bind(this)
        this.changeBrandHandler = this.changeBrandHandler.bind(this)
        this.changeModelHandler = this.changeModelHandler.bind(this)
        this.changePriceHandler = this.changePriceHandler.bind(this)
        this.changeAmountHandler = this.changeAmountHandler.bind(this)
        this.changeSupplierHandler = this.changeSupplierHandler.bind(this)
        this.changeDateHandler = this.changeDateHandler.bind(this)


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.itemId !== prevState.itemId)) {
            this.getIncomeItem();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.closeIncomeForm()
        }
    }

    getIncomeItem() {
        const {itemId} = this.props;
        if (itemId !== '') {
            this.props.incomeData.forEach(item => {
                if (item.id === itemId) {
                    this.setState({
                        id: item.id,
                        type: item.type.type,
                        brand: item.brand.brand,
                        model: item.model.model,
                        price: item.price,
                        amount: item.amount,
                        date: item.date,
                        supplier: item.supplier.supplier,
                        itemId: itemId,
                        priceValid: true,
                        dateValid: true,
                        amountValid: true,
                    })
                }
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

    closeIncomeForm() {
        this.props.resetItemId();
        this.props.closeForm();
        this.cancel();
    }

    cancel() {
        this.setState({
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
            },
            this.validateForm);
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
        this.closeIncomeForm()
    }


    render() {
        const {type, brand, model, id, price, amount, supplier, date, formErrors} = this.state;
        return (
            <section id='popup' className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        {this.getTitle(id)}
                        <i onClick={this.closeIncomeForm}
                           className="fas fa-times popup_close" aria-hidden="true"/>
                        <form onSubmit={this.onSubmit}
                              className="popup-form">

                            <div className="popup-box">
                                <label>Тип </label>
                                <input placeholder="tv/phone/..." name="type" value={type}
                                       onChange={this.changeTypeHandler} list="types" required={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Бренд </label>
                                <input placeholder="samsung/lg/..." name="brand" value={brand}
                                       onChange={this.changeBrandHandler} list="brands" required={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Модель </label>
                                <input placeholder="nu7120/kj312/..." name="model" value={model}
                                       onChange={this.changeModelHandler} list="models" required={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Ціна </label>
                                <input type="number" placeholder="UAH" name="price" value={price}
                                       onChange={this.changePriceHandler} required={true}/>
                            </div>

                            <div className="popup-box">
                                <label>Кількість </label>
                                <input type="number" placeholder="1+" name="amount" value={amount}
                                       onChange={this.changeAmountHandler} required={true}/>
                            </div>
                            <div className="popup-box">
                                <label>Постачальник</label>
                                <input placeholder="poland/solo/..." name="supplier" value={supplier}
                                       onChange={this.changeSupplierHandler} list="suppliers" required={true}/>
                            </div>

                            <div className="popup-box">
                                <label>Дата</label>
                                <input placeholder="дд.мм.рррр" name="date" value={date}
                                       onChange={this.changeDateHandler} required={true}/>
                            </div>
                            <FormErrors formErrors={formErrors}/>
                            <div className="popup-box popup-box-butt ">
                                {this.getButton(id)}
                                <button type="button" onClick={() => this.closeIncomeForm()}
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


