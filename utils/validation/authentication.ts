import * as yup from 'yup';
import { authenticateStateType } from '../../Types/authentication';

export function authenticateValidation(payload: authenticateStateType) {
	let schemaValidate;
	if (payload.type === 'email') {
		schemaValidate = yup.object({
			email: yup.string().email().required(),
			password: yup.string().min(6).max(16).required(),
		});
	}

	if (payload.type === 'phone') {
		schemaValidate = yup.object({
			phone: yup.string().required(),
			password: yup.string().min(6).max(16).required(),
		});
	}

	return schemaValidate?.validate(payload, {
		abortEarly: false,
	});
}
