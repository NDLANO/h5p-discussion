import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';

function Column(props) {
    const {
        droppableId,
        children,
        additionalClassName,
    } = props;

    return (
        <div
            className={additionalClassName}
        >
            <Droppable
                droppableId={droppableId}
            >
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classnames("h5p-discussion-column", {
                                "h5p-discussion-drag-active": snapshot.isDraggingOver && snapshot.draggingFromThisWith === null
                            })}
                        >
                            {children}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}

Column.propTypes = {
    droppableId: PropTypes.string.isRequired,
    additionalClassName: PropTypes.string,
};

Column.defaultProps = {
    droppableId: null,
    additionalClassName: null,
};

export default Column;
