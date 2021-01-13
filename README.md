# HC-SR04-Pi

HC-SR04-Pi is a module for distance measurement with a Raspberry Pi via a HC-SR04 sensor.

## Usage

In order to use HC-SR04-Pi you have to make sure pigpio is installed:
```
sudo apt-get update
sudo apt-get install pigpio
```

## Limitations

Since the HC-SR04-Pi module uses pigpio there are some limitations:

- A limitation of the pigpio C library is that it can only be used by a single running process.
- The pigpio C library requires root/sudo privileges to access hardware peripherals.

This means you have to run your program with root/sudo privileges aswell!
