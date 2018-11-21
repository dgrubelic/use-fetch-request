import { useEffect, useReducer } from 'react';

export const REQUEST_INIT = 'network.request-init';
export const REQUEST_SUCCESS = 'network.request-success';
export const REQUEST_ERROR = 'network.request-error';

const initialState = {
  error: null,
  inProgress: false,
  requestOptions: null,
  response: null
};

function networkRequestReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INIT: {
      return {
        ...state,
        inProgress: true,
        requestOptions: {
          config: action.config,
          url: action.url
        }
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...state,
        response: action.payload,
        inProgress: false
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload,
        inProgress: false
      }
    }
    default: {
      return state;
    }
  }
}

export default function useFetchRequest(defaultUrl, defaultConfig) {
  const [state, dispatch] = useReducer(networkRequestReducer, initialState);

  function dispatchRequest(url, requestConfig = {}) {
    dispatch({
      type: REQUEST_INIT,
      config: {
        ...defaultConfig,
        ...requestConfig
      },
      url: url || defaultUrl
    });
  }

  useEffect(() => {
    const { inProgress, requestOptions } = state;

    if (requestOptions && inProgress) {
      const { config, url } = requestOptions;

      fetch(url, config)
        .then(response => response.json())
        .then(responseData => dispatch({
          type: REQUEST_SUCCESS,
          payload: responseData
        }))
        .catch(responseError => dispatch({
          type: REQUEST_ERROR,
          payload: responseError
        }));
    }
  }, [state.inProgress, state.requestOptions]);

  return [state, dispatchRequest];
}
