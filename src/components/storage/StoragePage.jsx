import React, {Component} from 'react';
import StorageTableComponent from "./StorageTableComponent";
import StorageService from "../../services/StorageService";
import StorageFormComponent from "./StorageFormComponent";
import SearchComponent from "../SearchComponent";
import HeaderComponent from "../HeaderComponent";

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
        if (this.props.storageData === '') return null
        return (
            <>
                <HeaderComponent
                    page={'storage'}
                    clearSearch={() =>this.props.clearSearch('income')}
                />
                <SearchComponent
                    addButton={false}
                    onSearch={this.props.onSearch}
                    page={'storage'}
                />
                <StorageTableComponent
                    sort={this.props.sort}
                    sellItem={this.sellItem}
                    goods={this.props.storageData}
                />
                <StorageFormComponent sellStorage={this.props.sellStorage} item={this.state.item}/>
            </>
        );
    }
}

export default StoragePage;