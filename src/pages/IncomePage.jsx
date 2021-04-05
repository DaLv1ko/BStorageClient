import React, {Component} from 'react';
import IncomeService from "../services/IncomeService";
import '../css/income.css';
import IncomeTableComponent from "../components/Income/IncomeTableComponent/IncomeTableComponent"
import IncomeFormComponent from "../components/Income/IncomeFormComponent/IncomeFormComponent"
import IncomeHeaderComponent from "../components/Income/IncomeHeaderComponent/IncomeHeaderComponent";
import IncomePanelComponents from "../components/Income/IncomePanelComponent/IncomePanelComponents";

class IncomePage extends Component {

    constructor(props) {
        super(props)

        this.getIncome();

        this.state = {
            goods: [],
            nonFilteredGoods: [],
            count: 1,
            itemId: '',
            loading: true
        }

        this.setItemId = this.setItemId.bind(this);
        this.addOrUpdateIncome = this.addOrUpdateIncome.bind(this);
        this.deleteIncome = this.deleteIncome.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    addOrUpdateIncome(item) {
        if (item.id === '') {
            IncomeService.addIncome(item).then(res => {
                this.setState(({goods}) => {
                    const newItem = res.data;
                    const newArr = [newItem, ...goods];
                    return {
                        goods: newArr,
                    }
                })
            });
        } else {
            IncomeService.updateIncome(item, item.id).then(res => {
                this.setState(({goods, nonFilteredGoods}) => {
                    const index = goods.findIndex(elem => elem.id === item.id);
                    const newArr = [...goods.slice(0, index), res.data, ...goods.slice(index + 1)];


                    const indexNF = nonFilteredGoods.findIndex(elem => elem.id === item.id)
                    const newNonFilteredArray = [...nonFilteredGoods.slice(0, indexNF), res.data, ...nonFilteredGoods.slice(indexNF + 1)];
                    return {
                        goods: newArr,
                        nonFilteredGoods: newNonFilteredArray
                    }
                });
            });
        }
    }

    getIncome() {
        IncomeService.getIncome()
            .then((res) => {
                    this.setState({
                        goods: res.data,
                        nonFilteredGoods: res.data,
                        loading: false
                    });
                }, error => {
                    this.props.history.push('/login')
                }
            );

    }

    deleteIncome(id) {
        IncomeService.deleteIncome(id).then(res => {
            this.setState({goods: this.state.goods.filter(income => income.id !== id)});
        });
    }

    async setItemId(id) {
        console.log("SetItemId: " + id)
        this.setState({itemId: id})
        await this.setState({showForm: true})
        this.updateForm();
    }

    updateForm() {
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    onSearch(searchInc) {
        const searchLower = searchInc.toLowerCase();

        let filteredGoods = [];
        if (searchLower === '') {
            this.setState({goods: this.state.nonFilteredGoods})
            return
        }

        const tags = searchLower.split(" ")
        this.state.nonFilteredGoods.map(item => {
            Object.defineProperty(item, 'rar', {
                value: 0,
                writable: true
            });

        })

        this.state.nonFilteredGoods.map(item => {
            for (let i = 0; i < tags.length; i++) {
                if (tags[i] !== '') {
                    if (item.type.type.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                    if (item.brand.brand.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                    if (item.model.model.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                    if (item.date.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                    if (item.supplier.supplier.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                }

            }
        })

        filteredGoods = this.state.nonFilteredGoods;
        filteredGoods.sort(function (a, b) {
            return b.rar - a.rar;
        });
        filteredGoods = filteredGoods.filter(item =>
            item.rar !== 0
        )
        this.setState({goods: filteredGoods})
    }

    render() {
        return (
            <>
                <IncomeHeaderComponent/>
                <IncomePanelComponents
                    onSearch={this.onSearch}
                />
                <IncomeTableComponent
                    goods={this.state.goods}
                    setItemId={this.setItemId}
                    loading={this.state.loading}
                />
                <IncomeFormComponent
                    onAddOrUpdate={this.addOrUpdateIncome}
                    itemId={this.state.itemId}
                />
            </>
        );
    }
}

export default IncomePage;