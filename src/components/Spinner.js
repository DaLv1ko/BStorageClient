import React, {Component} from 'react';
import ReactLoading from "react-loading";

export default class Spinner extends Component {
    render() {
        return (

            <section className="section_log">
                <div className="container_log">
                    <div className="row">
                        <div className="col-12">
                            <ReactLoading className="react_loading" type={"bubbles"} color={"white"} width={300} height={300} />
                        </div>
                    </div>
                </div>
            </section>



        );
    }
}