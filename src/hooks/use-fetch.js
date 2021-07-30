import { useCallback, useReducer } from "react";

function httpReducer (state, action) {
    if (action.type === 'SEND'){
        return {
            data: null,
            error: null,
            status: 'pending'
        }
    }

    if (action.type === 'SUCCESS'){
        return {
            data: action.res,
            error: null,
            status: 'completed'
        }
    }

    if (action.type === 'ERROR'){
        return {
            data: null,
            error: action.errorMessage,
            status: 'completed'
        }
    }

    return state;

}


function useHttp (requestFunction, startWithPending = false ) {

const [httpState,dispatch] = useReducer( httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
})

const sendRequest = useCallback(
   async function (requestData) {
      dispatch({ type: "SEND" });
      try {
         const res = await requestFunction(requestData);
         dispatch({ type: "SUCCESS", res });
      } catch (err) {
         dispatch({
            type: "ERROR",
            errorMessage: err.message || "Sorry, sth went wrong",
         });
      }
   },
   [requestFunction]
);

return {
    sendRequest,
    ...httpState
};

}

export default useHttp;