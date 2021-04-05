import React, {Component} from "react";
import ReactLoading from "react-loading";
import IncomeTableItemComponent from "../IncomeTableItemComponent/IncomeTableItemComponent";


export default class IncomeTableComponent extends Component {

    isEmpty(goods){
            return goods.length === 0;
    }


    render() {
        const {goods, setItemId, loading} = this.props;
        console.log("loading: "+loading)
        const elements = goods.map((income) => {
                return (
                    <tr key={income.id} className="table_body">
                        <IncomeTableItemComponent
                            {...income}
                            setItemId={() => setItemId(income.id)}
                        />
                    </tr>
                )
            })
        const content = loading ? <ReactLoading  type={"cylon"} height={500} width={500}/> : <MainContent elements={elements} />

        return (
            <section className="frame">
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="frame__box">
                                {content}
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const MainContent = ({elements}) => {
    return(
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
            <tbody>
            {elements}
            </tbody>
        </table>
    )
}

