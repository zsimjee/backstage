# Debugger Backend plugin

This is the backend part of the debugging plugin.

The purpose of the plugin is to help adopters track what's going on inside the
system - to see events as they happen, etc.

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/debug](http://localhost:3000/debug).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.
