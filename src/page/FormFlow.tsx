import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/data";
import PrefillForm from "../components/PrefillForm";
import { ActionNode } from "../models/action-blueprint";
import "./FormFlow.css";
import { useAppContext } from "../context/AppContext";
import MappingPanel from "../components/MappingPanel";

export default function FormFlow() {
  const {
    selectedNode,
    setSelectedNode,
    setActionNodes,
    setActionForms,
    setSelectedForm,
    selectedField,
  } = useAppContext();

  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["nodeData"],
    queryFn: async () => {
      const data = await getData();
      if (data) {
        const nodesData = data.nodes.map((node) => ({
          id: node.id,
          position: { x: node.position.x, y: node.position.y },
          data: {
            label: node.data.name,
          },
          style: { cursor: "pointer" },
        }));

        const edgesData = data.edges.map((edge) => ({
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          animated: true,
        }));
        setNodes(nodesData);
        setEdges(edgesData);
        setActionNodes(data.nodes);
        setActionForms(data.forms);
      }
      return data;
    },
  });

  const onNodeClick = (node: Node) => {
    if (!node || !data) return;
    const clickedNode = data.nodes.find((n: ActionNode) => n.id === node.id);
    setSelectedNode(clickedNode);
    setSelectedForm(
      data.forms.find((form) => form.id === clickedNode?.data.component_id)
    );
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="form-flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={(_, node) => onNodeClick(node)}
      ></ReactFlow>
      {selectedNode && (
        <>
          <div className="disable-background" />
          <PrefillForm />
        </>
      )}
      {selectedField && <MappingPanel />}
    </div>
  );
}
