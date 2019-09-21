import React from 'react';
import { connect } from 'react-redux';
import { changeEdit } from '../../redux/actions/actions';
import './ItemText.scss';

class ItemText extends React.Component {
    render() {
        const { id, value } = this.props.item;
        return (
            <div className="text" onDoubleClick={() => this.props.changeEdit(id, 'div')}>
                {value}
            </div>
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
        changeEdit: (id, elem) => {
            dispatch(changeEdit(id));
            if (elem === 'div') {
                let input = document.getElementById('editInput-id-' + id);
                input.focus();
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemText);

