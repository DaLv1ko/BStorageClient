import React, {Component} from "react";

export default class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            clear: true,
        }

        this.changeFilterHandle = this.changeFilterHandle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.clear = this.clear.bind(this)
        this.addForm = this.addForm.bind(this)
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

    addForm() {
        let popup = document.getElementById('popup');
        let body = document.querySelector('body');
        body.style.position = 'fixed';
        popup.classList.add('open');
    }

    clear() {
        this.setState({search: ''})
        this.props.onSearch('', this.props.page)
    }

    changeFilterHandle(event) {
        this.setState({search: event.target.value})
    }


    onSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.search, this.props.page);
    }

    render() {
        const {addButton} = this.props
        const {search, clear} = this.state
        return (
            <section className="search">
                <div className="container">
                    {addButton ?
                        <div className="row">
                            <div className="col-12 search_box">
                                <button id="addGoods" className="search_but popup_link"
                                        onClick={this.addForm}>Додати товар
                                </button>
                            </div>
                        </div>
                        : null}
                    <div className="row">
                        <form onSubmit={this.onSubmit} className="col-12 search_box">
                            <div className="search_box_frame">
                                <input id="search" value={search} onChange={this.changeFilterHandle}
                                       type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <span hidden={clear} onClick={this.clear} className="close"><i
                                    className="fas fa-times"/></span>
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

