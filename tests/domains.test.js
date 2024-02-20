
const request = require('request');
require('./validations');

jest.mock('request');

describe('tracker domain', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send to US site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'production');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr.totango.com'),
			}), expect.any(Function)
		);
	});

	it('should send to EU site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'eu');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr-eu1.totango.com'),
			}), expect.any(Function)
		);
	});

	it('should send to Test site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'test');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr-test.totango.com'),
			}), expect.any(Function)
		);
	});
});
