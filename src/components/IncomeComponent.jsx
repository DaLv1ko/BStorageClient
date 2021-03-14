import React, {Component} from 'react';
import GoodsIncomeService from "../services/IncomeService";
import '../css/income.css';
import ReactLoading from "react-loading";

class IncomeComponent extends Component {

    constructor(props) {
        super(props)

        let today = new Date(),
            date = today.getDate() + '-' + ((today.getMonth()+1 < 10 ? '0' : '') + (today.getMonth()+1)) + '-' + today.getFullYear();

        this.state = {
            goods: [],
            brands: [],
            models:[],
            types:[],
            suppliers:[],
            search: '',
            nonFilteredGoods: [],
            number: null,
            addOrUpdate: '',
            id: this.props.match.params.id,
            type: '',
            brand: '',
            model: '',
            price: '',
            amount: '',
            supplier: '',
            date: '',
            count:1,
            currentDate:date

        }


        this.deleteIncome = this.deleteIncome.bind(this);

        this.changeTypeHandler = this.changeTypeHandler.bind(this)
        this.changeBrandHandler = this.changeBrandHandler.bind(this)
        this.changeModelHandler = this.changeModelHandler.bind(this)
        this.changePriceHandler = this.changePriceHandler.bind(this)
        this.changeAmountHandler = this.changeAmountHandler.bind(this)
        this.changeSupplierHandler = this.changeSupplierHandler.bind(this)
        this.changeDateHandler = this.changeDateHandler.bind(this)

        this.addOrUpdateIncome = this.addOrUpdateIncome.bind(this);

    }


    goToStorage() {
        this.props.history.push(`/storage`);
    }

    goToSale() {
        this.props.history.push(`/sell`);
    }
    goToMain() {
        this.props.history.push(`/main`);
    }

    componentDidMount() {

        GoodsIncomeService.getIncome().then((res) => {
            this.setState({goods: res.data});
            this.setState({nonFilteredGoods: res.data});
            console.log("qwe1")

        },error=>{
            this.props.history.push('/login')
            }
            );

        GoodsIncomeService.getBrands().then((res) => {
            this.setState({brands: res.data});
            console.log("wqe2")
        }); GoodsIncomeService.getModels().then((res) => {
            this.setState({models: res.data});
            console.log("wqe3")
        }); GoodsIncomeService.getSuppliers().then((res) => {
            this.setState({suppliers: res.data});
            console.log("weq4")
        }); GoodsIncomeService.getTypes().then((res) => {
            this.setState({types: res.data});
            console.log("ewq5")
        });

        if(this.state.id!==''){GoodsIncomeService.getIncomeById(this.state.id).then((res) => {
            let income = res.data;
            this.setState({
                type: income.type.type,
                brand: income.brand.brand,
                model: income.model.model,
                price: income.price,
                amount: income.amount,
                supplier: income.supplier.supplier,
                date: income.date
            })
            console.log("weq6")
        });}


    }


    addOrUpdateIncome() {
        console.log(this.state.addOrUpdate);
        let income = {
            type: this.state.type,
            brand: this.state.brand,
            model: this.state.model,
            price: this.state.price,
            amount: this.state.amount,
            supplier: this.state.supplier,
            date: this.state.date
        };


        if (this.state.addOrUpdate === '_add') {
            console.log("adding")
            GoodsIncomeService.addIncome(income).then(res => {
                console.log(res.data);
                let fullIncome = res.data;
                this.state.goods.push(fullIncome)
                this.setState({goods: this.state.goods})
            });
            this.closeForm();
        } else {
            console.log(this.state.goods)
            this.state.goods.map(
                update => {
                    if (update.id === this.state.id) {
                        update.type.type = this.state.type;
                        update.brand.brand = this.state.brand;
                        update.model.model = this.state.model;
                        update.price = this.state.price;
                        update.amount = this.state.amount;
                        update.supplier.supplier = this.state.supplier;
                        update.date = this.state.date;
                    }
                }
            )
            GoodsIncomeService.updateIncome(income, this.state.id).then(res => {
            });
            this.closeForm();
        }
        console.log(this.state.goods)

        this.setState({goods: this.state.goods.filter(income => income.amount !== 0)});
    }


    deleteIncome(id) {
        GoodsIncomeService.deleteIncome(id).then(res => {
            this.setState({goods: this.state.goods.filter(income => income.id !== id)});
        });

    }

    changeFilterHandler = (event) => {
        this.setState({search: event.target.value})
    }

    searchIncome() {
        this.setState({goods: this.state.nonFilteredGoods});
        let filter = document.getElementById("search").value;
        if (filter !== '')
            this.setState({goods: this.state.goods.filter(income => income.model.model === filter)});


    }

    cancel() {
        this.setState({addOrUpdate: ''})
        this.setState({id: ''})
        this.setState({type: ''})
        this.setState({brand: ''})
        this.setState({model: ''})
        this.setState({price: ''})
        this.setState({amount: ''})
        this.setState({supplier: ''})
        this.setState({date: ''})
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
    }
    changeAmountHandler = (event) => {
        this.setState({amount: event.target.value})
    }
    changeSupplierHandler = (event) => {
        this.setState({supplier: event.target.value})
    }
    changeDateHandler = (event) => {
        this.setState({date: event.target.value})
    }

    getButton() {
        if (this.state.addOrUpdate === '_add') {
            return <button type="button" className="add_button" onClick={() => {
                this.addOrUpdateIncome();
            }
            }>Додати
            </button>
        } else {
            return <button  type="button" className="add_button" onClick={() => {

                this.addOrUpdateIncome();
            }
            }>Редагувати
            </button>
        }
    }

    getDateInput() {
        if (this.state.addOrUpdate === '_add') {
            return  <input placeholder="xx-xx-xxxx" name="date" value={this.state.currentDate}
                           onChange={this.changeDateHandler}/>
        } else {
            return <input placeholder="xx-xx-xxxx" name="date" value={this.state.date}
                          onChange={this.changeDateHandler}/>
        }
    }

    getTitle() {
        if (this.state.addOrUpdate === '_add') {
            return <h3 className="title">Додати товар</h3>
        } else {
            return <h3 className="title">Редагувати товар</h3>
        }
    }



    addForm(){
        this.setState({addOrUpdate:'_add'});
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    updateForm(){
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

     closeForm(){
         let popup = document.getElementById('popup');
         popup.classList.remove('open');
         this.cancel();
    }

    isEmpty(){
        return this.state.nonFilteredGoods.length === 0;
    }

    render() {
        return (

            <div>
                {console.log(this.state.count++)}
                <header className="header lock-padding">
                    <div className="container-fluid p-0">
                        <div className="row m-0">
                            <div className="col-lg-4 p-0 menu">
                                <ul className="selected_menu_inner">
                                    <li><span className="selected_button_text" >Прихід</span>
                                        <i className="fas fa-times" style={{color:"white"}}
                                           aria-hidden="true" onClick={() => this.goToMain()}/>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner" onClick={() => this.goToStorage()}>

                                    <li className="button_text" >Склад</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner" onClick={() => this.goToSale()}>
                                    <li className="button_text" >Продаж</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>


                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg d-flex justify-content-center m-5">

                                <a
                                   className="search_but popup_link"
                                    onClick={() => {
                                        this.addForm();
                                    }}>Додати товар</a>
                            </div>
                            <div className="col-lg-12 d-flex justify-content-center">
                                <input id="search" value={this.state.search} onChange={this.changeFilterHandler}
                                       type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <button className="search_but" onClick={() => this.searchIncome()}>Знайти</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div>

                    <section className="frame">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="table-box">
                                        <table>
                                            <thead>
                                            <tr className="table_head">
                                                <th>№</th>
                                                <th>ТИП</th>
                                                <th>БРЕНД</th>
                                                <th>МОДЕЛЬ</th>
                                                <th>ЦІНА</th>
                                                <th>КІЛЬКІСТЬ</th>
                                                <th>ПОСТАЧАЛЬНИК</th>
                                                <th className="date_th">ДАТА</th>
                                                <th>ДІЇ</th>
                                            </tr>
                                            </thead>
                                            <script>
                                                {this.state.number=1}
                                            </script>
                                            <tbody>
                                            {
                                                this.state.goods.map(
                                                    income =>
                                                        <tr key={income.id} className="table_body">
                                                            {/* eslint-disable-next-line react/no-direct-mutation-state */}
                                                            <td>{this.state.number++}</td>
                                                            <td>{income.type.type}</td>
                                                            <td>{income.brand.brand}</td>
                                                            <td>{income.model.model}</td>
                                                            <td>{income.price}</td>
                                                            <td>{income.amount}</td>
                                                            <td>{income.supplier.supplier}</td>
                                                            <td>{income.date}</td>
                                                            <td>
                                                                <a onClick={() => {
                                                                    this.setState({addOrUpdate:'update'})
                                                                    this.setState({id:income.id})
                                                                    this.setState({type:income.type.type})
                                                                    this.setState({brand:income.brand.brand})
                                                                    this.setState({model:income.model.model})
                                                                    this.setState({price:income.price})
                                                                    this.setState({amount:income.amount})
                                                                    this.setState({supplier:income.supplier.supplier})
                                                                    this.setState({date:income.date})
                                                                    this.updateForm()
                                                                }}
                                                                    id="addGoods" className="update_button"
                                                                >Редагувати
                                                                </a>
                                                                {/*<button className="update_button"*/}
                                                                {/*        onClick={() => this.deleteIncome(income.id)}>D*/}
                                                                {/*</button>*/}
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                            </tbody>

                                        </table>

                                        <ReactLoading className="react_loading"   hidden={!this.isEmpty()} type={"bubbles"} color={"white"} height={500} width={500} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <datalist id="brands">{this.state.brands.map(brand => <option key={brand.id} value={brand.brand}/>)}</datalist>
                        <datalist id="models">{this.state.models.map(model => <option key={model.id} value={model.model}/>)}</datalist>
                        <datalist id="types">{this.state.types.map(type => <option key={type.id} value={type.type}/>)}</datalist>
                        <datalist id="suppliers">{this.state.suppliers.map(supplier => <option key={supplier.id} value={supplier.supplier}/>)}</datalist>
                    </section>



                    <section id='popup' className="popup">
                        <div className="popup_body">
                            <div className="popup_content">
                                <a onClick={()=>this.closeForm()} className="popup_close"><i
                                    className="fas fa-times" aria-hidden="true"/></a>
                                <form className="popup-form">
                                    <div className="popup-box">
                                        {this.getTitle()}
                                    </div>
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
                                        <input placeholder="UAH" name="price" value={this.state.price}
                                               onChange={this.changePriceHandler}/>
                                    </div>
                                    <div className="popup-box">
                                        <label>Кількість </label>
                                        <input placeholder="1+" name="amount" value={this.state.amount}
                                               onChange={this.changeAmountHandler}/>
                                    </div>
                                    <div className="popup-box">
                                        <label>Звідки</label>
                                        <input placeholder="poland/solo/..." name="supplier" value={this.state.supplier}
                                               onChange={this.changeSupplierHandler} list="suppliers"/>
                                    </div>

                                    <div className="popup-box">
                                        <label>Дата </label>
                                        {this.getDateInput()}
                                    </div>
                                    <div className="popup-box">
                                        {this.getButton()}
                                        <button type="button" onClick={() => this.closeForm()} className="cancel_button" >Скасувати
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

        );
    }


}

export default IncomeComponent;