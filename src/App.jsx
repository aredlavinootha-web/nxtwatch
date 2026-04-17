import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProtectedRoute from './components/protectedRoute'
import LoginForm from './components/loginPage'
import Home from './components/homePage'
import SidePanel from './components/SidePanel'
import BannerComponent from './components/bannerComponent'
import VideoComponent from './components/videoComponent'
import SavedVideos from './components/SavedVideos'
import TrendingVideos from './components/trendingPage'
import ThemeContext from './context/ThemeContext'


function App() {
  const [isDark, setIsDark] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [dislikedVideos, setDislikedVideos] = useState([]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  }

  const addSavedVideo = (video) => {
    setSavedVideos(prev => [...prev, video]);
  }
  const removeSavedVideo = (id) => {
    setSavedVideos(prev => prev.filter(v => v.id !== id));
  }

  const toggleLikeId = (id) => {
    setLikedVideos(prev => {
      if (prev.includes(id)) return prev.filter(vId => vId !== id);
      return [...prev, id];
    });
    setDislikedVideos(prev => prev.filter(vId => vId !== id));
  };

  const toggleDislikeId = (id) => {
    setDislikedVideos(prev => {
      if (prev.includes(id)) return prev.filter(vId => vId !== id);
      return [...prev, id];
    });
    setLikedVideos(prev => prev.filter(vId => vId !== id));
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, toggleTheme,
      savedVideos, addSavedVideo, removeSavedVideo,
      likedVideos, dislikedVideos, toggleLikeId, toggleDislikeId
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<LoginForm />} />
          

          <Route path="/videos/:id" element={
            <ProtectedRoute>
              <VideoComponent />
            </ProtectedRoute>
          }
          />
          <Route path="/saved-videos" element={
            <ProtectedRoute>
              <SavedVideos />
            </ProtectedRoute>
          } />

          <Route path="/trending" element={
            <ProtectedRoute>
              <TrendingVideos />
            </ProtectedRoute>
          } />
          
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
