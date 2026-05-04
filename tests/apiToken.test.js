const axios = require('axios');

jest.mock('axios');

describe('trackActivity', () => {
	beforeEach(() => {
		axios.mockResolvedValue({ status: 200, data: '' });
	});

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
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.stringContaining('apiToken'),
			})
		);
	});

	it('should track without api-token', () => {
		// Test case setup
		const callback = jest.fn();
		const tracker = require('../index')('serviceId', 'eu');
		// Call the function
		tracker.trackActivity('accountId', 'userId', 'activity', 'module', callback);
		// Assertion
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(
			expect.objectContaining({
				url: expect.not.stringContaining('apiToken'),
			})
		);
	});
});
