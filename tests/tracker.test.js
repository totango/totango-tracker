const tracker = require('../index')('serviceId', 'eu', 'apiToken');
const request = require('request');
require('./validations');

jest.mock('request');

describe('totango tracker', () => {

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
			expect(request).toHaveBeenCalledTimes(1);
			expect(request).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeActivityUrl(),
				}), expect.any(Function)
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
			expect(request).toHaveBeenCalledTimes(1);
			expect(request).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeUserAttributesUrl(),
				}), expect.any(Function)
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
			expect(request).toHaveBeenCalledTimes(1);
			expect(request).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.toBeAccountAttributesUrl(),
				}), expect.any(Function)
			);
		});
	});
});
