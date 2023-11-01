import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, ERROR_MESSAGE } from './constants/message.js';

export default class User {
  constructor({ initialState }) {
    this.validationState(initialState);
    this.state = initialState;
  }

  setState(nextState) {
    this.validationState(nextState);
    this.state = nextState;
  }

  async promptCarNames() {
    const userInput = await Console.readLineAsync(MESSAGE.CAR_NAME);
    const carList = userInput.split(',');
    this.setState({ ...this.state, carList });
  }

  async promptPlayNumber() {
    const playNumber = Number(await Console.readLineAsync(MESSAGE.PLAY_NUMBER));
    this.setState({ ...this.state, playNumber });
  }

  validationState(nextState) {
    const { playNumber, carList } = nextState;

    if (typeof playNumber !== 'number' || Number.isNaN(playNumber)) {
      throw new Error(ERROR_MESSAGE.NUMBER);
    }

    if (!Array.isArray(carList)) {
      throw new Error(ERROR_MESSAGE.ARRAY);
    }

    carList.forEach((name) => {
      if (name.length > 5 || name === '') {
        throw new Error(ERROR_MESSAGE.NAME);
      }
    });
  }
}
