import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./app.css";
import { useAppDispatch } from "./hooks";
import { getProfile } from "./slices/usersSlice";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("bearer-token");

  useEffect(() => {
    token && dispatch(getProfile());
  }, []);

  return (
    <Router>
      <Layout>
        {!token ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
};
