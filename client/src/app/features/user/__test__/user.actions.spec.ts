import fetch from 'jest-fetch-mock';
import { mockStore } from 'src/__mocks__/store.mock';
import { register } from '../user.actions';
import { RegisterUserDto } from '../user.types';
import { UserActionTypes as types } from '../user.types';

describe('UserActions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('register', () => {
    const store = mockStore({ user: {} });
    const inputRegister: RegisterUserDto = {
      email: 'some@email.com',
      username: 'some',
      password: 'some',
    };

    it('Should return a token string', async () => {
      fetch.mockResponse(JSON.stringify({ token: 'some' }));

      const res = await store.dispatch<any>(register(inputRegister));
      expect(res.type).toEqual(types.REGISTER + '/fulfilled');
      expect(res.payload).toEqual({ token: 'some' });
    });

    it('Should reject error BadRequest', async () => {
      await fetch.mockReject(new Error('Bad request'));
      try {
        await store.dispatch<any>(register(inputRegister));
      } catch (error) {
        expect(error.type).toEqual(types.REGISTER + '/rejected');
      }
    });
  });
});
// See more at https://redux.js.org/recipes/writing-tests
