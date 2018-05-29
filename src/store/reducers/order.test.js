import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      loading: false,
      purchased: false
    });
  });

  it('should order burger', () => {
    expect(
      reducer(
        {
          orders: [],
          loading: false,
          purchased: false
        },
        {
          type: actionTypes.PURCHASE_BURGER_SUCCESS,
          orderData: ['some-order'],
          orderId: 'order-id'
        }
      )
    ).toEqual({
      loading: false,
      purchased: true,
      orders: [{ 0: 'some-order', id: 'order-id' }]
    });
  });
});
