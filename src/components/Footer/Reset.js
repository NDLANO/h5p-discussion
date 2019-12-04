import React, {Fragment, useContext, useState} from 'react';
import Popover from "../Popover/Popover";
import {DiscussionContext} from "context/DiscussionContext";

function Reset() {

    const [showPopover, setPopover] = useState(false);
    const discussionProcessContext = useContext(DiscussionContext);

    function togglePopover(){
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
                                >
                                    {translations.continue}
                                </button>
                                <button
                                    onClick={togglePopover}
                                    className={"cancel"}
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