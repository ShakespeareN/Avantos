export interface Condition {
    left: {
      object: string;
      property: string;
      type: string;
    };
    operator: string;
    right: {
      type: string;
      value: string;
    };
    type: string;
  }
  
  export interface ActionBranch {
    $schema: string;
    condition: Condition;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    name: string;
    tenant_id: string;
    updated_at: string;
  }
  
  export interface Edge {
    source: string;
    target: string;
  }
  
  export interface PayloadField {
    component_key: string;
    is_metadata: boolean;
    output_key: string;
    type: string;
  }
  
  export interface DynamicFieldConfigProperty {
    endpoint_id: string;
    output_key: string;
    payload_fields: {
      [key: string]: PayloadField;
    };
    selector_field: string;
  }
  
  export interface DynamicFieldConfig {
    [property: string]: DynamicFieldConfigProperty;
  }
  
  export interface FieldSchema {
    properties: { [key: string]: null };
    required: string[];
    type: string;
  }
  
  export interface UiSchema {
    elements: any[];
    type: string;
  }
  
  export interface ActionForm {
    $schema: string;
    custom_javascript: string;
    custom_javascript_triggering_fields: string[];
    description: string;
    dynamic_field_config: DynamicFieldConfig;
    field_schema: FieldSchema;
    id: string;
    is_reusable: boolean;
    name: string;
    ui_schema: UiSchema;
    vendor_schema: { [key: string]: null };
  }
  
  export interface ApprovalScheduledDelay {
    number: number;
    unit: string;
  }
  
  export interface ApprovalSLADuration {
    number: number;
    unit: string;
  }
  
  export interface ApprovalTaskConfig {
    form_field: string;
    form_key: string;
    type: string;
    value: string;
  }
  
  export interface NodeData {
    approval_auto_assign_config: ApprovalTaskConfig;
    approval_required: boolean;
    approval_roles: string[];
    approval_scheduled_delay: ApprovalScheduledDelay;
    approval_sla_duration: ApprovalSLADuration;
    approval_task_name: string;
    auto_assign_config: ApprovalTaskConfig;
    component_id: string;
    component_key: string;
    component_type: string;
    data_promotion_config: { [key: string]: string };
    id: string;
    input_mapping: {
      [key: string]: PayloadField;
    };
    name: string;
    permitted_roles: string[];
    prerequisites: string[];
    scheduled_delay: { number: number; unit: string };
    sla_duration: { number: number; unit: string };
    state_transition_rules: {
      state_transition_rules_if: PayloadField;
      state_transition_rules_then: string;
    };
  }
  
  export interface ActionNode {
    data: NodeData;
    id: string;
    position: {
      x: number;
      y: number;
    };
    type: string;
  }
  
  export interface TriggerEndpoint {
    $schema: string;
    created_at: string;
    id: string;
    max_retries: number;
    name: string;
    output_mapping: { id: string };
    path_template: string;
    path_template_variables: string[];
    payload_template: {
      subject: string;
      to: string;
    };
    payload_template_variables: string[];
    query_parameter_template: { user_id: string };
    query_parameter_template_variables: string[];
    request_method: string;
    timeout_seconds: number;
    trigger_service_id: string;
    updated_at: string;
  }
  
  export interface ActionBlueprintGraphResponse {
    $schema: string;
    blueprint_id: string;
    blueprint_name: string;
    branches: ActionBranch[];
    edges: Edge[];
    forms: ActionForm[];
    nodes: ActionNode[];
    status: 'draft' | 'published' | 'archived' | 'historical';
    tenant_id: string;
    triggers: TriggerEndpoint[];
    version_id: string;
    version_notes: string;
    version_number: string;
  }
  