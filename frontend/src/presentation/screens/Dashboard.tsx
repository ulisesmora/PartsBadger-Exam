import { Container } from "@nextui-org/react";
import NavbarInventory from "../components/NavbarInventory";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";


interface MaterialContext {
    material: boolean;
    inventory: boolean;
    operation: boolean;
    changeDataMaterial: () => void;
    changeDataInventory: () => void;
    changeDataOperation: () => void;

}

const defaultState = {
    material: false,
    inventory: false,
    operation: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeDataMaterial: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeDataInventory: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeDataOperation: () => {}
}

export const MateriaContext = createContext<MaterialContext>(defaultState);

export default function Dashboard() {

    const [material, setMaterialChange] = useState<boolean>(defaultState.material)
    const [operation, setOperationChange] = useState<boolean>(defaultState.operation)
    const [inventory, setInventoryChange] = useState<boolean>(defaultState.inventory)


    const changeDataMaterial = () => {
        setMaterialChange(!material);
    }

    const changeDataOperation  = () => {
        setOperationChange(!operation);
    }

    const changeDataInventory = () => {
        setInventoryChange(!inventory);
    }
    return (
        <MateriaContext.Provider value={{material, operation  , inventory, changeDataMaterial , changeDataInventory, changeDataOperation }}> 
        <Container css={{w:'100%',h:'100vh'}}>
            <NavbarInventory/>
            <Outlet />
        </Container>
        </MateriaContext.Provider>
    )
}
