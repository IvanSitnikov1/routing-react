import { Await, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

export const bookLoader = ({ params: { id } }) => {
  const book = mockFetch(`/books/${id}`);
  return defer({
    book,
  });
};

export const BookDetailsPage = () => {
  const { book } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={book}>
        {({ author, title, description }) => (
          <div className="card-container mt-10">
            <div className="flex flex-col">
              <div className="p-8">
                <div className="content-type">Book</div>
                <div className="course-title">{title}</div>
                <p className="mt-2 text-slate-500 mb-6">{author}</p>
                <p className="mt-2 text-slate-500 mb-6">{description}</p>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};