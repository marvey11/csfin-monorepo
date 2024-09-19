import { PortfolioData } from "@csfin-monorepo/core";
import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

interface PortfolioFormProps {
  value?: PortfolioData;
  onSubmit: (data: PortfolioData) => void;
}

export const PortfolioForm = ({ value, onSubmit }: PortfolioFormProps) => {
  const navigate = useNavigate();

  const refName = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = refName.current?.value ?? "";
    const description = refDescription.current?.value;

    onSubmit({
      name,
      description,
    });

    navigate("/portfolios");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="portfolio-name">Name:</label>
      <input
        id="portfolio-name"
        ref={refName}
        type="text"
        defaultValue={value?.name ?? ""}
        className="border"
        required
      />

      <label htmlFor="portfolio-description">Description:</label>
      <input
        id="portfolio-description"
        ref={refDescription}
        type="text"
        defaultValue={value?.description ?? ""}
        placeholder="(optional)"
        className="border"
      />

      <div className="flex flex-row items-center justify-end gap-2">
        <button
          type="submit"
          className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="min-h-10 min-w-24 rounded-md border bg-gray-500 px-4 py-2 font-bold text-white shadow-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};
