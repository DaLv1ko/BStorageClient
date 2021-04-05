import React, {Component} from "react";

export default class IncomeTableItemComponent extends Component {

    render() {
            const {setItemId} = this.props
            const {id, type, brand,model,price,amount,supplier,date} =this.props;
        return (<>
            <td>{id}</td>
            <td>{type.type}</td>
            <td>{brand.brand}</td>
            <td>{model.model}</td>
            <td>{price}</td>
            <td>{amount}</td>
            <td>{supplier.supplier}</td>
            <td>{date}</td>
            <td>
                <a onClick={setItemId}  id="addGoods" className="update_button">Редагувати</a>

                {/*<button className="update_button"*/}
                {/*        onClick={}>D*/}
                {/*</button>*/}
            </td>
        </>)
    }
}