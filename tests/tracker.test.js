const axios = require('axios');
const tracker = require('../index')('serviceId', 'eu', 'apiToken');
require('./validations');

jest.mock('axios');

describe('totango tracker', () => {

	beforeEach(() => {
		axios.mockResolvedValue({ status: 200, data: '' });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('trackActivity', () => {
		it('should track activity successfully', () => {
			// Test case setup
			const callback = jest.fn();
			// Call the function
			tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
			// Assertion
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeActivityUrl('serviceId'),
				})
			);
		});
	});

	describe('trackActivityByServiceId', () => {
		it('should track activity with a specific service id successfully', () => {
			// Test case setup
			const callback = jest.fn();
			// Call the function
			tracker.trackActivityByServiceId('differentServiceId', 'accountId', 'userId', 'activity', 'module', callback);
			// Assertion
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeActivityUrl('differentServiceId'),
				})
			);
		});
	});

	describe('setUserAttributes', () => {
		it('should send user attribute', () => {
			// Test case setup
			const callback = jest.fn();
			const attributes = {
				'attribute_name': 'attribute_value',
			};
			// Call the function
			tracker.setUserAttributes('accountId', 'userId', attributes, callback);
			// Assertion
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeUserAttributesUrl(),
				})
			);
		});
	});

	describe('setAccountAttributes', () => {
		it('should send account attribute', () => {
			// Test case setup
			const callback = jest.fn();
			const attributes = {
				'attribute_name': 'attribute_value',
			};
			// Call the function
			tracker.setAccountAttributes('accountId', attributes, callback);
			// Assertion
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeAccountAttributesUrl(),
				})
			);
		});
	});
});
