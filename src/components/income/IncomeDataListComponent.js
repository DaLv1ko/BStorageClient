import React, {Component} from "react";
import IncomeService from "../../services/IncomeService";

export default class IncomeDataListComponent extends Component{

    state = {
        brands:[],
        models:[],
        suppliers:[],
        types:[]
    }

    componentDidMount() {
        console.log("wtf")
        this.getBrands();
        this.getModels();
        this.getSuppliers();
        this.getTypes();
    }

    getBrands(){
        IncomeService.getBrands()
            .then((res)=>{
                this.setState({
                    brands: res.data
                })
            })
    }
    getModels(){
        IncomeService.getModels()
            .then((res)=>{
                this.setState({
                    models: res.data
                })
            })
    }
    getSuppliers(){
        IncomeService.getSuppliers()
            .then((res)=>{
                this.setState({
                    suppliers: res.data
                })
            })
    }
    getTypes(){
        IncomeService.getTypes()
            .then((res) => {
                this.setState({
                    types: res.data
                })
            })
    }


    render() {
        const {brands, models, types, suppliers} = this.state;
        return( <section>
            <datalist id="brands">{brands.map(brand => <option key={brand.id} value={brand.brand}/>)}</datalist>
            <datalist id="models">{models.map(model => <option key={model.id} value={model.model}/>)}</datalist>
            <datalist id="types">{types.map(type => <option key={type.id} value={type.type}/>)}</datalist>
            <datalist id="suppliers">{suppliers.map(supplier => <option key={supplier.id} value={supplier.supplier}/>)}</datalist>
        </section>)
    }
}