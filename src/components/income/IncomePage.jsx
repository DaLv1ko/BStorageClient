import React, {Component} from 'react';
import '../../css/income.css';
import IncomeTableComponent from "./IncomeTableComponent"
import IncomeFormComponent from "./IncomeFormComponent"
import HeaderComponent from "../HeaderComponent";
import IncomePanelComponents from "./IncomePanelComponents";
import SearchComponent from "../SearchComponent";

class IncomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            itemId: ''
        }

        this.setItemId = this.setItemId.bind(this);
        // this.deleteIncome = this.deleteIncome.bind(this);
        this.resetItemId = this.resetItemId.bind(this)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props && prevState !== this.state) {
            console.log("updating")
        }
    }

    // deleteIncome(id) {
    //     IncomeService.deleteIncome(id).then(res => {
    //         this.setState({goods: this.state.goods.filter(income => income.id !== id)});
    //     });
    // }

    setItemId(id) {
        this.setState({itemId: id})
        this.setState({showForm: true})
        this.openForm();
    }

    openForm() {
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    resetItemId() {
        this.setState({itemId: ''})
    }

    render() {

        if (this.props.income === '') return null

        return (
            <>
                <HeaderComponent
                    page={'income'}
                    clearSearch={() =>this.props.clearSearch('income')}
                />
                <SearchComponent
                    addButton={true}
                    page={'income'}
                    onSearch={this.props.onSearch}
                />
                <IncomeTableComponent
                    sort={this.props.sort}
                    income={this.props.income}
                    setItemId={this.setItemId}
                    loading={this.props.loading}
                />
                <IncomeFormComponent
                    onAddOrUpdate={this.props.addOrUpdate}
                    itemId={this.state.itemId}
                    resetItemId={this.resetItemId}
                />
            </>
        );
    }
}

export default IncomePage;