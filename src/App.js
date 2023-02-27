import { AuthProvider } from "contexts/auth-context";

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = React.lazy(() => import("pages/HomePage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const HomeLayout = React.lazy(() => import("modules/home/HomeLayout"));
const PostDetailsPage = React.lazy(() =>
  import("modules/post/PostDetailsPage")
);
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const DashboardLayout = React.lazy(() =>
  import("modules/Dashboard/DashboardLayout")
);
const PostAddNew = React.lazy(() => import("modules/post/PostAddNew"));
const CategoryManage = React.lazy(() =>
  import("modules/category/CategoryManage")
);
const CategoryAddNew = React.lazy(() =>
  import("modules/category/CategoryAddNew")
);
const CategoryUpdate = React.lazy(() =>
  import("modules/category/CategoryUpdate")
);
const UserManage = React.lazy(() => import("modules/user/UserManage"));
const UserAddNew = React.lazy(() => import("modules/user/UserAddNew"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route element={<HomeLayout></HomeLayout>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route
                path="/:slug"
                element={<PostDetailsPage></PostDetailsPage>}
              ></Route>
            </Route>
            <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/login" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
