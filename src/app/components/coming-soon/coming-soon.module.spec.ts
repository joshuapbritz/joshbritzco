import { ComingSoonModule } from './coming-soon.module';

describe('ComingSoonModule', () => {
  let comingSoonModule: ComingSoonModule;

  beforeEach(() => {
    comingSoonModule = new ComingSoonModule();
  });

  it('should create an instance', () => {
    expect(comingSoonModule).toBeTruthy();
  });
});
