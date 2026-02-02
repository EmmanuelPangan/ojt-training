import { AvailabilityStatusPipe } from './availability-status.pipe';

describe('AvailabilityStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new AvailabilityStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
