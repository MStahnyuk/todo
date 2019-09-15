import { CHANGE_INPUT, ADD_ITEM, CHANGE_COMPLETE, DELETE_ITEM, CHANGE_CONTENTEDITABLE, FILTER, DELETE_COMPLETED, CHANGE_COMPLETE_ALL, EDIT, CHANGE_EDIT } from "./actionTypes";

export function changeInput(newValue) {
    return {
        type: CHANGE_INPUT,
        payload: newValue,
    }
}

export function keyPress(key) {
    return {
        type: ADD_ITEM,
        payload: key,
    }
}

export function  changeComplete(listItemId) {
    return {
        type: CHANGE_COMPLETE,
        payload: listItemId,
    }
}

export function deleteItem(listItemId) {
    return {
        type: DELETE_ITEM,
        payload: listItemId,
    }
}

export function deleteCompleted() {
    return {
        type: DELETE_COMPLETED,
    }
}
export function changeContenteditable(listItemId) {
    return {
        type: CHANGE_CONTENTEDITABLE,
        payload: listItemId,
    }
}

export function filter(field) {
    return {
        type: FILTER,
        payload: field,
    }
}

export function changeCompleteAll() {
    return {
        type: CHANGE_COMPLETE_ALL,
    }
}

export function edit(value) {
    return {
        type: EDIT,
        payload: value,
    }
}

export function changeEdit(id) {
    return {
        type: CHANGE_EDIT,
        payload: id,
    }
}