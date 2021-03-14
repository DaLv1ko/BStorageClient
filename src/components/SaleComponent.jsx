import React, {Component} from 'react';
import '../css/sale.css';
import SaleService from "../services/SaleService";
import ReactLoading from "react-loading";

class SaleComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sales: [],
            number:1
        }

    }

    componentDidMount() {
        SaleService.getSale().then((res) => {
            this.setState({sales: res.data});
        },error=>{
            this.props.history.push('/login')
        });
    }

    goToIncome() {
        this.props.history.push(`/income`);
    }

    goToStorage() {
        this.props.history.push(`/storage`);
    }

    goToMain() {
        this.props.history.push(`/main`);
    }

    isEmpty(){
        return this.state.sales.length === 0;
    }

    render() {
        return (

            <div>
                <header>
                    <div className="container-fluid p-0">
                        <div className="row m-0">
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner" onClick={() => this.goToIncome()}>

                                    <li className="button_text" >Прихід</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 p-0 menu">
                                <ul className="menu_inner" onClick={()=> this.goToStorage()}>

                                    <li className="button_text" >Склад</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 p-0 menu">
                                <ul className="selected_menu_inner">
                                    <li><span className="selected_button_text" >Продаж</span>
                                        <i className="fas fa-times" style={{color:"white"}}
                                           aria-hidden="true" onClick={() => this.goToMain()}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>


                <section className="search">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <input type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <input className="search_but" type="submit" value="Знайти"/>
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
                                                <th>ПОКУПЕЦЬ</th>
                                                <th>БОРГ</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.sales.map(
                                                    sale =>
                                                        <tr key={sale.id} className="table_body">
                                                            <td>{this.state.number++}</td>
                                                            <td>{sale.type.type}</td>
                                                            <td>{sale.brand.brand}</td>
                                                            <td>{sale.model.model}</td>
                                                            <td>{sale.price}</td>
                                                            <td>{sale.amount}</td>
                                                            <td>{sale.customer}</td>
                                                            <td>{sale.debt}</td>

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

                </div>

            </div>

        );
    }
}

export default SaleComponent;