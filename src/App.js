import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = React.lazy(() => import("pages/HomePage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
