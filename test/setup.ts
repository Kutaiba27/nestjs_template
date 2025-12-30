import { config } from 'dotenv';

// Load test environment variables
config({ path: '.env.test' });

// Increase timeout for e2e tests
jest.setTimeout(30000);

// Global test setup
beforeAll(async () => {
    // Any global setup needed before all tests
});

// Global test teardown
afterAll(async () => {
    // Any global cleanup needed after all tests
});
