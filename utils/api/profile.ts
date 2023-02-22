import { axios } from '.';
import { axiosPayloadType } from '../../types';

export function updateProfileAPi(data: axiosPayloadType) {
	return axios({ method: 'POST', url: '', data: data });
}
