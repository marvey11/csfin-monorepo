import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SecurityData, SecurityType, securityTypes } from "../types";

interface SecurityFormProps {
  value?: SecurityData;
  onSubmit: (data: SecurityData) => void;
}

export const SecurityForm = ({ value, onSubmit }: SecurityFormProps) => {
  const navigate = useNavigate();

  const refISIN = useRef<HTMLInputElement>(null);
  const refNSIN = useRef<HTMLInputElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const refShortName = useRef<HTMLInputElement>(null);
  const refSecurityType = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isin = refISIN.current?.value ?? "";
    const nsin = refNSIN.current?.value ?? "";
    const name = refName.current?.value ?? "";
    const shortName = refShortName.current?.value;
    const securityType = securityTypes.find(
      (secType) => secType === refSecurityType.current?.value
    );

    onSubmit({ isin, nsin, name, shortName, type: securityType ?? "stock" });

    navigate("/securities");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="security-isin">ISIN:</label>
      <input
        id="security-isin"
        ref={refISIN}
        type="text"
        defaultValue={value?.isin ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-nsin">NSIN:</label>
      <input
        id="security-nsin"
        ref={refNSIN}
        type="text"
        defaultValue={value?.nsin ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-name">Name:</label>
      <input
        id="security-name"
        ref={refName}
        type="text"
        defaultValue={value?.name ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-short-name">Short Name:</label>
      <input
        id="security-short-name"
        ref={refShortName}
        type="text"
        defaultValue={value?.shortName ?? ""}
        placeholder="(optional)"
        className="border"
      />

      <label htmlFor="security-type">Security Type:</label>
      <select
        id="security-type"
        ref={refSecurityType}
        defaultValue={value?.type}
      >
        {securityTypes.map((securityType) => (
          <option key={securityType} value={securityType}>
            {mapSecurityTypeToLabel[securityType]}
          </option>
        ))}
      </select>

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

const mapSecurityTypeToLabel: { [K in SecurityType]: string } = {
  etf: "ETF",
  stock: "Stock",
};
