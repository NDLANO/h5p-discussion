import React, {useState} from 'react';
import classnames from 'classnames';
import {useDiscussionContext} from 'context/DiscussionContext';

function Summary() {

  const context = useDiscussionContext();
  const [comment, setComment] = useState('');

  const {
    registerReset,
    collectExportValues,
    translate,
    params: {
      summaryHeader,
      summaryInstruction,
    }
  } = context;

  collectExportValues('summary', () => comment);
  registerReset(() => setComment(''));

  return (
    <div
      className={classnames('h5p-discussion-summary')}
      aria-labelledby={"summary-header"}
    >
      <label
        id={"summary-header"}
        htmlFor={'summary'}
      >
        <h2>{summaryHeader ? summaryHeader : translate('summary')}</h2>
      </label>
      {summaryInstruction && (
        <p>{summaryInstruction}</p>
      )}
      <textarea
        id={"summary"}
        placeholder={translate('typeYourReasonsForSuchAnswers')}
        value={comment}
        onChange={event => setComment(event.target.value)}
        aria-label={translate('typeYourReasonsForSuchAnswers')}
      />
    </div>
  );
}

export default Summary;
