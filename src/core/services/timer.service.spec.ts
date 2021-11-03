import { TimerService } from './timer.service';

const mockTimerRepository = {
  create: jest.fn(),
};

describe('TimerService', () => {
  let timerService: TimerService;

  beforeEach(() => {
    timerService = new TimerService(mockTimerRepository);

    mockTimerRepository.create.mockClear();
  });

  it('it should be able to create a new timer', async () => {});
});
