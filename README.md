# sportLog

## What and why?

This project was made to test out a styling solution that supports dark mode and more excitingly a collaborative note editing feature. 

Multiple users can modify a string note simultaneously and changes are synced to every device using ShareDB with websocket connection.

This is a technical demo and not intended for production. This is reflected in code as sometimes quick and hacky solutions, lack of authentication, using untyped libraries and so on. However reasonable amount of effort was made to keep the code readable.

Collaborative editing based on: https://dev.to/kannndev/let-s-build-a-collaborative-rich-text-editor-32n3


## Cool things

- Monorepo configuration with React Native
- Atomic design folder structure for components
- Collaborative real time note editing
- Styling solution that supports dark mode on React Native (Inspired by Material-UI 4 and originally made 2 years ago)
    - Is possible to support linting rules like unused styles?
    - Does it detect invalid styles like invalid value for textAlign etc?
    - Can it detect potentially invalid platform specific styles like z-index?
    - Performance concerns?


## Running locally

First make sure you have setup Yarn and React Native development environment locally: https://reactnative.dev/docs/environment-setup

Then follow step by step instructions:

1. Run `yarn` and `yarn tsc` in common folder
2. Run `yarn` and `yarn start` in backend folder
3. Run `yarn` in mobile folder
4. Run `pod install` in mobile/ios folder
5. Run `yarn ios` in mobile folder to run on iOS simulator
6. Run `yarn ios12` in mobile folder (starts another simulator to test collaborative editing)
6. App should now start in simulator or other connected device