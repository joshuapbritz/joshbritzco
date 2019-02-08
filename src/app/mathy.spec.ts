import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MathY } from './mathy';

describe('Mathy', () => {
  let instance: MathY;

  beforeEach(() => {
    instance = new MathY();
  });

  it('it should have a method `addNumbersPlusTen` the returns 30 when given 10 and 10 as parameters', () => {
    const result = instance.addNumbersPlusTen(10, 10);
    expect(result).toEqual(30);
  });
});
