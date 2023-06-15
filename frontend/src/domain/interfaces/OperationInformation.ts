
export interface OperationInformation {
  id: number;
  operation: string;
  quantity: number;
  inventory: number;
  created: string;
  material?: number|null;
  user: number;
}