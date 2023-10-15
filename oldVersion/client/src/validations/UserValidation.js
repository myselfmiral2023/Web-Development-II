import * as yup from 'yup';


export const userSchema = yup.object().shape({
    fullName: yup.string().min(4).max(35),
    email: yup.string().email().required(),
    password: yup.string().min(2).max(15),
});

