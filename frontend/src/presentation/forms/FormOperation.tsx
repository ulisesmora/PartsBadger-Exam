import { useForm } from "react-hook-form";
import { CreateOperation } from "../../domain/interfaces/CreateForms";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationSchema } from "../../domain/validators/CreateFormsValidators";
import inventoryApi from "../../services/api/inventoryApi";
import { Button, Input, Spacer } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Inventory } from "../../domain/interfaces/InventoryInformation";
import { MateriaContext } from "../screens/Dashboard";

export default function FormOperation() {

    const [inventory, setInventory] = useState<Inventory[]>([])
    
    const { changeDataOperation  } = useContext(MateriaContext)

    useEffect(() => {
        GetInventoryList()
    }, [])

    async function GetInventoryList() {
        try {
            const response = await inventoryApi.get<Inventory[]>('api/inventoryinventory/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setInventory(() => response.data)
        } catch (error) {
            console.log(error)
        }

    }


    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<CreateOperation>({
        mode: 'onChange',
        resolver: yupResolver(OperationSchema)
    })


    const onSubmit = async (material: CreateOperation) => {
        try {
            const response = await inventoryApi.post('api/inventoryoperations/', material,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data, 'data');
            changeDataOperation()


        } catch (error) {
            console.log(error)
            reset()


        }
    }
    return (
        <form style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} onSubmit={handleSubmit(onSubmit)}>
            <select {...register("operation")}>
                <option disabled selected value={''}> -- select an option -- </option>
                <option value={"ADDINVENTORY"}>Add inventory</option>
                <option value={"SUBTRACTINVENTORY"}>Send (subtract) inventory</option>
            </select>
            <Input
                clearable
                bordered
                helperText={errors.quantity && errors.quantity.message}
                fullWidth
                type="number"
                color="success"
                size="lg"
                status={errors.quantity ? 'error' : 'success'}
                {...register('quantity')}
                placeholder="Quantity"
            />

            <select {...register("inventory")}>

            <option disabled selected value={''}> -- select an option -- </option>
                {inventory.map((item, index) => <option key={index} value={item.id}> {item.sku} - {item.name}</option>)}
            </select>


            <Spacer y={3} />
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '40px', justifyContent: 'flex-end' }}>
                <Button type='submit' isLoading={isSubmitting} disabled={!isDirty || !isValid} color='success' auto >
                    Create

                </Button>
            </div>
        </form>

    )
}
