import React from 'react';
import { connect } from 'react-redux';
import { changeComplete, deleteItem, changeContenteditable, changeEdit } from '../../redux/actions/actions';
import InputEdit from '../InputEdit/InputEdit';
import ItemText from '../ItemText/ItemText';
import './TodoListItem.scss';

class TodoListItem extends React.Component {
    render() {
        const { id, isCompleted, edit } = this.props.item;

        return (
            <li className={"todoListItem checked-" + isCompleted + " edit-" + edit}>
                <input type="checkbox"
                    id={'checkbox-' + id}
                    checked={isCompleted}
                    onChange={() => this.props.changeDone(id)} />

                <label htmlFor={'checkbox-' + id}>
                    <i className="fa fa-check"></i>
                </label>

                <ItemText item={this.props.item} />
                <InputEdit item={this.props.item} />

                <button className="delete" onClick={() => this.props.deleteItem(id)}>
                    <i className="fa fa-times"></i>
                </button>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        isEdit: 'edit',
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeDone: id => dispatch(changeComplete(id)),
        deleteItem: id => dispatch(deleteItem(id)),
        changeContenteditable: id => dispatch(changeContenteditable(id)),
        changeEdit: (id, elem) => {
            dispatch(changeEdit(id));
            if (elem === 'div') {
                let input = document.getElementById('editInput-id-' + id);
                input.focus();
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);