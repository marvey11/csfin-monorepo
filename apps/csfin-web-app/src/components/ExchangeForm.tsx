import { ExchangeData } from "@csfin-monorepo/core";
import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ExchangeFormProps {
  value?: ExchangeData;
  onSubmit: (data: ExchangeData) => void;
}

export const ExchangeForm = ({ value, onSubmit }: ExchangeFormProps) => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value ?? "";

    onSubmit({ name });

    navigate("/exchanges");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="exchange-name">Name:</label>
      <input
        id="exchange-name"
        ref={nameRef}
        type="text"
        defaultValue={value?.name ?? ""}
        className="border"
        required
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
