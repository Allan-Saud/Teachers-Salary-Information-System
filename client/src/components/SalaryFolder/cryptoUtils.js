
export const encodeBase64 = (text) => {
    return btoa(text);
  };
  
  export const decodeBase64 = (encodedText) => {
    return atob(encodedText);
  };
  