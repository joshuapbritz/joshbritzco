import { ThingsModule } from './things.module';

describe('ThingsModule', () => {
  let thingsModule: ThingsModule;

  beforeEach(() => {
    thingsModule = new ThingsModule();
  });

  it('should create an instance', () => {
    expect(thingsModule).toBeTruthy();
  });
});
