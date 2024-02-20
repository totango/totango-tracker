const request = require('request');
require('./validations');

jest.mock('request');


describe('trackActivity', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should track with api-token', () => {
		// Test case setup
		const callback = jest.fn();
		const tracker = require('../index')('serviceId', 'eu', 'apiToken');
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('apiToken'),
			}), expect.any(Function)
		);
	});

	it('should track without api-token', () => {
		// Test case setup
		const callback = jest.fn();
		const tracker = require('../index')('serviceId', 'eu');
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.not.stringContaining('apiToken'),
			}), expect.any(Function)
		);
	});
});
