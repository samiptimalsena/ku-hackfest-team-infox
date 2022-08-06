export const openInNewWindow = (url) => {
  window.open(url, '_blank');
};

export const getErrorMessage = (err) => err.response.data.messages[0];
