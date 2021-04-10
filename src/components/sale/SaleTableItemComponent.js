import React, {Component} from "react";

export default class SaleTableItemComponent extends Component {

    render() {
        const {count, type, brand,model,price,amount,customer,debt,date} =this.props;
        return (<>
            <td>{count}</td>
            <td>{type.type}</td>
            <td>{brand.brand}</td>
            <td>{model.model}</td>
            <td>{price}</td>
            <td>{amount}</td>
            <td>{customer}</td>
            <td>{debt}</td>
            <td>{date}</td>
        </>)
    }
}