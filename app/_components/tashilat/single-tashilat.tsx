import styles from './tashilat.module.scss';

interface TashilatProps {
  id: string;
  createdDate: string;
  name: string;
  repaymentType: { name: string; value: number }[];
  amount: number;
  percentageRate?: number;
  penaltyRate: number;
  interestRate?: number;
}

const SingleTashilat = ({
  createdDate,
  name,
  repaymentType,
  amount,
  interestRate,
  percentageRate,
  penaltyRate,
}: TashilatProps) => {
  const formattedDate = new Date(createdDate).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className={styles['loan-card']}>
      <div className={styles['loan-header']}>
        <h2>{name}</h2>
        <span>تاریخ ایجاد:{formattedDate}</span>
      </div>
      <div className={styles['loan-body']}>
        <span>
          <strong>نوع بازپرداخت:</strong> {repaymentType?.at(0)?.name}
        </span>
        <span>
          <strong>مبلغ وام:</strong> {amount} تومان
        </span>
        <span>
          <strong>نرخ بهره:</strong> {interestRate ?? penaltyRate}%
        </span>
        <span>
          <strong>نرخ جریمه:</strong> {penaltyRate}%
        </span>
      </div>
    </div>
  );
};

export default SingleTashilat;
