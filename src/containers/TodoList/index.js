import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import axios from "axios";
import "./style.css";
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            undoList: [],
        };
    }

    /*
        {
            data: [{
                status: 'div',
                value: 'dell lee'
            }],
            success: true
        }
    */
    componentDidMount() {
        setTimeout(() => {
            axios
                .get("/undoList.json")
                .then((res) => {
                    this.setState({
                        undoList: res.data,
                    });
                    console.log(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }, 5000);
    }

    addUndoItem = (value) => {
        this.setState({
            undoList: [
                ...this.state.undoList,
                {
                    status: "div",
                    value,
                },
            ],
        });
    };

    deleteItem = (index) => {
        const newList = [...this.state.undoList];
        newList.splice(index, 1);
        this.setState({
            undoList: newList,
        });
    };

    changeStatus = (index) => {
        const newList = this.state.undoList.map((item, listIndex) => {
            if (index === listIndex) {
                return {
                    ...item,
                    status: "input",
                };
            }
            return {
                ...item,
                status: "div",
            };
        });
        this.setState({
            undoList: newList,
        });
    };

    handleBlur = (index) => {
        const newList = this.state.undoList.map((item, listIndex) => {
            if (index === listIndex) {
                return {
                    ...item,
                    status: "div",
                };
            }
            return item;
        });
        this.setState({
            undoList: newList,
        });
    };

    valueChange = (index, value) => {
        const newList = this.state.undoList.map((item, listIndex) => {
            if (index === listIndex) {
                return {
                    ...item,
                    value,
                };
            }
            return item;
        });
        this.setState({
            undoList: newList,
        });
    };

    render() {
        return (
            <div>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList
                    list={this.state.undoList}
                    deleteItem={this.deleteItem}
                    changeStatus={this.changeStatus}
                    handleBlur={this.handleBlur}
                    valueChange={this.valueChange}
                />
            </div>
        );
    }
}

export default TodoList;
