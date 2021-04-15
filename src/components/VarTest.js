import React, {Component} from "react";

export default class VarTest extends Component{


    constructor(props) {
        super(props);

        this.test= this.test.bind(this)
    }

    test(){
        require('dotenv').config();
        console.log(process.env.TEST_DALV1K);
    }

    render() {

        return(
                <button type="button" onClick={this.test}>TEST</button>
        )
    }
}