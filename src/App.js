import React, {Fragment} from 'react';

import {connect} from 'react-redux';
import Input from './components/Input';
import { changeInput, keyPress } from './redux/actions/actions';
import TodoList from './components/TodoList';
import SwichPanel from './components/SwichPanel';

class App extends React.Component {

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        })
    }   

    handleKeyPress = (event) => {
        const value = event.target.value;
        if(event.key === 'Enter' && value !== '') {
            console.log(value);
            let newListArray = this.state.list;
            newListArray.push(value);
            this.setState({
                inputValue: '',
                list: newListArray,
            })
        }
    }
    
    render() {
        return (
            <Fragment>
                <header>                    
                    <div className="container">
                        <h1>todos</h1>
                    </div>
                </header>
                <div className="container">
                    <div className="app">
                        <div className="table">
                            <Input/>
                            <TodoList/>
                            <SwichPanel/>
                        </div>
                    </div>
                </div>                
                <footer>
                    <div className="container">
                        <p>Double-click to edit a todo</p>
                        <p>Created by <a href="https://github.com/" target="_blank" rel="noopener noreferrer">MStahnyuk</a></p>
                    </div>
                </footer>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    localStorage["initialState"] = JSON.stringify(state);    
    return {
        inputValue: state.inputValue,
        list: state.list,
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: () => dispatch(changeInput()),
        onKeyPress: () => dispatch(keyPress()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
