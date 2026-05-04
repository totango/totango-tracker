const axios = require('axios');

jest.mock('axios');

describe('tracker domain', () => {
	beforeEach(() => {
		axios.mockResolvedValue({ status: 200, data: '' });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send to US site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'us');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr.totango.com'),
			})
		);
	});

	it('should send to EU site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'eu');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr-eu1.totango.com'),
			})
		);
	});

	it('should send to Test site', () => {
		// Test case setup
		const tracker = require('../index')('serviceId', 'test');
		const callback = jest.fn();
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('sdr-test.totango.com'),
			})
		);
	});
});
