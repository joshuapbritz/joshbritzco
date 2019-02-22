import { ObjectRecognitionInBrowserModule } from './object-recognition-in-browser.module';

describe('ObjectRecognitionInBrowserModule', () => {
  let objectRecognitionInBrowserModule: ObjectRecognitionInBrowserModule;

  beforeEach(() => {
    objectRecognitionInBrowserModule = new ObjectRecognitionInBrowserModule();
  });

  it('should create an instance', () => {
    expect(objectRecognitionInBrowserModule).toBeTruthy();
  });
});
