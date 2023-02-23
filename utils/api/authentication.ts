import { axios } from '.';
import { authenticateStateType } from '../../Types/authentication';

export function loginApi(data: authenticateStateType) {
	return axios({
		method: 'POST',
		url: '/login',
		data,
	});
}

export function registerApi(data: authenticateStateType) {
	return axios({
		method: 'POST',
		url: '/register',
		data,
	});
}
