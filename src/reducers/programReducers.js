import {
    PROGRAM_UPDATE_REQUEST, PROGRAM_UPDATE_SUCCESS, PROGRAM_UPDATE_FAIL,
    CREATE_ONE_PROGRAM_REQUEST, CREATE_ONE_PROGRAM_SUCCESS, CREATE_ONE_PROGRAM_FAIL,
    GET_ALL_PROGRAM_REQUEST, GET_ALL_PROGRAM_SUCCESS, GET_ALL_PROGRAM_FAIL,
    GET_ONE_PROGRAM_REQUEST, GET_ONE_PROGRAM_SUCCESS, GET_ONE_PROGRAM_FAIL,
    DEL_PROGRAM_REQUEST, DEL_PROGRAM_SUCCESS, DEL_PROGRAM_FAIL,
} from "../constants/programConstants"

export const getAllProgramsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_PROGRAM_REQUEST:
            return { loading: true };
        case GET_ALL_PROGRAM_SUCCESS:
            return { loading: false, listPrograms: action.payload };
        case GET_ALL_PROGRAM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const getOneProgramReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_PROGRAM_REQUEST:
            return { loading: true };
        case GET_ONE_PROGRAM_SUCCESS:
            return { loading: false, program: action.payload };
        case GET_ONE_PROGRAM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const delProgramReducer = (state = {}, action) => {
    switch (action.type) {
        case DEL_PROGRAM_REQUEST:
            return { loading: true };
        case DEL_PROGRAM_SUCCESS:
            return { loading: false, success: true, program: action.payload };
        case DEL_PROGRAM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createProgramReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ONE_PROGRAM_REQUEST:
            return { loading: true };
        case CREATE_ONE_PROGRAM_SUCCESS:
            return { loading: false, success: true, program: action.payload }
        case CREATE_ONE_PROGRAM_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
};

export const updateProgramReducer = (state = {}, action) => {
    switch (action.type) {
        case PROGRAM_UPDATE_REQUEST:
            return { loading: true };
        case PROGRAM_UPDATE_SUCCESS:
            return { loading: false, success: true, program: action.payload }
        case PROGRAM_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
};