import React from 'react';
import { connect } from 'react-redux';
import { edit, changeEdit } from '../../redux/actions/actions';
import { ENTER_KEY } from '../../redux/reducers/rootReducer';
import './InputEdit.scss';

class InputEdit extends React.Component {
    render() {
        const { id, value } = this.props.item;

        return (
            <input className="editInput" id={"editInput-id-" + id}
                value={value} onChange={(event) => this.props.editText(event.target.value, id)}
                type="text" onBlur={() => this.props.changeEdit(id, 'input')}
                onKeyPress={(event) => this.props.onKeyPress(event.key, id)} />
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
        editText: (value, id) => dispatch(edit({ value, id })),
        onKeyPress: (key, id) => {
            if (key === ENTER_KEY) {
                let input = document.getElementById('editInput-id-' + id);
                input.blur();
            }
        },
        changeEdit: (id, elem) => {
            dispatch(changeEdit(id));
            if (elem === 'div') {
                let input = document.getElementById('editInput-id-' + id);
                input.focus();
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEdit);

