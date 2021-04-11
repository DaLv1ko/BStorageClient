import React, {Component} from 'react';
import StorageTableComponent from "./StorageTableComponent";
import StorageFormComponent from "./StorageFormComponent";
import SearchComponent from "../SearchComponent";
import HeaderComponent from "../HeaderComponent";
import Spinner from "../Spinner";

class StoragePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: ''
        }

        this.sellItem = this.sellItem.bind(this)
    }

    sellItem(item) {
        this.setState({item: item})
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    render() {
        if (this.props.storageData === '')
            return <Spinner/>

        const {clearSearch, onSearch, sort, storageData, sellStorage} = this.props;
        const {item} = this.state;
        return (
            <>

                <HeaderComponent
                    page={'storage'}
                    clearSearch={() => clearSearch('income')}
                />
                <SearchComponent
                    addButton={false}
                    onSearch={onSearch}
                    page={'storage'}
                />
                <StorageTableComponent
                    sort={sort}
                    sellItem={this.sellItem}
                    goods={storageData}
                />
                <StorageFormComponent sellStorage={sellStorage} item={item}/>
            </>
        );
    }
}

export default StoragePage;