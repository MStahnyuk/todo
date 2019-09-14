import React from 'react';
import {connect} from 'react-redux';
import ButtonFilter from './ButtonFilter';
import { deleteCompleted } from '../redux/actions/actions';

class SwichPanel extends React.Component {
    render() {
        const {itemsLeft, buttonsFilter, disabled, view} = this.props;
        return (
            <div className={"switchPanel view-" + view}>                
                <span>{itemsLeft} items left</span>
                <div className="buttons">
                    {buttonsFilter.map(button => <ButtonFilter key={button.value} button={button}/>)}
                </div>

                <div>
                    <button className="clear" disabled={disabled} onClick={this.props.deleteCompleted}>Clear completed</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        itemsLeft: state.list.filter(item => item.isCompleted === false).length,
        buttonsFilter: state.switchPanel.buttonsFilter,
        disabled: !state.list.some((item => item.isCompleted === true)),
        view: !!state.list.length,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCompleted: () => {
            console.log('111');
            dispatch(deleteCompleted());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwichPanel);