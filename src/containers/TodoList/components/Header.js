import React, {Component} from "react";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
        }
    }

    handleInputChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const {value} = this.state;
        return <div>
            <input data-test='input' value={value} onChange={this.handleInputChange.bind(this)}/>
        </div>
    }
}

export default Header;
