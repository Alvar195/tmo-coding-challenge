import { async, TestBed } from '@angular/core/testing';
import { SharedUtilTestModule } from './shared-util-test.module';

describe('SharedUtilTestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilTestModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilTestModule).toBeDefined();
  });
});
