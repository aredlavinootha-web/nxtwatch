export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_msg || "Request failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
