export interface RegisterBlueForm {
  facilitie: string;
  name: string;
  family: string;
  nationalCode: number | null;
  birthday: string | null;
  phoneNumber: number | null;
  accountNumber?: number | null;
  ShabaNumber?: string | null;
  average?: number | null;
  money?: number | null;
  RepaymentPeriod?: string |null;
  installmentsNumber?: number | null;
  monthlyInstallment?: number | null;
  annualInterestPercentage?: number | null;
  lateFeeAmount?: number | null;
}
