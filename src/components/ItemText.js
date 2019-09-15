import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import { changeEdit } from '../redux/actions/actions';

class ItemText extends React.Component {

    componentDidMount() {
        if('ontouchstart' in window) {            
            ReactDOM.findDOMNode(this).addEventListener('ontouchstart',  () => this.props.changeEdit(this.props.item.id, 'div'));
        }
    }

    componentWillUnmount() {
        if('ontouchstart' in window) {
            ReactDOM.findDOMNode(this).removeEventListener('ontouchstart', () => this.props.changeEdit(this.props.item.id, 'div'));
        }
        
    }

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
            if(elem === 'div') {
                console.log('input ID: ', id)
                let input = document.getElementById('editInput-id-' + id);
                input.focus();
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemText);

