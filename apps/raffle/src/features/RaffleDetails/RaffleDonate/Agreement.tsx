import { useEffect, useState } from 'react';

import { Button, Checkbox, Field, FieldLabel, StyledTextPreview } from '@ergo-raffle/ui-kit';

import { useDonate } from '@/hooks';
import { markdownToHtml } from '@/lib';

export const Agreement = () => {
  const { agreementChecked, setAgreementChecked, setIsFallbackDialogOpen, setAgreementDialogOpen } =
    useDonate();

  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/docs/privacy-notice.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <>
      <div className="-mx-4 no-scrollbar max-h-[80vh] lg:max-h-50 overflow-y-auto px-4">
        <StyledTextPreview
          className="bg-gray-5 p-4 prose prose-neutral max-w-none"
          text={markdownToHtml(content)}
        />
      </div>
      <Field orientation="horizontal" className="mt-4">
        <Checkbox
          checked={agreementChecked}
          onClick={() => setAgreementChecked(!agreementChecked)}
        />
        <FieldLabel>
          I understand that my donation is permanent, controlled entirely by smart contracts, and
          cannot be refunded if the raffle succeeds.
        </FieldLabel>
      </Field>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setAgreementChecked(false);
            setAgreementDialogOpen(false);
          }}
          className="min-w-35"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setAgreementDialogOpen(false);
            setIsFallbackDialogOpen(true);
          }}
          disabled={!agreementChecked}
          variant="primary"
          className="min-w-35"
        >
          Ok
        </Button>
      </div>
    </>
  );
};
