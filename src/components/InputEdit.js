import React from 'react';
import {connect} from 'react-redux';
import { edit, changeEdit } from '../redux/actions/actions';

class InputEdit extends React.Component {
    render() {
        const { id, value } = this.props.item;

        return (
            <input className="editInput" id={"editInput-id-" + id}  value={value} onChange={(event) => this.props.editText(event, id)} type="text" onBlur={() => this.props.changeEdit(id, 'input')}/>        
        )
    }
}

function mapStateToProps(state) {
    return {
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(InputEdit);

