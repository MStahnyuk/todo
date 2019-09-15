import React from 'react';
import {connect} from 'react-redux';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
    render() {
        return (
            <ul className='todoList'>
                {this.props.list.filter(item => item.display).map((item) => {
                    return <TodoListItem key={item.id} item={item}/>
                })}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.list,
    }
}

export default connect(mapStateToProps)(TodoList);