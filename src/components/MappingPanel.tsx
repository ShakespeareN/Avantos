import { useMemo } from "react";
import { mapFormFieldsApi } from "../api/data";
import { useAppContext } from "../context/AppContext";
import { ActionForm } from "../models/action-blueprint";
import MainButton from "../shared/Button";
import "./MappingPanel.css";

export default function MappingPanel() {
  const {
    selectedField,
    selectedNode,
    actionNodes,
    actionForms,
    setSelectedField,
  } = useAppContext();

  const getMappingsRecursively = (
    nodeId: string,
    visitedNodes = new Set<string>(),
    skipFirst = false
  ): any[] => {
    if (visitedNodes.has(nodeId)) return [];
    visitedNodes.add(nodeId);

    const node = actionNodes?.find((n) => n.id === nodeId);
    if (!node) return [];

    const form = actionForms?.find(
      (form) => form.id === node?.data.component_id
    );
    const titles = Object.values(form?.field_schema?.properties || {}).map(
      (property: any) => property.title
    );

    const currentMapping = {
      key: nodeId,
      name: node?.data.name,
      formFields: titles,
    };

    const previousMappings =
      node.data.prerequisites?.flatMap((prevId: string) =>
        getMappingsRecursively(prevId, visitedNodes)
      ) || [];

    return skipFirst ? previousMappings : [...previousMappings, currentMapping];
  };

  const posibleMappings = useMemo(() => {
    if (!selectedNode) return [];
    return getMappingsRecursively(selectedNode.id, new Set<string>(), true);
  }, [selectedNode, actionNodes, actionForms]);

  const mapFormFields = (form: ActionForm | undefined) => {
    if (!selectedField) return;
    mapFormFieldsApi(selectedField);
    setSelectedField(undefined);
  };

  return (
    <div className="mapping-panel-container">
      <h2>Prefill</h2>
      {posibleMappings?.map((mapping) => (
        <div key={mapping.key}>
          <div
            onClick={() => {
              const target = document.getElementById(
                "child" + mapping.key
              ) as HTMLElement;
              if (target) {
                target.style.display =
                  target.style.display === "none" ? "block" : "none";
              }
            }}
          >
            {mapping.name}
          </div>
          <div
            id={"child" + mapping.key}
            style={{ display: "none", marginLeft: "10px" }}
          >
            {mapping.formFields.map((field: string, index: number) => (
              <div key={index} onClick={() => mapFormFields(mapping)}>
                {field}
              </div>
            ))}
          </div>
        </div>
      ))}
      <MainButton
        label="Back"
        onClick={() => setSelectedField(undefined)}
        className="back-button"
      />
    </div>
  );
}
