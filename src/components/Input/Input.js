import React from 'react';
import { connect } from 'react-redux';
import { changeInput, keyPress, changeCompleteAll } from '../../redux/actions/actions';
import './Input.scss';

class Input extends React.Component {
    render() {
        return (
            <div className="mainInput">
                <i
                    className={"completeAll fa fa-chevron-down " + this.props.active + this.props.checked}
                    onClick={this.props.changeCompleteAll}>
                </i>
                <input type="text" placeholder="What needs to be done?"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        value: state.input.value,
        active: (state.list.length) ? 'active ' : '',
        checked: (!state.list.filter(item => !item.isCompleted).length) ? 'checked ' : '',
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (event) => dispatch(changeInput(event.target.value)),
        onKeyPress: (event) => dispatch(keyPress(event.key)),
        changeCompleteAll: () => dispatch(changeCompleteAll()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Input)