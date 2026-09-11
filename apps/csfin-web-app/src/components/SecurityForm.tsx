import { SecurityData, SecurityType } from "@csfin-monorepo/core";
import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SecurityFormProps {
  value?: SecurityData;
  onSubmit: (data: SecurityData) => void;
}

export const SecurityForm = ({ value, onSubmit }: SecurityFormProps) => {
  const navigate = useNavigate();

  const securityTypes = Object.values(SecurityType);

  const isinRef = useRef<HTMLInputElement>(null);
  const nsinRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const shortNameRef = useRef<HTMLInputElement>(null);
  const securityTypeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isin = isinRef.current?.value ?? "";
    const nsin = nsinRef.current?.value ?? "";
    const name = nameRef.current?.value ?? "";
    const shortName = shortNameRef.current?.value;
    const securityType = securityTypes.find(
      (secType) => secType === securityTypeRef.current?.value,
    );

    onSubmit({
      isin,
      nsin,
      name,
      shortName,
      type: securityType ?? SecurityType.STOCK,
    });

    navigate("/securities");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="security-isin">ISIN:</label>
      <input
        id="security-isin"
        ref={isinRef}
        type="text"
        defaultValue={value?.isin ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-nsin">NSIN:</label>
      <input
        id="security-nsin"
        ref={nsinRef}
        type="text"
        defaultValue={value?.nsin ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-name">Name:</label>
      <input
        id="security-name"
        ref={nameRef}
        type="text"
        defaultValue={value?.name ?? ""}
        className="border"
        required
      />

      <label htmlFor="security-short-name">Short Name:</label>
      <input
        id="security-short-name"
        ref={shortNameRef}
        type="text"
        defaultValue={value?.shortName ?? ""}
        placeholder="(optional)"
        className="border"
      />

      <label htmlFor="security-type">Security Type:</label>
      <select
        id="security-type"
        ref={securityTypeRef}
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

const mapSecurityTypeToLabel: Record<SecurityType, string> = {
  etf: "ETF",
  stock: "Stock",
};
