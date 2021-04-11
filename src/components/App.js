import 'bootstrap/dist/css/bootstrap.css'

import {BrowserRouter as Router, Route, Switch, useLocation} from "react-router-dom";
import '../css/style.css'

import React, {Component} from "react";
import Login from "./LoginComponent/LoginComponent";
import Register from "./RegisterComponent";
import authHeader from "../js/auth-header";
import MainPageComponent from "./MainPageComponent";
import IncomePage from "./income/IncomePage";
import StoragePage from "./storage/StoragePage";
import SalePage from "./sale/SalePage";
import IncomeService from "../services/IncomeService";
import StorageService from "../services/StorageService";
import SaleService from "../services/SaleService";
import ScrollToTop from "../js/ScrollToTop";
import {Redirect} from "react-router";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sorting: true,
            currentUser: undefined,
            incomeData: [],
            nonFilteredIncome: '',
            loadingIncome: true,
            storageData: [],
            nonFilteredStorage: '',
            loadingStorage: true,
            saleData: [],
            nonFilteredSale: '',
            loadingSale: true,
            authorized: false,
            sortingDateAsc: true,
        };
        this.logOut = this.logOut.bind(this);
        this.onSearch = this.onSearch.bind(this)
        this.getData = this.getData.bind(this);
        this.addOrUpdateIncome = this.addOrUpdateIncome.bind(this)
        this.sort = this.sort.bind(this)
        this.propComparator = this.propComparator.bind(this)
        this.rarToIncome = this.rarToIncome.bind(this)
        this.rarToStorage = this.rarToStorage.bind(this)
        this.authorize = this.authorize.bind(this)
        this.sellStorage = this.sellStorage.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
    }

    componentDidMount() {

        if (authHeader() !== 'login') {
            this.setState({authorized: true})
            this.getData()
        } else {
            console.log("unauthorized")
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.authorized !== prevState.authorized) {
            this.getData()
        }
    }


    getIncome() {
        IncomeService.getIncome().then(
            res => {
                this.setState({
                    incomeData: res.data,
                    nonFilteredIncome: res.data,
                    loadingIncome: false
                });
                this.state.nonFilteredIncome.forEach(item => {
                    Object.defineProperty(item, 'rar', {
                        value: 0,
                        writable: true
                    });
                })
            },
            error => {
                console.log(error)
                this.logOut()
            }
        );
    }


    getStorage() {
        StorageService.getStorage().then(
            res => {
                this.setState({
                    storageData: res.data,
                    nonFilteredStorage: res.data,
                    loadingStorage: false
                });
                this.state.nonFilteredStorage.forEach(item => {
                    Object.defineProperty(item, 'rar', {
                        value: 0,
                        writable: true
                    });
                })
            },
            error => {
                console.log(error)
                this.logOut()
            }
        );
    }

    getSale() {
        SaleService.getSale().then(
            res => {
                this.setState({
                    saleData: res.data,
                    nonFilteredSale: res.data,
                    loadingSale: false
                });
                this.state.nonFilteredSale.forEach(item => {
                    Object.defineProperty(item, 'rar', {
                        value: 0,
                        writable: true
                    });
                })
            },
            error => {
                console.log(error)
                this.logOut()
            }
        );
    }

    logOut() {
        this.setState({authorized: false})
    }

    getData() {
        this.getIncome()
        this.getStorage()
        this.getSale()
    }

    rarToSale(tags) {
        this.state.nonFilteredSale.forEach(item => {
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
                    if (item.customer.toLowerCase().includes(tags[i])) {
                        item.rar++
                    }
                }
            }
        })
    }

    rarToIncome(tags) {
        this.state.nonFilteredIncome.forEach(item => {
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
    }

    rarToStorage(tags) {
        this.state.nonFilteredStorage.forEach(item => {
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
                }
            }
        })
    }


    onSearch(searchInc, page) {
        const searchLower = searchInc.toLowerCase();
        if (searchLower === '') {
            switch (page) {
                case 'income' : {
                    this.setState({incomeData: this.state.nonFilteredIncome})
                    break
                }
                case 'storage' : {
                    this.setState({storageData: this.state.nonFilteredStorage})
                    break
                }
                case 'sale' : {
                    this.setState({saleData: this.state.nonFilteredSale})
                    break
                }
                default: {
                }
            }
            return
        }
        const tags = searchLower.split(" ")
        let filteredGoods = [];
        switch (page) {
            case 'income' : {
                this.rarToIncome(tags);
                filteredGoods = this.state.nonFilteredIncome;
                break
            }
            case 'storage' : {
                this.rarToStorage(tags);
                filteredGoods = this.state.nonFilteredStorage;
                break
            }
            case 'sale' : {
                this.rarToSale(tags);
                filteredGoods = this.state.nonFilteredSale;
                break
            }
            default: {
            }
        }
        filteredGoods.sort(function (a, b) {
            return b.rar - a.rar;
        });
        filteredGoods = filteredGoods.filter(item => item.rar !== 0)
        switch (page) {
            case 'income' : {
                this.setState({incomeData: filteredGoods})
                this.state.nonFilteredIncome.forEach(item => {
                    item.rar = 0;
                })
                break
            }
            case 'storage' : {
                this.setState({storageData: filteredGoods})
                this.state.nonFilteredStorage.forEach(item => {
                    item.rar = 0;
                })
                break
            }
            case 'sale' : {
                this.setState({saleData: filteredGoods})
                this.state.nonFilteredSale.forEach(item => {
                    item.rar = 0;
                })
                break
            }
            default: {
            }
        }

    }

    clearSearch(page) {
        this.onSearch('', page)
    }

    addOrUpdateIncome(item) {
        if (item.id === '') {
            IncomeService.addIncome(item).then(res => {
                this.setState(({incomeData}) => {
                    const newItem = res.data;
                    const newArr = [newItem, ...incomeData];
                    return {
                        incomeData: newArr,
                    }
                })
            });
        } else {
            IncomeService.updateIncome(item, item.id).then(res => {
                this.setState(({incomeData, nonFilteredIncome}) => {
                    const index = incomeData.findIndex(elem => elem.id === item.id);
                    const newArr = [...incomeData.slice(0, index), res.data, ...incomeData.slice(index + 1)];


                    const indexNF = nonFilteredIncome.findIndex(elem => elem.id === item.id)
                    const newNonFilteredArray = [...nonFilteredIncome.slice(0, indexNF), res.data, ...nonFilteredIncome.slice(indexNF + 1)];
                    return {
                        incomeData: newArr,
                        nonFilteredIncome: newNonFilteredArray
                    }
                });
            });
        }
    }

    propComparator(prop, sorting) {
        if (prop === 'price' || prop === 'lastPrice')
            return function (a, b) {
                if (sorting) return a[prop] - b[prop]
                else return b[prop] - a[prop]
            }

        if (prop === 'date') return function (a, b) {
            let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
            let c = new Date(a.date.replace(pattern, '$3-$2-$1'));
            let d = new Date(b.date.replace(pattern, '$3-$2-$1'));
            if (sorting) return c - d
            else return d - c
        }
        return function compare(a, b) {
            if (sorting) {
                if (a[prop][prop] < b[prop][prop]) {
                    return -1;
                }
                if (a[prop][prop] > b[prop][prop]) {
                    return 1;
                }
            } else {
                if (a[prop][prop] > b[prop][prop]) {
                    return -1;
                }
                if (a[prop][prop] < b[prop][prop]) {
                    return 1;
                }
            }
            return 0;
        }
    }

    sort(page, column) {

        let sortedGoods = [];
        switch (page) {
            case 'income': {
                sortedGoods = this.state.incomeData
                sortedGoods.sort(this.propComparator(column, this.state.sorting))
                this.setState({
                    incomeData: sortedGoods,
                    sorting: !this.state.sorting
                })
                break;
            }
            case 'storage': {
                sortedGoods = this.state.storageData;
                sortedGoods.sort(this.propComparator(column, this.state.sorting))
                this.setState({
                    storageData: sortedGoods,
                    sorting: !this.state.sorting
                })
                break;
            }
            case 'sale': {
                sortedGoods = this.state.saleData;
                sortedGoods.sort(this.propComparator(column, this.state.sorting))
                this.setState({
                    saleData: sortedGoods,
                    sorting: !this.state.sorting
                })
                break;
            }
            default: {
                console.log("Error in sort/page")
            }
        }
    }

    sellStorage(sell, id) {
        StorageService.sellStorage(id, sell).then((res => {
            this.state.storageData.forEach(
                storage => {
                    if (storage.id === id) {
                        if (res.data.amount === 0) {
                            this.setState({storageData: this.state.storageData.filter(storage => storage.id !== id)});
                        } else {
                            storage.amount = res.data.amount;
                            this.setState({storageData: this.state.storageData})
                        }
                        this.getSale()
                    }
                }
            )
        }));
    }

    authorize() {
        this.setState({authorized: true})
    }

    render() {
        const {authorized, incomeData, storageData, saleData, loadingIncome, loadingSale, loadingStorage} = this.state;
        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        {authorized ?
                            <>
                                <Route exact path={["/", "/main", "/home"]} render={
                                    (props) =>
                                        <MainPageComponent
                                            {...props}
                                            logOut={this.logOut}
                                        />
                                }
                                />
                                {/*<Route exact path="/register" component={Register}/>*/}
                                <Route path="/income" render={
                                    (props) =>
                                        <IncomePage
                                            clearSearch={this.clearSearch}
                                            {...props}
                                            onSearch={this.onSearch}
                                            addOrUpdate={this.addOrUpdateIncome}
                                            income={incomeData}
                                            sort={this.sort}
                                            loadingIncome={loadingIncome}
                                        />
                                }
                                />
                                <Route path="/storage" render={
                                    (props) => <StoragePage
                                        {...props}
                                        clearSearch={this.clearSearch}
                                        storageData={storageData}
                                        onSearch={this.onSearch}
                                        sort={this.sort}
                                        sellStorage={this.sellStorage}
                                        loadingStorage={loadingStorage}
                                    />
                                }
                                />
                                <Route path="/sale" render={
                                    (props) => <SalePage
                                        {...props}
                                        clearSearch={this.clearSearch}
                                        saleData={saleData}
                                        onSearch={this.onSearch}
                                        sort={this.sort}
                                        loadingSale={loadingSale}
                                    />
                                }
                                />
                                <Redirect path="*" to={MainPageComponent}/>
                            </> :
                            <>
                                <Login
                                    authorize={this.authorize}
                                />
                            </>
                        }
                    </Switch>
                </ScrollToTop>
            </Router>


        );
    }
}

export default App;