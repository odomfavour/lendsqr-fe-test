import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersList from '../pages/UsersList';
import { MemoryRouter } from 'react-router-dom';

// Mock fetch globally
const mockUsers = [
  {
    id: 1,
    organization: 'Org 1',
    name: 'User One',
    email: 'user1@example.com',
    phone: '1234567890',
    joined: '2022-01-01',
    status: 'Active',
    loan: true,
    savings: true,
  },
  {
    id: 2,
    organization: 'Org 2',
    name: 'User Two',
    email: 'user2@example.com',
    phone: '0987654321',
    joined: '2022-02-01',
    status: 'Inactive',
    loan: false,
    savings: false,
  },
];

const mockFetch = vi.fn();

beforeEach(() => {
  global.fetch = mockFetch;
  mockFetch.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <UsersList />
    </MemoryRouter>
  );
};

describe('UsersList Component', () => {
  it('renders heading and cards', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument();
    });

    expect(screen.getByText('USERS')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
  });

  it('displays table rows after data is fetched', async () => {
    mockFetch.mockResolvedValue({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    renderComponent();

    await screen.findByText('User One');
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();
  });

  it('shows loading spinner while loading', async () => {
    const promise = new Promise<{
      json: () => Promise<typeof mockUsers>;
      headers: { get: () => string };
    }>((resolve) => {
      // store the resolver so we can call it later
      setTimeout(() => {
        resolve({
          json: async () => mockUsers,
          headers: { get: () => '2' },
        });
      }, 0); // simulate async resolution
    });

    mockFetch.mockReturnValueOnce(promise as unknown as Promise<Response>);

    renderComponent();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('shows no users message if list is empty', async () => {
    mockFetch.mockResolvedValue({
      json: async () => [],
      headers: { get: () => '0' },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No users found.')).toBeInTheDocument();
    });
  });

  it('filters users when form is submitted', async () => {
    const filteredUsers = [
      {
        id: 1,
        organization: 'Org 1',
        name: 'User One',
        email: 'user1@example.com',
        phone: '1234567890',
        joined: '2022-01-01',
        status: 'Active',
        loan: true,
        savings: true,
      },
    ];

    // First fetch: for counts
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    // Second fetch: for initial user list
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    // Third fetch: for filtered results
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => filteredUsers,
      headers: { get: () => '1' },
    });

    renderComponent();

    // Wait for first data to show
    await screen.findByText('User One');

    // Open filter form (target the EMAIL column)
    const filterButton = screen.getByTestId('filter-toggle-2'); // 0=org, 1=username, 2=email
    fireEvent.click(filterButton);

    const emailInput = await screen.findByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'user1@example.com' } });

    // Submit filter form
    const submitButton = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(submitButton);

    // Ensure fetch is called again with filter query
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(mockFetch.mock.calls[2][0]).toContain('email=user1%40example.com');
    });

    // Confirm filtered user is shown
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.queryByText('User Two')).not.toBeInTheDocument();
  });

  it('resets filters when reset button is clicked', async () => {
    // First: Fetch for card counts
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    // Second: Initial users fetch
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    // Third: Fetch after reset
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '2' },
    });

    renderComponent();

    await screen.findByText('User One');

    // Open filter on EMAIL column (index 2)
    const filterButton = screen.getByTestId('filter-toggle-2');
    fireEvent.click(filterButton);

    const emailInput = await screen.findByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    // Verify form reset
    expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('');
  });

  it('handles pagination controls', async () => {
    // First fetch for card data
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '25' },
    });

    // Second fetch for page 1 users
    mockFetch.mockResolvedValueOnce({
      json: async () => mockUsers,
      headers: { get: () => '25' },
    });

    // Third fetch for page 2 users
    mockFetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 3,
          organization: 'Org 3',
          name: 'User Three',
          email: 'user3@example.com',
          phone: '5551234567',
          joined: '2022-03-01',
          status: 'Active',
          loan: false,
          savings: true,
        },
      ],
      headers: { get: () => '25' },
    });

    renderComponent();

    await screen.findByText('User One');

    const page2 = await screen.findByRole('button', { name: '2' });
    fireEvent.click(page2);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(screen.getByText('User Three')).toBeInTheDocument();
    });
  });
});
