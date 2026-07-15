import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRouter from "@/routes/AppRouter";
import { getProfile } from "@/redux/auth/authThunks";
import { setInitialized } from "@/redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getProfile());
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
