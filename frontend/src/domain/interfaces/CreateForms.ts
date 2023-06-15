export interface CreateMaterial {
    name: string,
    quantity: number,
}

export interface CreateInventory {
    name: string;
    description: string;
    quantity: number;
    sku: string;
    material: number;
}

export interface CreateOperation {
    operation:string;
    quantity:number;
    inventory:number;

}