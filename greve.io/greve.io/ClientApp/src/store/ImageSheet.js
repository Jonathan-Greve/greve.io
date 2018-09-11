const requestSheet = 'REQUEST_SHEET';
const receiveSheet = 'RECEIVE_SHEET';
const setImage = 'SET_IMAGE';
const setShowImage = "SET_SHOW_IMAGE";
const setShowPreview= "SET_SHOW_PREVIEW";
const initialState = { image: {}, sheet: "", canCreate: false, showImage: true, showPreview: false };


export const actionCreators = {
    requestSheet: image => async (dispatch, getState) => {
        console.log("CANCREATE: ", getState().imageSheet.canCreate);
        if (!getState().imageSheet.canCreate) {
            console.log("Sheet with this image has already been created.");
            return;
        }

        dispatch({ type: requestSheet });

        const url = `api/ImagePermutator/GetImageSheet?imageWidth=${image.imageFormatWidth}&imageHeight=${image.imageFormatHeight}
                            &sheetWidth=${image.sheetWidth}&sheetHeight=${image.sheetHeight}&xStartPercent=${image.xStart}
                            &yStartPercent=${image.yStart}&cropWidthPercent=${image.cropWidth}&cropHeightPercent=${image.cropHeight}`;
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
        console.log("CAN CREATE: ", canCreate);

        dispatch({ type: setImage, image, canCreate });
    },
    setShowImage: (shouldShow = null) => async (dispatch, getState) => {
        if (shouldShow === null) {
            if (getState().showImage === true) {
                shouldShow = false;
            }
            else shouldShow = true
        }
        dispatch({ type: setShowImage, shouldShow });
    },
    setShowPreview: (shouldShow = null) => async (dispatch, getState) => {
        if (shouldShow === null) {
            if (getState().showPreview === true) {
                shouldShow = false;
            }
            else shouldShow = true
        }
        dispatch({ type: setShowPreview, shouldShow });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSheet) {
        console.log("Sheet requested");
        return {
            ...state,
            loading: true,
            showImage: false,
            showPreview: true
        };
    }

    if (action.type === receiveSheet) {
        console.log("Sheet receivedS");
        return {
            ...state,
            sheet: action.sheet,
            loading: false,
            canCreate: false,
            showImage: false,
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
            canCreate: action.canCreate,
            showImage: true,
        };
    }
    
    if (action.type === setShowImage) {
        return {
            ...state,
            showImage: action.shouldShow
        };
    }

    if (action.type === setShowPreview) {
        return {
            ...state,
            showPreview: action.shouldShow
        };
    }

    return state;
};