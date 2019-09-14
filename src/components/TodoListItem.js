import React from 'react';
import {connect} from 'react-redux';
import { changeComplete, deleteItem, changeContenteditable, changeInput, edit, changeEdit } from '../redux/actions/actions';

class TodoListItem extends React.Component {
    render() {        
        const { id, value, isCompleted, edit } = this.props.item;

        // console.log('edit', this.props.edit);

        return (
            <li className={"todoListItem checked-" + isCompleted + " edit-" + edit }>
                <input type="checkbox" id={'checkbox-' + id} checked={isCompleted}  onChange={() => this.props.changeDone(id)}/>
                <label htmlFor={'checkbox-' + id}><i className="fa fa-check"></i></label>
                <div className="text" onDoubleClick={() => this.props.changeEdit(id, 'div')}>
                    {value}
                    {/* <input type="text" value={value}/> */}
                </div>        
                <input className="editInput" id={"editInput-id-" + id}  value={value} onChange={(event) => this.props.editText(event, id)} type="text" onBlur={() => this.props.changeEdit(id, 'input')}/>
                <button className="delete" onClick={() => this.props.deleteItem(id)}><i className="fa fa-times"></i></button>
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
        editText: (event, id) => dispatch(edit({ 'value': event.target.value, id: id})),
        changeEdit: (id, elem) => {            
            dispatch(changeEdit(id));
            if(elem === 'div') {
                let input = document.getElementById('editInput-id-' + id);
                input.focus();
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);