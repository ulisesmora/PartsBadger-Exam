import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { CreateInventory } from "../../domain/interfaces/CreateForms";
import inventoryApi from "../../services/api/inventoryApi";
import { InventorySchema } from "../../domain/validators/CreateFormsValidators";
import { useContext, useEffect, useState } from "react";
import { Material } from "../../domain/interfaces/MaterialInformation";
import { MateriaContext } from "../screens/Dashboard";

export default function FormInventory() {


    const { changeDataInventory  } = useContext(MateriaContext)

    const [materials, setMaterials] = useState<Material[]>([])

    useEffect(() => {
        getMaterials()
    }, [])


    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<CreateInventory>({
        mode: 'onChange',
        resolver: yupResolver(InventorySchema)
    })

    async function getMaterials() {
        try {

            const response = await inventoryApi.get<Material[]>('api/inventorymaterial/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMaterials(() => response.data)
        } catch (error) {
            console.log(error)

        }
    }


    const onSubmit = async (material: CreateInventory) => {
        try {
            const response = await inventoryApi.post('api/inventoryinventory/', material,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            changeDataInventory()
            console.log(response.data, 'data');


        } catch (error) {
            console.log(error)
            reset()


        }
    }
    return (
        <form style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} onSubmit={handleSubmit(onSubmit)}>
            <Input
                clearable
                bordered
                fullWidth
                color="success"
                helperText={errors.name && errors.name.message}
                size="lg"
                type="text"
                status={errors.name ? 'error' : 'success'}
                {...register('name')}
                placeholder="Name"
            />

            <Input
                clearable
                bordered
                helperText={errors.description && errors.description.message}
                fullWidth
                type="text"
                color="success"
                size="lg"
                status={errors.description ? 'error' : 'success'}
                {...register('description')}
                placeholder="Description"
            />


            <Input
                clearable
                bordered
                helperText={errors.quantity && errors.quantity.message}
                fullWidth
                color="success"
                size="lg"
                status={errors.quantity ? 'error' : 'success'}
                {...register('quantity')}
                placeholder="Quantity"
            />

            <Input
                clearable
                bordered
                helperText={errors.sku && errors.sku.message}
                fullWidth
                type="text"
                color="success"
                size="lg"
                status={errors.sku ? 'error' : 'success'}
                {...register('sku')}
                placeholder="Sku"
            />
            <select {...register("material")}>

            <option disabled selected value={''}> -- select an option -- </option>
                {materials.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}

            </select>

            <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '40px', justifyContent: 'flex-end' }}>
                <Button type='submit' isLoading={isSubmitting} disabled={!isDirty || !isValid} color='success' auto >
                    Create

                </Button>
            </div>
        </form>

    )
}
