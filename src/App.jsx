// App.jsx
import { Outlet } from "react-router";
import { PostProvider } from "./contexts/PostContext";
import { UserPostProvider } from "./contexts/UserPostContext";

export default function App() {
  return (
    <PostProvider>
      <UserPostProvider>
        <Outlet />
      </UserPostProvider>
    </PostProvider>
  );
}
