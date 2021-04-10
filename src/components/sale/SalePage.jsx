import React, {Component} from 'react';
import SaleHeaderComponent from "./SaleHeaderComponent";
import SearchComponent from "../SearchComponent";
import SaleTableComponent from "./SaleTableComponent";

class SalePage extends Component {

    render() {
        if (this.props.saleData === '') return null
        const {onSearch, saleData, sort} = this.props;

        return (
            <>
                <SaleHeaderComponent
                    clearSearch={() => this.props.clearSearch('sale')}
                />
                <SearchComponent
                    addButton={false}
                    onSearch={onSearch}
                    page={'sale'}
                />
                <SaleTableComponent
                    goods={saleData}
                    sort={sort}
                />
            </>
        );
    }
}

export default SalePage;