import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Loader } from "../components/Loader";

export const addBookAction = async ({ request }) => {
  const formData = await request.formData();

  if (!formData.get("title")) {
    return json({ message: "Title field can't be empty" }, { status: 400 });
  }

  if (!formData.get("author")) {
    return json({ message: "Author field can't be empty" }, { status: 400 });
  }

  if (!formData.get("description")) {
    return json({ message: "Description field can't be empty" }, { status: 400 });
  }

  alert(`Книга добавлена!\n Название - ${formData.get("title")},\n автор - ${formData.get("author")},\n описание - ${formData.get("description")}`);

  return redirect("/books");
};

export const AddBookPage = () => {
  const navigation = useNavigation();
  const data = useActionData();

  return (
    <div className="pt-10 flex flex-col items-center">
      <h1 className="text-xl font-medium text-black mb-5">
        Adding a new book to the library
      </h1>

      {data?.message && <p className="pb-3 text-red-900">{data.message}</p>}

      {navigation.state === "submitting" && <Loader />}

      <Form method="post" className="flex flex-col items-center">
        <input
          className="form-input"
          type="text"
          name="author"
          placeholder="Enter author"
        />
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Enter title"
        />
        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Enter description"
        />
        <button className="button" type="submit">
          Adding book
        </button>
      </Form>
    </div>
  );
};
