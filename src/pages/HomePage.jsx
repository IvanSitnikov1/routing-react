import { LinkButton } from "../components/LinkButton";
import { ROUTES } from "../constants";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-xl font-medium text-black mb-5">
        Welcome to Books App
      </h1>
      <LinkButton to={ROUTES.books} title="View Books" />
    </div>
  );
};