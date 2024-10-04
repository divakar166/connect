"use client";

import { BeatLoader } from 'react-spinners';
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token || !type) {
      setError("Missing token!");
      return;
    }
    newVerification(token, type)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, type, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/developer/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        {success && (
          <FormSuccess message={success} />
        )}
        {error && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
