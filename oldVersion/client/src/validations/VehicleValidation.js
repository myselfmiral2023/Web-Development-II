import * as yup from 'yup';


export const vehicleSchema = yup.object().shape({
    name: yup.string().required(),
    company: yup.string().required(),
    perdayrent: yup.number(),
    vehicletypeid: yup.number().min(1).max(8),
});

