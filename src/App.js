import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BooksPage, booksLoader } from "./pages/BooksPage";
import { BookDetailsPage, bookLoader } from "./pages/BookDetailsPage";
import { AddBookPage, addBookAction } from "./pages/AddBookPage";
import { Loader } from "./components/Loader";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="books" element={<BooksPage />} loader={booksLoader} />
      <Route path="books/:id" element={<BookDetailsPage />} loader={bookLoader} />
      <Route path="books/add" element={<AddBookPage />} action={addBookAction} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
