import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import Input from './components/Input/Input';
import { changeInput, keyPress } from './redux/actions/actions';
import TodoList from './components/TodoList/TodoList';
import SwichPanel from './components/SwitchPanel/SwitchPanel';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <div className="table">
                        <Input />
                        <TodoList />
                        <SwichPanel />
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    localStorage.setItem('initialState', JSON.stringify(state));
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
