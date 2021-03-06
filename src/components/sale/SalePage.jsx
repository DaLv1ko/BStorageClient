import React, {Component} from 'react';
import SearchComponent from "../SearchComponent";
import SaleTableComponent from "./SaleTableComponent";
import HeaderComponent from "../HeaderComponent";
import Spinner from "../Spinner";

class SalePage extends Component {

    render() {
        if (this.props.loadingSale) return <Spinner/>

        const {onSearch, saleData, sort, clearSearch} = this.props;
        return (
            <>
                <HeaderComponent
                    page={'sale'}
                    clearSearch={() =>clearSearch('income')}
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