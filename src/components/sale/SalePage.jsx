import React, {Component} from 'react';
import SearchComponent from "../SearchComponent";
import SaleTableComponent from "./SaleTableComponent";
import HeaderComponent from "../HeaderComponent";

class SalePage extends Component {

    render() {
        if (this.props.saleData === '') return null
        const {onSearch, saleData, sort} = this.props;

        return (
            <>
                <HeaderComponent
                    page={'sale'}
                    clearSearch={() =>this.props.clearSearch('income')}
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