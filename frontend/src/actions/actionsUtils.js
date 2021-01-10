export const setErrorActionPayload = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const setPrivateGetRequestHeaders = (userInfo) => {
  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

export const setPrivatePostRequestHeaders = (userInfo) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

export const setPublicPostRequestHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};
