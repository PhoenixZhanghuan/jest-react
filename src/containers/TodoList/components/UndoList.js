import React, { Component } from "react";

class UndoList extends Component {
    render() {
        const { list = [], deleteItem, changeStatus, handleBlur, valueChange } = this.props;
        return (
            <div>
                <div data-test="count">{list.length}</div>
                <ul>
                    {list.map((item, index) => {
                        return (
                            <li 
                                className="undo-list-item"
                                data-test="list-item" 
                                key={index}
                                onClick={() => changeStatus(index)}
                                >
                                {
                                    item.status === 'div' ? item.value : (
                                        <input 
                                            className='undo-list-input'
                                            data-test="input" 
                                            value={item.value} 
                                            onBlur={() => handleBlur(index)}
                                            onChange={(e) => valueChange(index, e.target.value)}
                                        />
                                    )
                                }
                                <div
                                    className="undo-list-delete"
                                    data-test="delete-item"
                                    onClick={(e) => {
                                        e && e.stopPropagation();
                                        deleteItem(index);
                                    }}
                                >
                                    -
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default UndoList;
