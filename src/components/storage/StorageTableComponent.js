import React, {Component} from "react";
import ReactLoading from "react-loading";
import StorageTableItemComponent from "./StorageTableItemComponent";


export default class StorageTableComponent extends Component {

    render() {
        const {goods, loading, sellItem, sort} = this.props;
        let count = 1;
        const elements = goods.map((storage) => {
            return (
                <tr key={storage.id} className="table_body">
                    <StorageTableItemComponent
                        {...storage}
                        count={count++}
                        sellItem={() => sellItem(storage)}
                    />
                </tr>
            )
        })
        const content = loading ? <ReactLoading type={"cylon"} height={500} width={500}/> :
            <MainContent elements={elements} sort={sort}/>

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
                <th>ТИП <i onClick={()=>sort('storage','type')} className="fas fa-sort"/></th>
                <th>БРЕНД <i onClick={()=>sort('storage','brand')} className="fas fa-sort"/></th>
                <th>МОДЕЛЬ <i onClick={()=>sort('storage','model')} className="fas fa-sort"/></th>
                <th>ОСТАННЯ ЦІНА <i onClick={()=>sort('storage','lastPrice')} className="fas fa-sort"/></th>
                <th>КІЛЬКІСТЬ</th>
                <th>ДІЇ</th>
            </tr>
            </thead>
            <tbody>
            {elements}
            </tbody>
        </table>
    )
}

