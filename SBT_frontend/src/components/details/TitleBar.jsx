import { Link } from "react-router-dom";
import Title from "./Title";

export default function TitleBar({ title, backLink }) {
  return (
    <div className={`flex justify-between md:pb-9`}>
      {title ? <Title title={title} /> : <div></div>}

      <Link to={backLink}>
        <button
          className={`md:px-6 py-1 rounded-md bg-primary text-white text-lg`}
        >
          Go Back
        </button>
      </Link>
    </div>
  );
}