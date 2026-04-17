import React from 'react';

const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  savedVideos: [],
  addSavedVideo: () => {},
  removeSavedVideo: () => {},
  likedVideos: [],
  dislikedVideos: [],
  toggleLikeId: () => {},
  toggleDislikeId: () => {},
});

export default ThemeContext;
