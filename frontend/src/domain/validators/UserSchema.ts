
import * as yup from 'yup'

export const UserSchema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export const LoginSchema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().min(8).required()
})