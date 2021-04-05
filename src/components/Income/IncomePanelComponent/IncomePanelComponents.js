import React, {Component} from "react";

export default class IncomePanelComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            clear: true,
        }

        this.addForm = this.addForm.bind(this)
        this.changeFilterHandle = this.changeFilterHandle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.clear = this.clear.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.search !== this.state.search) {
            if (this.state.search === '') {
                this.setState({clear: true})
            } else {
                this.setState({clear: false})
            }
        }
    }

    clear() {
        this.setState({search: ''}
        )
        this.props.onSearch('')
    }

    changeFilterHandle(event) {
        console.log(this.state.search)
        this.setState({search: event.target.value})
    }


    addForm() {
        let popup = document.getElementById('popup');
        popup.classList.add('open');
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.search)
        this.props.onSearch(this.state.search);
    }

    render() {
        return (
            <section className="search">
                <div className="container">
                    <div className="row">
                        <div className="col-12 search_box">

                            <a id="addGoods" className="search_but popup_link"
                               onClick={() => {
                                   this.addForm();
                               }}>Додати товар</a>
                        </div>

                    </div>
                    <div className="row">
                        <form onSubmit={this.onSubmit} className="col-12 search_box">
                        <div className="search_box_frame">
                            <input id="search" value={this.state.search} onChange={this.changeFilterHandle}
                                   type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <span  hidden={this.state.clear} onClick={this.clear} className="close"><i className="fas fa-times"/></span>
                        </div>
                            <button
                                className="search_but dandruff"
                                type="submit">Знайти
                            </button>

                        </form>
                    </div>
                </div>

            </section>)
    }
}