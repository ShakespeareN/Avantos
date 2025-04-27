import "./FieldRow.css";
import { IFieldRow } from "../models/FieldRow";
import { useAppContext } from "../context/AppContext";

interface FieldRowProps {
  field: IFieldRow;
  removeMapping: (fieldName: string) => void;
}
export default function FieldRow({ field, removeMapping }: FieldRowProps) {
  const {setSelectedField} = useAppContext();

  return (
    <div className="field-row-container">
      <input
        type="text"
        placeholder="Enter value"
        defaultValue={`${field.title} ${
          field.mappedFormName !== "" && field.mappedFormName
            ? ": " + field.mappedFormName
            : ""
        } `}
        readOnly
        className="input-field"
        onClick={() => {
          if (field.mappingKey) return;
          setSelectedField(field.key);
        }}
      />
      <button
        className="clear-field-button"
        onClick={() => removeMapping(field.key)}
      >
        ✕
      </button>
    </div>
  );
}
