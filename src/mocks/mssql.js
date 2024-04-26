jest.mock('mssql');

const mockPool = {
  connect: jest.fn().mockResolvedValue({
    request: jest.fn().mockReturnThis(),
    query: jest.fn(),
    close: jest.fn(),
  }),
};

mssql.connect.mockResolvedValue(mockPool);

module.exports = mssql;
