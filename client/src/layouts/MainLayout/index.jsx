import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import styles from "./MainLayout.module.css";
import CreatePostModal from "@/components/CreatePostModal";
function MainLayout() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.flex}>
        <div className={styles.content}>
          <Sidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />

          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
        <Footer />
        {isCreatePostOpen && (
          <CreatePostModal onClose={() => setIsCreatePostOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default MainLayout;
