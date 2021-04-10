import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/AuthService";

import '../css/login.css'
import {withRouter} from "react-router";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
 class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    componentDidMount() {
        console.log("login page created")
    }

    onChangeUsername(e) {

        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push('/main')
                    this.props.authorize();

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <>
                {this.props.authorized ?
                    <section className="search">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 search_box">
                                    <a href="/login" className="search_but dandruff"
                                       onClick={this.logOut}>ВИЙТИ З АККАУНТУ</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="log_frame">


                                        <Form
                                            onSubmit={this.handleLogin}
                                            ref={c => {
                                                this.form = c;
                                            }}
                                        >
                                            <h3 className="login_text">Логін</h3>


                                            <div className="dws-input">

                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={this.state.username}
                                                    placeholder="Введіть логін"
                                                    onChange={this.onChangeUsername}
                                                    required="required"
                                                />
                                            </div>


                                            <div className="dws-input">

                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Введіть пароль"
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    required="required"
                                                />
                                            </div>


                                            <button type="submit"
                                                    className="dws-submit"
                                                    disabled={this.state.loading}
                                            >

                                                {this.state.loading || (<span>УВІЙТИ</span>)}
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"/>
                                                )}

                                            </button>


                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.message}
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton
                                                style={{display: "none"}}
                                                ref={c => {
                                                    this.checkBtn = c;
                                                }}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>
                }

            </>
        );
    }
}
export default withRouter(Login)