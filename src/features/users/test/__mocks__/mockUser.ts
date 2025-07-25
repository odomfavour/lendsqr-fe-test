import type { User } from '../../../../types/user';

export const mockUser: User = {
  id: 1,
  organization: 'Lendsqr',
  name: 'Grace Hopper',
  email: 'grace@example.com',
  phone: '07012345678',
  joined: '2024-01-10',
  status: 'Active',
  loan: true,
  savings: true,
  bvn: '12345678901',
  gender: 'Female',
  maritalStatus: 'Single',
  children: 'None',
  residence: 'Own Apartment',
  education: {
    level: 'BSc',
    employmentStatus: 'Employed',
    sector: 'Tech',
    duration: '2 years',
    officeEmail: 'grace.office@example.com',
    monthlyIncome: ['200000', '300000'],
    loanRepayment: '50000',
  },
  socials: {
    twitter: '@grace',
    facebook: 'facebook.com/grace',
    instagram: '@graceinsta',
  },
  guarantor: {
    fullName: 'Jane Doe',
    phoneNumber: '08012345678',
    email: 'jane@example.com',
    relationship: 'Sister',
  },
};
