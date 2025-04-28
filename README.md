# React + TypeScript + Vite

## Command to Run

1. `npm install`
2. `npm run dev`
3. Run the mock server

## Important Properties from Database

- **prerequisites**: An array of previous nodes.
- **input_mapping**: Mapped properties from a node.
  ```json
  "input_mapping": {
    "email": { 
      "component_key": "form-a4750667-d774-40fb-9b0a-44f8539ff6c4", 
      "is_metadata": true,
      "type": "string"
    }
  }
  ```
- **node**: Visible nodes, containing information about which form is used (`component_id`).
- **form**: The form with fields to display.