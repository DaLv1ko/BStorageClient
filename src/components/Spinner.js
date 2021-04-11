import React, {Component} from 'react';
import ReactLoading from "react-loading";

export default class Spinner extends Component {
    render() {
        return (
            <section className="frame">
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="spinner">
                                <ReactLoading className="react_loading" type={"cylon"} color={"white"} height={100}
                                              width={500}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}