import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import { PostProvider } from './contexts/PostContext'
import { UserPostProvider } from './contexts/UserPostContext'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <UserPostProvider>
            <ToastContainer />
            <RouterProvider router={routes} />
          </UserPostProvider>
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
