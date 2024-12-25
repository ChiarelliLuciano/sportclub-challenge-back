import logging from '../../src/config/logging';

jest.mock('../../src/config/config', () => ({
    TEST: false
}));

describe('Logging Integration', () => {
    let consoleLogSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Logs a generic message with log()', () => {
        logging.log('Test log message', { key: 'value' });

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);

        const loggedMessage = consoleLogSpy.mock.calls[0].join(' ');
        expect(loggedMessage).toContain('[SERVER-LOG]');
        expect(loggedMessage).toContain('Test log message');
    });

    it('Logs an informational message with info()', () => {
        logging.info('Test info message');

        expect(consoleInfoSpy).toHaveBeenCalledTimes(1);

        const loggedMessage = consoleInfoSpy.mock.calls[0].join(' ');
        expect(loggedMessage).toContain('[INFO]');
        expect(loggedMessage).toContain('Test info message');
    });

    it('Logs a warning message with warn()', () => {
        logging.warn('Test warning message');

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

        const loggedMessage = consoleWarnSpy.mock.calls[0].join(' ');
        expect(loggedMessage).toContain('[WARN]');
        expect(loggedMessage).toContain('Test warning message');
    });

    it('Logs an error message with error()', () => {
        logging.error('Test error message');

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

        const loggedMessage = consoleErrorSpy.mock.calls[0].join(' ');
        expect(loggedMessage).toContain('[ERROR]');
        expect(loggedMessage).toContain('Test error message');
    });

    it('Determines the calling function with getCallingFunction()', () => {
        const functionName = logging.getCallingFunction(new Error());
        expect(['Promise', 'it']).toContain(functionName);
    });
});
