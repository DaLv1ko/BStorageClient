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
        popup.classList.add('open');
    }

    clear() {
        this.setState({search: ''}
        )
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
        return (
            <section className="search">
                <div className="container">
                    {this.props.addButton ?
                        <div className="row">
                            <div className="col-12 search_box">
                                <a id="addGoods" className="search_but popup_link"
                                   onClick={() => {
                                       this.addForm();
                                   }}>Додати товар</a>
                            </div>
                        </div>
                        : null}
                    <div className="row">
                        <form onSubmit={this.onSubmit} className="col-12 search_box">
                            <div className="search_box_frame">
                                <input id="search" value={this.state.search} onChange={this.changeFilterHandle}
                                       type="text" name='model' placeholder='Пошук...' className='search_form__inner'/>
                                <span hidden={this.state.clear} onClick={this.clear} className="close"><i
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

