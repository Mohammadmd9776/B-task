'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './register.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterBlueForm } from '../../@types/register-form';
import { data } from '../../data.json';

interface IForm extends RegisterBlueForm {
  step: 'USER_INFO' | 'BANK_INFO' | 'REFUND';
}

export const validationSchema: yup.ObjectSchema<IForm> = yup.object({
  step: yup
    .mixed<IForm['step']>()
    .oneOf(['USER_INFO', 'BANK_INFO', 'REFUND'])
    .required(),
  facilitie: yup.string().required('این فیلد اجباری میباشد'),
  name: yup.string().required('این فیلد اجباری میباشد'),
  family: yup.string().required('این فیلد اجباری میباشد'),
  nationalCode: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .required('این فیلد اجباری میباشد'),
  birthday: yup
    .string()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .required('این فیلد اجباری میباشد'),

  phoneNumber: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .required('این فیلد اجباری میباشد'),
  accountNumber: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'BANK_INFO') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  ShabaNumber: yup
    .string()
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;

      if (step === 'BANK_INFO') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  average: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'BANK_INFO') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  RepaymentPeriod: yup
    .string()
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  installmentsNumber: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  monthlyInstallment: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  annualInterestPercentage: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  money: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
  lateFeeAmount: yup
    .number()
    .typeError('لطفاً عدد وارد کنید')
    .nullable()
    .test('req', 'این فیلد اجباری است', (val, ctx) => {
      const step = ctx.parent.step;
      if (step === 'REFUND') {
        if (!val) {
          return false;
        }
      }
      return true;
    }),
});

function RegisterForm() {
  const [priodR, setPriodR] = useState<{ name: string; value: number }[]>([]);

  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onBlur',
    defaultValues: {
      step: 'USER_INFO',
      facilitie: '',
      name: '',
      family: '',
      nationalCode: null,
      birthday: null,
      phoneNumber: null,
      accountNumber: null,
      ShabaNumber: null,
      average: null,
      money: null,
      RepaymentPeriod: '',
      installmentsNumber: null,
      monthlyInstallment: null,
      annualInterestPercentage: null,
      lateFeeAmount: null,
    },
    resolver: yupResolver(validationSchema),
  });
  const {
    step,
    facilitie,
    money,
    installmentsNumber,
    annualInterestPercentage,
  } = watch();
  console.log({ installmentsNumber, money, annualInterestPercentage });

  useEffect(() => {
    const penalty = data.find((d) => d.name === facilitie)?.penaltyRate;
    const interest = data.find((d) => d.name === facilitie);
    const iterestP = interest?.interestRate ?? interest?.percentageRate;

    if (facilitie) {
      const priod = data.find((d) => d.name === facilitie)?.repaymentType;
      setPriodR(priod!);
    }

    setValue('annualInterestPercentage', iterestP);
    if (money && penalty && step === 'REFUND') {
      setValue('lateFeeAmount', (penalty / 100) * money);
    }
    if (installmentsNumber && iterestP && money) {
      setValue(
        'monthlyInstallment',
        (money + money * (iterestP / 100)) / installmentsNumber
      );
    }
  }, [
    money,
    step,
    facilitie,
    annualInterestPercentage,
    installmentsNumber,
    setValue,
  ]);

  const onSubmit = handleSubmit(async (data) => {
    const { step, ...rest } = data;

    if (step === 'USER_INFO') {
      setValue('step', 'BANK_INFO');
      return;
    }
    if (step === 'BANK_INFO') {
      setValue('step', 'REFUND');
      return;
    }

    const existingData = JSON.parse(localStorage.getItem('data') || '[]');
    const updatedData = [...existingData, rest];

    localStorage.setItem('data', JSON.stringify(updatedData));
    alert('اطلاعات با موفقیت ذخیره شد!');
    setValue('step', 'USER_INFO');
    reset();
  });

  const handleBack = () => {
    switch (step) {
      case 'BANK_INFO':
        setValue('step', 'USER_INFO');
        break;
      case 'REFUND':
        setValue('step', 'BANK_INFO');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.test}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col max-w-[700px] w-full min-w-[700px]"
      >
        {(() => {
          switch (step) {
            case 'USER_INFO':
              return (
                <div style={{ direction: 'rtl' }}>
                  <div>
                    <label htmlFor="facilitie">تسهیلات</label>
                    <select id="facilitie" {...register('facilitie')}>
                      {data.map((t) => (
                        <option value={t.name}>{t.name}</option>
                      ))}
                    </select>
                    {errors.facilitie && (
                      <p className={styles['error-message']}>
                        {errors.facilitie.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name">نام</label>
                    <input
                      id="name"
                      {...register('name', {
                        required: 'name is required',
                      })}
                    />
                    {errors.name && (
                      <p className={styles['error-message']}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="family">نام خانوادگی</label>
                    <input id="family" {...register('family')} />
                    {errors.family && (
                      <p className={styles['error-message']}>
                        {errors.family.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="nationalCode"> کد ملی</label>
                    <input id="nationalCode" {...register('nationalCode')} />
                    {errors.nationalCode && (
                      <p className={styles['error-message']}>
                        {errors.nationalCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="birthday">تاریخ تولد</label>
                    <input
                      id="birthday"
                      type="date"
                      {...register('birthday')}
                    />
                    {errors.birthday && (
                      <p className={styles['error-message']}>
                        {errors.birthday.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">شماره موبایل</label>
                    <input id="phoneNumber" {...register('phoneNumber')} />
                    {errors.phoneNumber && (
                      <p className={styles['error-message']}>
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            case 'BANK_INFO':
              return (
                <div style={{ direction: 'rtl' }}>
                  <div>
                    <label htmlFor="accountNumber">شماره حساب</label>
                    <input id="accountNumber" {...register('accountNumber')} />
                    {errors.accountNumber && (
                      <p className={styles['error-message']}>
                        {errors.accountNumber?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="ShabaNumber">شماره َشبا</label>
                    <input id="ShabaNumber" {...register('ShabaNumber')} />
                    {errors.ShabaNumber && (
                      <p className={styles['error-message']}>
                        {errors.ShabaNumber?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="average">
                      میانگین ریالی موجودی سالیانه
                    </label>
                    <input id="average" {...register('average')} />
                    {errors.average && (
                      <p className={styles['error-message']}>
                        {errors.average?.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            case 'REFUND':
              return (
                <div style={{ direction: 'rtl' }}>
                  <div>
                    <label htmlFor="money">مبلغ</label>
                    <input id="money" {...register('money')} />
                    {errors.money && (
                      <p className={styles['error-message']}>
                        {errors.money?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="RepaymentPeriod">مدت زمان بازپرداخت</label>

                    <select
                      id="RepaymentPeriod"
                      {...register('RepaymentPeriod')}
                    >
                      {priodR.map((t) => (
                        <option value={t.name}>{t.name}</option>
                      ))}
                    </select>
                    {errors.RepaymentPeriod && (
                      <p className={styles['error-message']}>
                        {errors.RepaymentPeriod?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="installmentsNumber">تغداد اقساط </label>
                    <input
                      id="installmentsNumber"
                      {...register('installmentsNumber')}
                    />
                    {errors.installmentsNumber && (
                      <p className={styles['error-message']}>
                        {errors.installmentsNumber?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="monthlyInstallment">مبلغ قسط ماهیانه</label>
                    <input
                      id="monthlyInstallment"
                      disabled
                      {...register('monthlyInstallment')}
                    />
                    {errors.monthlyInstallment && (
                      <p className={styles['error-message']}>
                        {errors.monthlyInstallment?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="annualInterestPercentage">
                      درصد سود سالیانه
                    </label>
                    <input
                      id="annualInterestPercentage"
                      disabled
                      {...register('annualInterestPercentage')}
                    />
                    {errors.annualInterestPercentage && (
                      <p className={styles['error-message']}>
                        {errors.annualInterestPercentage?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lateFeeAmount">مبلغ جریمه دیرکرد</label>
                    <input
                      id="lateFeeAmount"
                      disabled
                      {...register('lateFeeAmount')}
                    />
                    {errors.lateFeeAmount && (
                      <p className={styles['error-message']}>
                        {errors.lateFeeAmount?.message}
                      </p>
                    )}
                  </div>
                </div>
              );
          }
        })()}
        <div className={styles['buttons-container']}>
          <button type="button" className={styles.button} onClick={handleBack}>
            برگشت
          </button>
          <button type="submit" className={styles.button}>
            بعدی
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
