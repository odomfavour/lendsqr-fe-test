import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// ✅ Mock `toast` and `navigate` inline-safe
vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedNavigate = vi.fn();
const toastInfoMock = vi.mocked((await import('react-toastify')).toast.info);

describe('<Header />', () => {
  beforeEach(() => {
    localStorage.setItem('lendsqr-user-email', 'john.doe@example.com');
    localStorage.setItem('lendsqr-token', 'dummy-token');
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('logs out and redirects when logout is clicked', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Open dropdown (you can also find the avatar or use getByText with name)
    const userButton = screen.getByText(/john doe/i);
    fireEvent.click(userButton);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem('lendsqr-token')).toBeNull();
      expect(mockedNavigate).toHaveBeenCalledWith('/login');
      expect(toastInfoMock).toHaveBeenCalledWith('You have been logged out');
    });
  });
});
