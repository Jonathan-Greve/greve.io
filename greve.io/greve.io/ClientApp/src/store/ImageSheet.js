const requestGreeting = 'REQUEST_GREETING';
const receiveGreeting = 'RECEIVE_GREETING';
const initialState = { name: "", greeting: "" };

export const actionCreators = {
    requestGreeting: name => async (dispatch, getState) => {
        if (name === getState().imageSheet.name) {
            console.log("Name has already been set!....................");
            return;
        }

        dispatch({ type: requestGreeting, name });

        const url = `api/ImagePermutator/Get?name=${name}`;
        const response = await fetch(url);
        const greeting = await response.json();


        dispatch({ type: receiveGreeting, name, greeting });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestGreeting) {
        return {
            ...state,
            name: action.name
        };
    }

    if (action.type === receiveGreeting) {
        return {
            ...state,
            name: action.name,
            greeting: action.greeting
        }
    }

    return state;
};