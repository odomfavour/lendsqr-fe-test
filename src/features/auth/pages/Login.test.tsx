import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { toast } from 'react-toastify';

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders email and password fields and login button', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows error if email or password is empty', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    expect(toast.error).toHaveBeenCalledWith('Email and password are required');
  });

  it('shows error if credentials are invalid', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'invalid@user.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
  });

  it('logs in and redirects with valid credentials', async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'admin@lendsqr.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'admin1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(localStorage.getItem('lendsqr-token')).toBe('mock-auth-token');
      expect(mockedNavigate).toHaveBeenCalledWith('/users');
      expect(toast.success).toHaveBeenCalledWith('Admin login successful!');
    });
  });

  it('toggles password visibility', () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText(
      /password/i
    ) as HTMLInputElement;
    const toggle = screen.getByText(/show/i);

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByText(/hide/i)).toBeInTheDocument();
  });
});
