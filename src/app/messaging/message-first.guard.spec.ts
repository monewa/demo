import { TestBed } from '@angular/core/testing';

import { MessageFirstGuard } from './message-first.guard';

describe('MessageFirstGuard', () => {
  let guard: MessageFirstGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MessageFirstGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
