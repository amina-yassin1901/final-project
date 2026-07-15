import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Interest from "@/pages/Interest";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";
import UserProfile from "@/pages/UserProfile";
import EditProfile from "@/pages/EditProfile";
import AddPost from "@/pages/AddPost";
import EditPost from "@/pages/EditPost";
import Search from "@/pages/Search";
import NotFound from "@/pages/NotFound";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Notifications from "@/pages/Notification";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/interest" element={<Interest />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/posts/create" element={<AddPost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
