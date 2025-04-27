import { ActionForm, ActionNode } from "../models/action-blueprint";
import { IFieldRow } from "../models/FieldRow";

export function useGenerateFields(
  selectedForm: ActionForm | undefined,
  selectedNode: ActionNode | undefined,
  nodes: ActionNode[] | undefined
): IFieldRow[] {
  if (!selectedForm?.field_schema?.properties || !selectedNode) return [];

  return Object.entries(selectedForm.field_schema.properties)
    .map(([key, value]) => {
      if (!value) return null;

      const mapping = selectedNode.data.input_mapping[key]?.component_key || null;
      const mappedForm = nodes?.find((form) => form.id === mapping);

      return {
        key,
        title: value["title"] || "",
        description: value["description"] || "",
        type: value["type"] || "",
        required: value["required"] || false,
        default: value["default"] || null,
        mappingKey: mapping,
        mappedFormName: mappedForm?.data.name,
      };
    })
    .filter((item) => item !== null) as IFieldRow[];
}