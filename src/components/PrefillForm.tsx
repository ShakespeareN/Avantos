import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { useGenerateFields } from "../hooks/useGenerateField";
import MainButton from "../shared/Button";
import FieldRow from "../shared/FieldRow";
import "./PrefillForm.css";
import { removeMappingApi } from "../api/data";
import { queryClient } from "../queryClient";

export default function PrefillForm() {
  const { selectedNode, setSelectedNode, actionNodes, selectedForm } =
    useAppContext();

  const fields = useMemo(() => {
    return useGenerateFields(selectedForm, selectedNode, actionNodes);
  }, [selectedForm, selectedNode, actionNodes]);

  const removeMapping = (fieldName: string) => {
    removeMappingApi(fieldName);
    queryClient.invalidateQueries({ queryKey: ["nodeData"] });
  };
  return (
    <div className="form-container">
      <h2>Prefill: {selectedNode?.data.name}</h2>
      {fields.map((field) => (
        <FieldRow key={field.key} field={field} removeMapping={removeMapping} />
      ))}
      <MainButton
        label={"Close"}
        onClick={() => setSelectedNode(undefined)}
        className="close-button"
      />
    </div>
  );
}
