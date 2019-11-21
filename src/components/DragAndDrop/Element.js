import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import {Draggable} from "react-beautiful-dnd";

function Element(props) {

    const {
        children,
        draggableId,
        dragIndex,
        disableTransform
    } = props;

    return (
        <Draggable
            draggableId={draggableId}
            index={dragIndex}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        className={"h5p-discussion-draggable-container"}
                        //aria-label={getAriaLabel()}
                    >
                        <div
                            className={classnames("h5p-discussion-draggable-element", {
                                'h5p-discussion-no-transform': disableTransform,
                            })}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                        >
                            {children}
                        </div>
                    </div>
                )
            }}
        </Draggable>
    );
}

Element.propTypes = {
    draggableId: PropTypes.string,
    dragIndex: PropTypes.number,
    disableTransform: PropTypes.bool,
};

export default Element;