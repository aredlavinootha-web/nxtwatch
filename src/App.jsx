import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import ProtectedRoute from './components/protectedRoute'
import LoginForm from './routes/loginPage'
import Home from './routes/homePage'
import VideoComponent from './routes/videoPage'
import SavedVideos from './routes/savedVideosPage'
import TrendingVideos from './routes/trendingPage'
import ThemeContext from './context/ThemeContext'
import NotFound from './routes/notFoundPage'
import Gaming from './routes/gamingPage'


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

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />

          <Route path="/not-found" element={
            <ProtectedRoute>
              <NotFound />
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

          <Route path="/gaming" element={
            <ProtectedRoute>
              <Gaming />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
