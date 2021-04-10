import React, {Component} from "react";

export default class StorageTableItemComponent extends Component {

    render() {
        const {sellItem} = this.props;
        const {type, brand, model, lastPrice, amount} = this.props;
        let {count} = this.props;
        return (<>
            <td>{count}</td>
            <td>{type.type}</td>
            <td>{brand.brand}</td>
            <td>{model.model}</td>
            <td>{lastPrice}</td>
            <td>{amount}</td>
            <td>
                <button type="button" onClick={sellItem}
                        id="addGoods" className="update_button">Продати
                </button>

            </td>
        </>)
    }
}