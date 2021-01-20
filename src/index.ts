import {Gpio} from 'pigpio';

const SPEED_OF_SOUND: number = 0.03432;

type EchoListenerCallback = (level: number, tick: number) => void;

export default class DistanceMeter {
  private trigger: Gpio;
  private echo: Gpio;

  private currentMeasuringPromise: Promise<number>;

  constructor(triggerPin: number, echoPin: number) {
    this.trigger = new Gpio(triggerPin, {mode: Gpio.OUTPUT});
    this.echo = new Gpio(echoPin, {mode: Gpio.INPUT, alert: true});

    this.trigger.digitalWrite(0);
  }

  public getDistance(): Promise<number> {
    if (this.currentMeasuringPromise) {
      return this.currentMeasuringPromise;
    }

    this.currentMeasuringPromise = new Promise(async(resolve: Function): Promise<void> => {
        const firstDistance: number = await this.readDistance();
        this.wait(150);
        const secondDistance: number = await this.readDistance();
        this.wait(150);
        const thirdDistance: number = await this.readDistance();

        const totalDistance: number = firstDistance + secondDistance + thirdDistance
          - Math.max(firstDistance, secondDistance, thirdDistance)
          - Math.min(firstDistance, secondDistance, thirdDistance);

        this.currentMeasuringPromise = undefined;

        resolve(totalDistance);
      });

    return this.currentMeasuringPromise;
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

  private wait(ms: number): Promise<void> {
    return new Promise((resolve: Function): void => {
      setTimeout(resolve, ms);
    });
  }
}
