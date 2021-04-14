import React, { Component } from "react";
import {connect} from 'react-redux';
import {actions} from '../store';
class Header extends Component {

    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    handleInputKeyUp(e) {
        const { value } = this.props;
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value);
            this.props.handleInputChange('');
        }
    }

    render() {
        const { value, handleInputChange } = this.props;
        return (
            <div className="header">
                <div className="header-content">
                    TodoList
                    <input
                        placeholder="Todo"
                        className="header-input"
                        data-test="header-input"
                        value={value}
                        onChange={e => handleInputChange(e.target.value)}
                        onKeyUp={this.handleInputKeyUp.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        value: state.todo.inputValue
    }
}

const mapDispatch = (dispatch) => ({
    handleInputChange(value) {
        dispatch(actions.handleInputChange(value));
    }
})

export default connect(mapState, mapDispatch)(Header);
