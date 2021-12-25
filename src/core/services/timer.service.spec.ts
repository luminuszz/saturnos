import { TimerService } from './timer.service';
import { Test } from '@nestjs/testing';
import { TimerRepositoryContract } from '../contracts/timer-repository.contract';
import MockDate from 'mockdate';

const mockTimerRepository = {
  create: jest.fn(),
};

describe('TimerService', () => {
  let timerService: TimerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TimerService,
        { provide: TimerRepositoryContract, useValue: mockTimerRepository },
      ],
    }).compile();

    timerService = moduleRef.get<TimerService>(TimerService);

    jest.clearAllMocks();
  });

  it('it should be able to create a new timer', async () => {
    const mockDate = new Date(2020, 5, 20, 9).getTime();

    const now = new Date();

    MockDate.set(mockDate);

    mockTimerRepository.create.mockImplementation((value) => value);

    const timer = await timerService.create({
      username: 'user1',
      hours: 8,
    });

    console.log({
      timer,
      mockDate,
      now: now.getUTCHours(),
    });

    console.log({
      timer,
    });
  });
});
