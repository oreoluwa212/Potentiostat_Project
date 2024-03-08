# Potentiostat with Enhanced User Interface

## Overview

This repository contains the code and documentation for a Potentiostat final year project that focuses on enhancing the user interface. The Potentiostat is a device used for electrochemical measurements, and this project integrates a Raspberry Pi, Digital-to-Analog Converter (DAC), and Analog-to-Digital Converter (ADC) to create a versatile and user-friendly system.

## Potentiostat

A potentiostat is an instrument used for controlling the voltage between a working electrode and a reference electrode in electrochemical experiments. It enables precise control of the electrochemical potential, making it a crucial tool in various fields such as battery research, corrosion studies, and sensor development.

## Features

- **Enhanced User Interface:** The project introduces a new user interface that focuses on simplicity, accessibility, and functionality. The goal is to provide users with a seamless experience in controlling and monitoring electrochemical experiments.

- **Raspberry Pi Integration:** A Raspberry Pi serves as the brain of the system, handling the user interface, data processing, and communication with external devices. This integration adds flexibility and allows for remote monitoring and control.

- **DAC (Digital-to-Analog Converter):** The DAC is responsible for converting digital signals from the Raspberry Pi into analog signals that control the voltage applied to the working electrode. This precise control is essential for accurate and reproducible experiments.

- **ADC (Analog-to-Digital Converter):** The ADC converts analog signals from the electrochemical cell into digital data that can be processed by the Raspberry Pi. This data is then displayed on the user interface, providing real-time feedback on the experiment.

## Setup Instructions

1. **Hardware Setup:**
   - Connect the working electrode, reference electrode, and auxiliary electrode to the Potentiostat.
   - Ensure proper connections between the Potentiostat, Raspberry Pi, DAC, and ADC.

2. **User Interface:**
   - Access the user interface by navigating to `http://<raspberry_pi_ip>:<port>` in a web browser.
   - Follow the on-screen instructions to set up and control your electrochemical experiment.

## Usage

1. Launch the user interface.
2. Set experiment parameters, such as voltage range and scan rate.
3. Start the experiment and monitor real-time data on the user interface.
4. Save and export experiment data for further analysis.

## Contributing

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Your input is highly valuable in improving the functionality and usability of the Potentiostat.
