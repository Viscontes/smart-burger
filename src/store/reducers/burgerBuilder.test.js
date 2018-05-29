import reducer from './burgerBuilder';

describe('burgerBuilder reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      ingredients: null,
      totalPrice: 4,
      error: false,
      buildingProcess: false
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
