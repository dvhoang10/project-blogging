import { AuthProvider } from "contexts/auth-context";
import HomeLayout from "modules/home/HomeLayout";
import PageNotFound from "pages/PageNotFound";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = React.lazy(() => import("pages/HomePage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route element={<HomeLayout></HomeLayout>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
            </Route>
            <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/login" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
