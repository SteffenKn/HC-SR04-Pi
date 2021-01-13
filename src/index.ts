import {Gpio} from 'pigpio';

const SPEED_OF_SOUND: number = 0.03432;

type EchoListenerCallback = (level: number, tick: number) => void;

export default class DistanceMeter {
  private trigger: Gpio;
  private echo: Gpio;

  constructor(triggerPin: number, echoPin: number) {
    this.trigger = new Gpio(triggerPin, {mode: Gpio.OUTPUT});
    this.echo = new Gpio(echoPin, {mode: Gpio.INPUT, alert: true});

    this.trigger.digitalWrite(0);
  }

  public async getDistance(): Promise<number> {
    const firstDistance: number = await this.readDistance();
    const secondDistance: number = await this.readDistance();
    const thirdDistance: number = await this.readDistance();

    const totalDistance: number = firstDistance + secondDistance + thirdDistance
      - Math.max(firstDistance, secondDistance, thirdDistance)
      - Math.min(firstDistance, secondDistance, thirdDistance);

    return totalDistance;
  }

  private readDistance(): Promise<number> {
    return new Promise((resolve: Function): void => {
      let startTick: number;

      const echoListenerCallback: EchoListenerCallback = (level: number, tick: number): void => {
        if (level === 1) {
          startTick = tick;

          return;
        }

        const endTick: number = tick;
        const timeBetweenTicks: number = (endTick >> 0) - (startTick >> 0);

        const measuredDistance: number = (timeBetweenTicks / 2) * SPEED_OF_SOUND;

        const distance: number = measuredDistance > 500 || measuredDistance < 0 ? -1 : measuredDistance;

        resolve(distance);

        this.echo.removeListener('alert', echoListenerCallback);
      };

      this.echo.on('alert', echoListenerCallback);

      this.trigger.trigger(10, 1);
    });
  }
}
