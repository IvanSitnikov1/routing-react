import { Suspense, useState, useEffect } from "react";
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";
import { ROUTES } from "../constants";
import {
  Await,
  defer,
  useLoaderData,
  useNavigation,
  useSearchParams,
  Link,
} from "react-router-dom";

export const booksLoader = ({ request }) => {
  const search = new URL(request.url).searchParams.get("search");
  const books = mockFetch("/books", { search });

  return defer({
    books,
  });
};

export const BooksPage = () => {
  const { books } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromQuery = searchParams.get("search");
  const { state } = useNavigation();
  const [search, setSearch] = useState(searchFromQuery || "");

  useEffect(() => {
    setSearchParams((params) => {
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      return params;
    });
  }, [search]);

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={books}
        errorElement={<div>Oops, error while loading books</div>}
      >
        {(books) => (
          <div className="flex-col">
            <div className="flex justify-center px-5 py-10">
              <input
                type="text"
                className="search-input"
                placeholder="Search books"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              {state === "loading" && <Loader />}
              {books?.map((item) => (
                <div className="card-container">
                  <div className="md:flex">
                    <div className="p-8">
                      <div className="content-type">
                       Book
                      </div>
                      <Link to={`${ROUTES.books}/${item.id}`} className="course-link">
                        {item.title}
                      </Link>
                      <p className="mt-2 text-slate-500">
                        Автор: {item.author}
                      </p>
                      <p className="mt-2 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
