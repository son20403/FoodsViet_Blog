import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react';
import MainLayout from './layout/MainLayout.';
import { useSelector } from 'react-redux';

const InfoUser = lazy(() => import("./pages/InfoUser"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const PostPage = lazy(() => import("./pages/PostPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SignUp = lazy(() => import("./pages/SignUp"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AddNewPosts = lazy(() => import("./pages/AddNewPosts"));
function App() {
  const { token } = useSelector(state => state.auth);
  return (
    <div>
      <Routes>
        {token ?
          (<>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/info" element={<InfoUser />} />
              <Route path="/detail/:slug" element={<DetailPage />} />
              <Route path="/posts" element={<PostPage />} />
              <Route path="/add-post" element={<AddNewPosts />} />
            </Route>
          </>) :
          (<>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>)
        }
        {token && <Route path="*" element={<Navigate to="/" />} />}
        {!token && <Route path="*" element={<Navigate to="/signin" />} />}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App
