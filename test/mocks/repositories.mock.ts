export const createMockAccountRepository = () => ({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    findByIdAndUpdate: jest.fn(),
    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    insertMany: jest.fn(),
    countDocuments: jest.fn().mockResolvedValue(1),
    aggregate: jest.fn().mockResolvedValue([]),
});
