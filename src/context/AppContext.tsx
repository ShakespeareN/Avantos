import React, { createContext, useContext, useState } from "react";
import { ActionForm, ActionNode } from "../models/action-blueprint";

interface AppContextType {
  selectedNode: ActionNode | undefined;
  setSelectedNode: (node: ActionNode | undefined) => void;
  selectedField: string | undefined;
  setSelectedField: (field: string | undefined) => void;
  selectedForm: ActionForm | undefined;
  setSelectedForm: (form: ActionForm | undefined) => void;
  actionNodes: ActionNode[] | undefined;
  setActionNodes: (nodes: ActionNode[]) => void;
  actionForms: ActionForm[] | undefined;
  setActionForms: (forms: ActionForm[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNode, setSelectedNode] = useState<ActionNode | undefined>(
    undefined
  );
  const [actionNodes, setActionNodes] = useState<ActionNode[]>([]);
  const [actionForms, setActionForms] = useState<ActionForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<ActionForm | undefined>(
    undefined
  );
  const [selectedField, setSelectedField] = useState<string | undefined>();

  return (
    <AppContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        selectedForm,
        setSelectedForm,
        actionNodes,
        setActionNodes,
        actionForms,
        setActionForms,
        selectedField,
        setSelectedField,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
