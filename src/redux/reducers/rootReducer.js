import { CHANGE_INPUT, ADD_ITEM, CHANGE_COMPLETE, DELETE_ITEM, DELETE_COMPLETED, FILTER, CHANGE_COMPLETE_ALL, EDIT, CHANGE_EDIT } from '../actions/actionTypes';

export const ENTER_KEY = 'Enter';

let initialState;

if (localStorage.getItem("initialState")) {
    initialState = JSON.parse(localStorage.getItem("initialState"));
} else {
    initialState = {
        input: {
            value: '',
        },
        list: [],
        switchPanel: {
            buttonsFilter: [
                { title: 'All', active: true, value: 'all' },
                { title: 'Active', active: false, value: 'active' },
                { title: 'Completed', active: false, value: 'completed' },
            ],
        },
    }
}

function getNewId(list) {
    if (list.length) {
        return Math.max.apply(Math, list.map(function (item) { return item.id; })) + 1;
    }
    return 0;
}

function addListItem(list, value = '', isCompleted = false, edit = false, display = true) {
    return {
        id: getNewId(list),
        value,
        isCompleted,
        edit,
        display,
    }
}

function filter(list, field) {
    let newList = list.slice().map(item => {
        item.display = true;
        return item;
    });

    if (field === 'all') return newList;

    if (field === 'active') {
        return newList.map(item => {
            if (item.isCompleted) item.display = false;
            return item;
        });
    } else {
        return newList.map(item => {
            if (!item.isCompleted) item.display = false;
            return item;
        });
    }
}

function changeCompleteAll(state) {
    let newList = state.list.slice();
    let sortByField = state.switchPanel.buttonsFilter.slice().filter(field => field.active)[0].value;
    let isCompleted = false;
    if (newList.filter(item => !item.isCompleted).length) {
        isCompleted = true;
    }

    newList = newList.map(item => {
        item.isCompleted = isCompleted;
        return item;
    });

    return filter(newList, sortByField);
}

function changeButtonActive(buttonsFilter, activeValue) {
    return buttonsFilter.slice().map(button => {
        (button.value === activeValue) ? button.active = true : button.active = false;
        return button;
    })
}

function edit(list, newValue, id) {

    if (newValue === '')
        return list.slice().filter(item => item.id !== id);

    let newList = list.slice().map(item => {
        if (item.id === id) item.value = newValue;
        return item;
    });

    return newList;
}

function changeEdit(list, id) {
    return list.slice().map(item => {
        if (item.id === id) item.edit = !item.edit;
        return item;
    });
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: {
                    value: action.payload
                }
            };

        case ADD_ITEM: {
            if (action.payload === ENTER_KEY && state.input.value) {
                return {
                    ...state,
                    input: {
                        value: ''
                    },
                    list: [
                        ...state.list,
                        addListItem(state.list, state.input.value),
                    ],
                };
            }
            return state;
        }

        case CHANGE_COMPLETE: {
            let newList = state.list.slice().map(item => {
                if (item.id === action.payload) item.isCompleted = !item.isCompleted;
                return item;
            });
            return {
                ...state,
                list: newList,
            };
        }

        case DELETE_ITEM: {
            const newList = state.list.slice().filter(item => item.id !== action.payload);
            return {
                ...state,
                list: newList,
            }
        }

        case FILTER: {
            return {
                ...state,
                list: filter(state.list, action.payload),
                switchPanel: {
                    buttonsFilter: changeButtonActive(state.switchPanel.buttonsFilter, action.payload),
                }
            }
        }

        case DELETE_COMPLETED: {
            const newList = state.list.slice().filter(item => !item.isCompleted);
            return {
                ...state,
                list: newList,
            }
        }

        case CHANGE_COMPLETE_ALL: {
            return {
                ...state,
                list: changeCompleteAll(state),
            }
        }

        case EDIT: {
            return {
                ...state,
                list: edit(state.list, action.payload.value, action.payload.id),
            }
        }

        case CHANGE_EDIT: {
            return {
                ...state,
                list: changeEdit(state.list, action.payload),
            };
        }

        default:
            return state;
    }
}