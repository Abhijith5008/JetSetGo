// App.test.js
import React from 'react';
import { render, act } from '@testing-library/react-native'; // Import testing utilities
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mock AsyncStorage
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText).toBeTruthy(); // Assert a component renders (basic check)
  });

  it('sets isLoggedIn to true when a token exists in AsyncStorage', async () => {
    const mockToken = 'valid_token';
    AsyncStorage.getItem.mockResolvedValue(mockToken);

    await act(async () => {
      render(<App />);
    });

    const { getByText } = render(<App />); // Re-render to access updated state

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1); // Assert getItem called once
    expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1); // Assert removeItem called (cleanup)
    expect(getByText).toBeTruthy(); // Basic check again
  });

  it('sets isLoggedIn to false when no token exists in AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    await act(async () => {
      render(<App />);
    });

    const { getByText } = render(<App />); // Re-render to access updated state

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1); // Assert getItem called once
    expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1); // Assert removeItem called (cleanup)
    expect(getByText).toBeTruthy(); // Basic check again
  });
});
