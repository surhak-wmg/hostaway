import { createStore, compose } from 'redux';
import createReducer from './createReducer';
import {
    SET_IS_OPEN_ADD_TASK_MODAL,
    SET_IS_OPEN_CANCEL_ADD_TASK_MODAL,
    SET_TASK_TITLE,
    SET_SAVE_TASK,
    SET_IS_OPEN_REMOVE_TASK_MODAL,
    SET_REMOVED_TASK_ID,
    SET_REMOVED,
    SET_IS_OPEN_TASK_MODAL,
    SET_ACTIVE_TASK,
    SET_SAVE_TASK_SUCCESS
} from './actions';

const defaultState = {
    isOpenAddTaskModal: false,
    isOpenCancelAddTaskModal: false,
    isOpenRemoveTaskModal: false,
    taskTitle: '',
    saveTask: false,
    removedTaskId: null,
    removed: false,
    activeTask: null,
    saveTaskSuccess: false,
};

const reducer = createReducer(defaultState, {
    [SET_IS_OPEN_ADD_TASK_MODAL]: (state, action) => ({
        ...state,
        isOpenAddTaskModal: action.isOpenAddTaskModal
    }),
    [SET_IS_OPEN_CANCEL_ADD_TASK_MODAL]: (state, action) => ({
        ...state,
        isOpenCancelAddTaskModal: action.isOpenCancelAddTaskModal
    }),
    [SET_IS_OPEN_REMOVE_TASK_MODAL]: (state, action) => ({
        ...state,
        isOpenRemoveTaskModal: action.isOpenRemoveTaskModal
    }),
    [SET_TASK_TITLE]: (state, action) => ({
        ...state,
        taskTitle: action.taskTitle
    }),
    [SET_SAVE_TASK]: (state, action) => ({
        ...state,
        saveTask: action.saveTask
    }),
    [SET_SAVE_TASK_SUCCESS]: (state, action) => ({
        ...state,
        saveTaskSuccess: action.saveTaskSuccess
    }),
    [SET_REMOVED_TASK_ID]: (state, action) => ({
        ...state,
        removedTaskId: action.removedTaskId
    }),
    [SET_REMOVED]: (state, action) => ({
        ...state,
        removed: action.removed
    }),
    [SET_IS_OPEN_TASK_MODAL]: (state, action) => ({
        ...state,
        isOpenTaskModal: action.isOpenTaskModal
    }),
    [SET_ACTIVE_TASK]: (state, action) => ({
        ...state,
        activeTask: action.activeTask
    })
});

const store = createStore(reducer, compose);

export default store;
