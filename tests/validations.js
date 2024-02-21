expect.extend({
	toBeActivityUrl(received, serviceId) {
		const url = new URL(received);
		const searchParams = url.searchParams;
		return {
			message: () => `expected ${received} to be a valid URL`,
			pass: url.protocol === 'https:' &&
				url.hostname !== '' &&
				searchParams.get('sdr_s') === serviceId &&
				searchParams.get('sdr_o') === 'accountId' &&
				searchParams.get('sdr_u') === 'userId' &&
				searchParams.get('sdr_a') === 'activity' &&
				searchParams.get('sdr_m') === 'module' &&
				searchParams.get('api-token') === 'apiToken',
		};
	},
	toBeUserAttributesUrl(received) {
		const url = new URL(received);
		const searchParams = url.searchParams;
		return {
			message: () => `expected ${received} to be a valid URL`,
			pass: url.protocol === 'https:' &&
				url.hostname !== '' &&
				searchParams.get('sdr_s') === 'serviceId' &&
				searchParams.get('sdr_o') === 'accountId' &&
				searchParams.get('sdr_u') === 'userId' &&
				searchParams.get('sdr_u.attribute_name') === 'attribute_value' &&
				searchParams.get('api-token') === 'apiToken',
		};
	},
	toBeAccountAttributesUrl(received) {
		const url = new URL(received);
		const searchParams = url.searchParams;
		return {
			message: () => `expected ${received} to be a valid URL`,
			pass: url.protocol === 'https:' &&
				url.hostname !== '' &&
				searchParams.get('sdr_s') === 'serviceId' &&
				searchParams.get('sdr_o') === 'accountId' &&
				searchParams.get('sdr_o.attribute_name') === 'attribute_value' &&
				searchParams.get('api-token') === 'apiToken',
		};
	},
});
