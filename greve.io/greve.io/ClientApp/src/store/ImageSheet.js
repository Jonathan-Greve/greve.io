const requestSheet = 'REQUEST_SHEET';
const receiveSheet = 'RECEIVE_SHEET';
const initialState = { image: "", sheet: "" };

export const actionCreators = {
    requestSheet: (imgWidth, imgHeight, sheetWidth, sheetHeight, xStart, yStart, cropWidth, cropHeight, image) => async (dispatch, getState) => {
        if (image === getState().imageSheet.image) {
            console.log("Image has already been set!....................");
            return;
        }

        dispatch({ type: requestSheet, image });

        let data = new FormData();
        data.append("imageFile1", image);
        const url = `api/ImagePermutator/GetImageSheet?imageWidth=${imgWidth}&imageHeight=${imgHeight}
                            &sheetWidth=${sheetWidth}&sheetHeight=${sheetHeight}&xStart=${xStart}
                            &yStart=${yStart}&cropWidth=${cropWidth}&cropHeight=${cropHeight}`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(image)
        });
        const sheet = await response.json();


        dispatch({ type: receiveSheet, image, sheet });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSheet) {
        return {
            ...state,
            image: action.image,
            loading: true
        };
    }

    if (action.type === receiveSheet) {
        return {
            ...state,
            image: action.image,
            sheet: action.sheet,
            loading: false
        }
    }

    return state;
};