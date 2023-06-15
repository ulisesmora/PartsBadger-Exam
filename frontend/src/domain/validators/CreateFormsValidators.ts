
import * as yup from 'yup'

export const MaterialSchema = yup.object().shape({
    name: yup.string().required(),
    quantity: yup.number().required()
})

export const InventorySchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().min(8).required(),
    quantity: yup.number().min(0).required(),
    sku: yup.string().min(8).max(10).required(),
    material: yup.number().required()
})


export const OperationSchema = yup.object().shape({
    operation: yup.string().required(),
    quantity: yup.number().min(0).required(),
    inventory: yup.number().required(),

})