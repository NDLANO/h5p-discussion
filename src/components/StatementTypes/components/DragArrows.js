import React, {useContext} from 'react';
import {DiscussionContext} from "context/DiscussionContext";

function DragArrows() {
    const context = useContext(DiscussionContext);

    return (
        <div className={"h5p-discussion-drag-element"}>
             <span
                 className="h5p-ri hri-move"
                 aria-hidden={"true"}
             />
            <span className={"visible-hidden"}>{context.translations.drag}</span>
        </div>
    );
}

export default DragArrows;