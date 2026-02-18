// Fetch function for collection endpoint (array of data)
export const getShows = async () => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows`);
    if (!response.ok) {
      throw new Error(
        `Error detected: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Fetch function for single item endpoint (single show data)
export const getSingleShow = async (showId) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    if (!response.ok) {
      throw new Error(
        `Error detected: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
