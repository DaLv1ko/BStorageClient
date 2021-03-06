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
        this.closeStorageForm = this.closeStorageForm.bind(this)
        this.escFunction = this.escFunction.bind(this)

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

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.closeStorageForm()
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


    closeStorageForm() {
           this.props.closeForm();
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
                fieldValidationErrors.amount = amountValid ? '' : ' ????????????????????';
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
        this.closeStorageForm()
    }


    render() {
        const {type, brand, model, formValid, debt, price, amount, customer, date, formErrors} =this.state;
        return (
            <section id='popup' className="popup">
                <div className="popup_body">
                    <div className="popup_content ">
                        <h2 className="title_form">??????????????</h2>
                       <i onClick={this.closeStorageForm}
                            className="fas fa-times popup_close" aria-hidden="true"/>
                        <form onSubmit={this.onSubmit} className="popup-form">
                            <div className="popup-box">
                                <label>?????? </label>
                                <input placeholder="tv/phone/..." name="type" value={type}
                                       list="types" readOnly={true}/>
                            </div>
                            <div className="popup-box">
                                <label>?????????? </label>
                                <input placeholder="samsung/lg/..." name="brand" value={brand}
                                       list="brands" readOnly={true}/>
                            </div>
                            <div className="popup-box">
                                <label>???????????? </label>
                                <input placeholder="nu7120/kj312/..." name="model" value={model}
                                       list="models" readOnly={true}/>
                            </div>

                            <div className="popup-box">
                                <label>???????? </label>
                                <input placeholder="UAH" name="price" value={price}
                                       onChange={this.changePriceHandler}/>
                            </div>
                            <div>
                                <FormErrors formErrors={formErrors}/>
                            </div>
                            <div className="popup-box">
                                <label>?????????????????? </label>

                                <input type="number" placeholder="1+" name="amount"
                                       value={amount}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className="popup-box">
                                <label>???????????????? </label>
                                <input placeholder="????????" name="customer" value={customer}
                                       onChange={this.changeCustomerHandler}/>
                            </div>
                            <div className="popup-box">
                                <label>???????? </label>
                                <input placeholder="UAH" name="debt" value={debt}
                                       onChange={this.changeDebtHandler}/>
                            </div>
                            <div className="popup-box">
                                <label>???????? </label>
                                <input placeholder="????.????.????????" name="date" value={date}
                                       onChange={this.changeDateHandler}/>
                            </div>
                            <div className="popup-box  popup-box-butt">
                                <button type="submit" className="add_button" disabled={!formValid}
                                >??????????????
                                </button>
                                <button type="button" onClick={() => this.closeStorageForm()} className="cancel_button"
                                >??????????????????
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


