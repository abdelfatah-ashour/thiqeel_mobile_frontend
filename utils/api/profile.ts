import { axios } from '.';
import { axiosPayloadType } from '../../Types/authentication';

export function updateProfileAPi(data: axiosPayloadType) {
	return axios({ method: 'POST', url: '', data: data });
}
