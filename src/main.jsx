import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import { PostProvider } from './contexts/PostContext'
import { UserPostProvider } from './contexts/UserPostContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserPostProvider>
        <PostProvider>
          <ToastContainer />
          <RouterProvider router={routes} />
        </PostProvider>
      </UserPostProvider>
    </AuthProvider>
  </StrictMode>
)
