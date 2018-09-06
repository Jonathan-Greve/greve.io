const requestSheet = 'REQUEST_SHEET';
const receiveSheet = 'RECEIVE_SHEET';
const setImage = 'SET_IMAGE';
const initialState = { image: {}, sheet: "", canCreate: false };


export const actionCreators = {
    requestSheet: image => async (dispatch, getState) => {
        console.log("CANCREATE: ", getState().imageSheet.canCreate);
        if (!getState().imageSheet.canCreate) {
            console.log("Sheet with this image has already been created.");
            return;
        }

        dispatch({ type: requestSheet });

        const url = `api/ImagePermutator/GetImageSheet?imageWidth=${image.imageFormatWidth}&imageHeight=${image.imageFormatHeight}
                            &sheetWidth=${image.sheetWidth}&sheetHeight=${image.sheetHeight}&xStart=${image.xStart}
                            &yStart=${image.yStart}&cropWidth=${image.cropWidth}&cropHeight=${image.cropHeight}`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(image.src)
        });
        const sheet = await response.json();


        dispatch({ type: receiveSheet, sheet });
    },

    setImage: (image) => async (dispatch, getState) => {
        if (image === "") {
            console.log("this image has already been set.");
            return;
        }
        const checkCanCreate = function (newImage) {
            return (newImage.imageFormatWidth > 0 && newImage.imageFormatHeight > 0 &&
                newImage.sheetWidth > 0 && newImage.sheetHeight > 0 &&
                newImage.xStart >= 0 && newImage.yStart >= 0 && newImage.cropWidth > 0 && newImage.cropHeight);
        }

        const canCreate = checkCanCreate(image);

        dispatch({ type: setImage, image, canCreate });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSheet) {
        return {
            ...state,
            loading: true
        };
    }

    if (action.type === receiveSheet) {
        return {
            ...state,
            sheet: action.sheet,
            loading: false,
            canCreate: false
        };
    }
    if (action.type === setImage) {
        console.log('Setting image');
        return {
            ...state,
            image: {
                ...state.image,
                src: action.image.src,
                imageFormatWidth: action.image.imageFormatWidth,
                imageFormatHeight: action.image.imageFormatHeight,
                sheetWidth: action.image.sheetWidth,
                sheetHeight: action.image.sheetHeight,
                xStart: action.image.xStart,
                yStart: action.image.yStart,
                cropWidth: action.image.cropWidth,
                cropHeight: action.image.cropHeight,
                imageFormatAspectRatio: action.image.imageFormatAspectRatio
            },
            canCreate: action.canCreate
        };
    }

    return state;
};