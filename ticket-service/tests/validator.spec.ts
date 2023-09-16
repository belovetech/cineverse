import { describe, expect, it } from 'vitest';
import { validateDto } from '../src/utils/validator';
import { TestDto } from '../src/utils/validator.setup';

describe('validator', () => {
  it('should validate dto', async () => {
    const model = {
      bookingId: 'd4f9f8f7-6d9a-4a63-88f9-6e66d59b19d0',
      customerId: '123',
      seatNumber: 'A123',
      bookingDate: '2021-01-01',
      totalAmount: '123.20',
    };

    const errors = await validateDto(model, TestDto);
    expect(errors).toEqual([]);
  });

  it('should validate dto with errors', async () => {
    const model = {
      bookingId: 'd4f9f8f7-6d9a-4a6388f9',
      customerId: '123',
      seatNumber: 'A123',
      bookingDate: '2021-01-01',
      totalAmount: 123.2,
    };
    const errors = await validateDto(model, TestDto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
