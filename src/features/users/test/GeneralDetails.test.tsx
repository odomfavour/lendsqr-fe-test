import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GeneralDetails from '../components/GeneralDetails';
import { mockUser } from './__mocks__/mockUser';

describe('GeneralDetails', () => {
  it('renders all user details', () => {
    render(<GeneralDetails user={mockUser} />);

    expect(screen.getByText(/personal information/i)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.education.level)).toBeInTheDocument();
    expect(screen.getByText(mockUser.socials.twitter)).toBeInTheDocument();
    expect(screen.getByText(mockUser.guarantor.fullName)).toBeInTheDocument();
  });

  it('shows fallback values when optional data is missing', () => {
    const userWithMissingFields = {
      ...mockUser,
      email: '',
      bvn: '',
      education: {
        ...mockUser.education,
        monthlyIncome: ['', ''] as [string, string], // ✅ Fix here
      },
    };

    render(<GeneralDetails user={userWithMissingFields} />);
    expect(screen.getByText('grace@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('07060780922')).toBeInTheDocument();
  });
});
