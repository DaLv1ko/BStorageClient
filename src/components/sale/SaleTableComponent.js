import React, {Component} from "react";
import SaleTableItemComponent from "./SaleTableItemComponent";


export default class SaleTableComponent extends Component {

    render() {
        const {goods, sort} = this.props;

        let count = 1;
        const elements = goods.map((storage) => {
            return (
                <tr key={storage.id} className="table_body">
                    <SaleTableItemComponent
                        {...storage}
                        count={count++}
                    />
                </tr>
            )
        })


        return (
            <section className="frame">
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="frame__box">
                                <MainContent elements={elements} sort={sort}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const MainContent = ({elements, sort}) => {
    return (
        <table>
            <thead>
            <tr className="table_head">
                <th>№</th>
                <th>ТИП <i onClick={()=>sort('sale','type')} className="fas fa-sort"/></th>
                <th>БРЕНД<i onClick={()=>sort('sale','brand')} className="fas fa-sort"/></th>
                <th>МОДЕЛЬ <i onClick={()=>sort('sale','model')} className="fas fa-sort"/></th>
                <th>ЦІНА<i onClick={()=>sort('sale','price')} className="fas fa-sort"/></th>
                <th>КІЛЬКІСТЬ</th>
                <th>ПОКУПЕЦЬ</th>
                <th>БОРГ</th>
                <th>ДАТА<i onClick={()=>sort('sale','date')} className="fas fa-sort"/></th>
            </tr>
            </thead>
            <tbody>
            {elements}
            </tbody>
        </table>
    )
}

