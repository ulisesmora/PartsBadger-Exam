import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Spacer } from '@nextui-org/react';
import  { useContext } from 'react'
import { CreateMaterial } from '../../domain/interfaces/CreateForms';
import { useForm } from 'react-hook-form';
import { MaterialSchema } from '../../domain/validators/CreateFormsValidators';
import inventoryApi from '../../services/api/inventoryApi';
import { MateriaContext } from '../screens/Dashboard';

export default function FormMaterial() {


    const { changeDataMaterial  } = useContext(MateriaContext)

    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<CreateMaterial>({
        mode: 'onChange',
        resolver: yupResolver(MaterialSchema)
    })


    const onSubmit = async (material: CreateMaterial) => {
        try {
            const response = await inventoryApi.post('/api/inventorymaterial/', material,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            changeDataMaterial();
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
                type="text"
                helperText={errors.name && errors.name.message}
                size="lg"
                status={errors.name ? 'error' : 'success'}
                {...register('name')}
                placeholder="Name"
            />
            <Spacer y={3} />
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

            <Spacer y={3} />
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '40px', justifyContent: 'flex-end' }}>
                <Button type='submit' isLoading={isSubmitting} disabled={!isDirty || !isValid} color='success' auto >
                    Create

                </Button>
            </div>
        </form>

    )
}
