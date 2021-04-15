import React, {Component} from "react";

export default class VarTest extends Component {


    constructor(props) {
        super(props);

        this.test = this.test.bind(this)
    }

    test() {
        require('dotenv').config()
        console.log(process.env.REACT_APP_URL)
    }

    render() {

        return (<>
                <pre>{process.env.REACT_APP_URL}</pre>

                <button type="button" onClick={this.test}>TEST</button>
            </>

        )
    }
}