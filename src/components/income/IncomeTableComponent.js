import React, {Component} from "react";
import ReactLoading from "react-loading";
import IncomeTableItemComponent from "./IncomeTableItemComponent";


export default class IncomeTableComponent extends Component {

    componentDidMount() {
        console.log("imctable")
    }

    render() {
        const {income, setItemId, loading, sort} = this.props;
        let elements;
        if(income!==undefined && income!==''){
            let count = 1;
            console.log(income)
            elements = income.map((income) => {
                return (
                    <tr key={income.id} className="table_body">
                        <IncomeTableItemComponent
                            {...income}
                            count={count++}
                            setItemId={() => setItemId(income.id)}
                        />
                    </tr>
                )
            })}

        const content = loading ? <ReactLoading type={"cylon"} height={500} width={500}/> :
            <MainContent elements={elements}  sort={sort}/>
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

const MainContent = ({elements, sort}) => {
    return (
        <table>
            <thead>
            <tr className="table_head">
                <th>№</th>
                <th>ТИП <i onClick={()=>sort('income','type')} className="fas fa-sort"/></th>
                <th>БРЕНД <i onClick={()=>sort('income','brand')} className="fas fa-sort"/></th>
                <th>МОДЕЛЬ <i onClick={()=>sort('income','model')} className="fas fa-sort"/></th>
                <th className="price_th">ЦІНА <i onClick={()=>sort('income','price')} className="fas fa-sort"/></th>
                <th>КІЛЬКІСТЬ</th>
                <th>ПОСТАЧАЛЬНИК</th>
                <th className="date_th">ДАТА <i onClick={()=>sort('income','date')} className="fas fa-sort"/></th>
                <th>ДІЇ</th>
            </tr>
            </thead>
            <tbody>
            {elements}
            </tbody>
        </table>
    )
}

