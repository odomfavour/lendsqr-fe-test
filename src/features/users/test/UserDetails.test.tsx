import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserDetails from '../pages/UserDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { User } from '../../../types/user';

// Mocks
vi.mock('../../../components/Spinner/Spinner', () => ({
  default: () => <div>Loading Spinner</div>,
}));

vi.mock('../../../components/UserNotFound/UserNotFound', () => ({
  default: () => <div>User Not Found</div>,
}));

vi.mock('../components/GeneralDetails', () => ({
  default: ({ user }: { user: User }) => (
    <div>General Details for {user.name}</div>
  ),
}));

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

describe('UserDetails', () => {
  const mockUser = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders spinner while loading', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockUser),
          headers: new Headers(), // optional but good to include
          text: () => Promise.resolve(''), // include all required methods if needed
          clone: () => {},
          redirected: false,
          statusText: '',
          type: 'basic',
          url: '',
          body: null,
          bodyUsed: false,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
          blob: () => Promise.resolve(new Blob()),
          formData: () => Promise.resolve(new FormData()),
        } as Response) // 👈 Type assertion here helps TypeScript
    );

    render(
      <MemoryRouter initialEntries={['/users/123']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading Spinner')).toBeInTheDocument();
  });

  it('renders user details after successful fetch', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockUser),
          headers: new Headers(), // optional but good to include
          text: () => Promise.resolve(''), // include all required methods if needed
          clone: () => {},
          redirected: false,
          statusText: '',
          type: 'basic',
          url: '',
          body: null,
          bodyUsed: false,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
          blob: () => Promise.resolve(new Blob()),
          formData: () => Promise.resolve(new FormData()),
        } as Response) // 👈 Type assertion here helps TypeScript
    );

    render(
      <MemoryRouter initialEntries={['/users/123']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User Details')).toBeInTheDocument();
      expect(
        screen.getByText('General Details for John Doe')
      ).toBeInTheDocument();
    });
  });

  it('renders UserNotFound if fetch fails or user is null', async () => {
    global.fetch = vi.fn(() => Promise.reject('API Error'));

    render(
      <MemoryRouter initialEntries={['/users/123']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User Not Found')).toBeInTheDocument();
    });
  });

  it('switches tabs correctly', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockUser),
          headers: new Headers(), // optional but good to include
          text: () => Promise.resolve(''), // include all required methods if needed
          clone: () => {},
          redirected: false,
          statusText: '',
          type: 'basic',
          url: '',
          body: null,
          bodyUsed: false,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
          blob: () => Promise.resolve(new Blob()),
          formData: () => Promise.resolve(new FormData()),
        } as Response) // 👈 Type assertion here helps TypeScript
    );

    render(
      <MemoryRouter initialEntries={['/users/123']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('General Details for John Doe')
      ).toBeInTheDocument();
    });

    const documentsTab = screen.getByRole('button', { name: /Documents/i });
    fireEvent.click(documentsTab);

    expect(
      screen.queryByText('General Details for John Doe')
    ).not.toBeInTheDocument();
    expect(screen.getByText('No information here yet')).toBeInTheDocument();
  });
});
