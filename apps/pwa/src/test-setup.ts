import 'jest-preset-angular/setup-jest';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } }
);
 

// Mock Parse SDK
Object.defineProperty(global, 'Parse', { value: {
  User: {
    current: jest.fn().mockReturnValue({
      getUsername: jest.fn()
    })
  },
  Query: jest.fn(),
  Object: jest.fn(),
}, writable: true });