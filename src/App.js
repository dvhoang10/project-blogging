import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
