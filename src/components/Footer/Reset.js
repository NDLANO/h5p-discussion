import React, {Fragment, useState} from 'react';
import Popover from "../Popover/Popover";
import {useDiscussionContext} from "context/DiscussionContext";

function Reset() {

  const [showPopover, setPopover] = useState(false);
  const discussionProcessContext = useDiscussionContext();

  function togglePopover() {
    setPopover(!showPopover);
  }

  function confirmReset() {
    reset();
    togglePopover();
  }

  const {
    behaviour: {
      enableRetry = false
    },
    reset,
    translations
  } = discussionProcessContext;

  return (
    <Fragment>
      {enableRetry === true && (
        <Popover
          handleClose={togglePopover}
          show={showPopover}
          classnames={Array.from(discussionProcessContext.activeBreakpoints)}
          close={translations.close}
          header={translations.restart}
          align={"start"}
          popoverContent={(
            <div
              role={"dialog"}
              aria-labelledby={"resetTitle"}
              className={"h5p-discussion-reset-modal"}
            >
              <div
                id={"resetTitle"}
              >
                {translations.ifYouContinueAllYourChangesWillBeLost}
              </div>
              <div>
                <button
                  onClick={confirmReset}
                  className={"continue"}
                  type={"button"}
                >
                  {translations.continue}
                </button>
                <button
                  onClick={togglePopover}
                  className={"cancel"}
                  type={"button"}
                >
                  {translations.cancel}
                </button>
              </div>
            </div>
          )}
        >
          <button
            className={"h5p-discussion-button-restart"}
            onClick={togglePopover}
            type={"button"}
          >
            <span
              className={"h5p-ri hri-restart"}
              aria-hidden={"true"}
            />
            {translations.restart}
          </button>
        </Popover>
      )}
    </Fragment>
  );
}

export default Reset;