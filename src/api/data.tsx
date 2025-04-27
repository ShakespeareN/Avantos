import axiosInstance from "../axiosInstance";
import { ActionBlueprintGraphResponse } from "../models/action-blueprint";

export async function getData() {
  const response = await axiosInstance.get<ActionBlueprintGraphResponse>(
    "v1/123/actions/blueprints/bp_456/graph"
  );
  return response.data;
}

export function removeMappingApi(selectedField: string) {
  console.log("Selected field for removing mapping:", selectedField);
  //Here should go the api endpoint to remove the mapping
}

export function mapFormFieldsApi(selectedField: string) {
  console.log("Selected field for mapping:", selectedField);
  //Here should go the api endpoint to map the field
}