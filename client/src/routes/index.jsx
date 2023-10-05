import { Suspense } from "react";
import { Provider } from 'react-redux'
import App from "../App";
import store from "../sagas/configureStore";
import { ThemeProvider } from "@material-tailwind/react";
import ScrollToTop from "../layout/common/ScrollToTop";

export default function AppRoutes() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </ThemeProvider>
        </Provider>
    );
}
// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <AppWrapper />,
//         children: [
//             { path: "/", element: <HomePage /> },
//             { path: "/categories", element: <CategoryPage /> },
//             { path: "/posts", element: <PostPage /> },
//             { path: "/detail", element: <DetailPage /> },
//             { path: "/info", element: <InfoUser /> },
//             { path: "/add-post", element: <AddNewPosts /> },
//         ]
//     },
//     {
//         path: "/",
//         element: <AppAuthen />,
//         children: [
//             { path: "/signin", element: <SignIn /> },
//             { path: "/signup", element: <SignUp /> },
//         ]
//     },
//     { path: "/not-found", element: <>Not Found</> },
//     { path: "*", element: <>Not Found</> }
// ]);

// function AppWrapper() {

//     return (
//         <Suspense fallback={<>Loading</>}>
//             <Provider store={store}>
//                 <ThemeProvider>
//                     <App />
//                 </ThemeProvider>
//             </Provider>
//         </Suspense>
//     );
// }
// function AppAuthen() {
//     return (
//         <Suspense fallback={<>Loading</>}>
//             <Provider store={store}>
//                 <ThemeProvider>
//                     <Outlet />
//                 </ThemeProvider>
//             </Provider>
//         </Suspense>
//     );
// }