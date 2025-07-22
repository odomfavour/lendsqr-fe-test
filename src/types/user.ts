export type User = {
  id: number;
  organization: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  status: 'Active' | 'Inactive' | string;
  loan: boolean;
  savings: boolean;
  bvn: string;
  gender: 'Male' | 'Female' | string;
  maritalStatus: 'Single' | 'Married' | string;
  children: string;
  residence: string;
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [string, string]; // or string[]
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
};
