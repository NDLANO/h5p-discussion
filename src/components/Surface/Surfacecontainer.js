import React, {useReducer, useState, useContext, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {getBox, Position, withScroll} from 'css-box-model';
import {DiscussionContext} from '../../context/DiscussionContext';
import Summary from "../Summary/Summary";
import {DragDropContext} from "react-beautiful-dnd";
import * as tweenFunctions from "tween-functions";
import Category from "../Categories/Category";
import {isMobile} from 'react-device-detect';

function ArgumentDataObject(initValues) {
    this.id = null;
    this.added = false;
    this.argumentText = null;
    this.editMode = false;
    return Object.assign(this, initValues);
}

function CategoryDataObject(initValues) {
    this.id = null;
    this.title = null;
    this.connectedArguments = [];
    this.isArgumentDefaultList = false;
    this.theme = 'h5p-discussion-category-default';
    this.useNoArgumentsPlaceholder = false;
    return Object.assign(this, initValues);
}

function Surfacecontainer() {

    const [categories, setCategories] = useState([]);
    const context = useContext(DiscussionContext);

    let api;
    const autoDragSensor = value => {
        api = value;
    };

    const {
        collectExportValues,
        registerReset,
        translate
    } = context;

    registerReset(init);
    collectExportValues('userInput', () => categories);

    useEffect(() => {
        init();
        context.trigger('resize');
    }, []);

    function init() {
        const {
            params: {
                argumentsList = [],
            },
            behaviour: {
                randomizeArguments = true,
            }
        } = context;

        if (randomizeArguments === true) {
            argumentsList.sort(() => 0.5 - Math.random());
        }

        const categories = [];
        categories.push(new CategoryDataObject({
            id: 'unprocessed',
            isArgumentDefaultList: true,
            connectedArguments: argumentsList.map((argument, index) => (new ArgumentDataObject({
                id: index,
                argumentText: argument,
            })))
        }));
        categories.push(new CategoryDataObject({
            id: 'pro',
            theme: 'h5p-discussion-pro',
            useNoArgumentsPlaceholder: true,
            title: "Arguments FOR",
        }));
        categories.push(new CategoryDataObject({
            id: 'contra',
            theme: 'h5p-discussion-against',
            useNoArgumentsPlaceholder: true,
            title: "Arguments AGAINST",
        }));

        setCategories(categories);
    }

    function onDropEnd(dragResult) {
        let {
            combine,
            destination,
            source,
        } = dragResult;

        if (!combine && !destination) {
            return;
        }

        if (destination !== null && destination.droppableId === source.droppableId) {
            return;
        }

        const newCategories = Array.from(categories);
        const movedArgument = newCategories[newCategories.findIndex(category => category.id === source.droppableId)].connectedArguments.splice(source.index, 1);
        newCategories[newCategories.findIndex(category => category.id === destination.droppableId)].connectedArguments.splice(destination.index, 0, movedArgument[0]);
        setCategories(newCategories);
    }

    function moveStepByStep(drag, values) {
        requestAnimationFrame(() => {
            const newPosition = values.shift();
            drag.move(newPosition);

            if (values.length) {
                moveStepByStep(drag, values);
            } else {
                drag.drop();
                scroll(newPosition);
            }
        });
    }

    function scroll(position) {
        const frame = window.frameElement ? parent : window;
        frame.scrollTo({
            top: position.y,
            behavior: 'smooth',
        });
    }

    const starting = function start(draggableElement, id, target) {
        const targetContainer = getBox(document.getElementsByClassName(target)[0]);

        const preDrag = api.tryGetLock(id);
        if (!preDrag) {
            return;
        }
        const dragElement = getBox(draggableElement);
        const start = dragElement.borderBox.center;
        const end = targetContainer.borderBox.center;
        const drag = preDrag.fluidLift(start);

        const points = [];
        const numberOfPoints = 10;
        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: tweenFunctions.easeOutCirc(i, start.x, end.x, numberOfPoints),
                y: tweenFunctions.easeOutCirc(i, start.y, end.y, numberOfPoints)
            });
        }

        moveStepByStep(drag, points);
    };

    return (
        <div
            className="h5p-discussion-surface"
        >
            <DragDropContext
                onDragEnd={onDropEnd}
                //onDragUpdate={onDropUpdate}
                //onDragStart={onDragStart}
                sensors={[autoDragSensor]}
            >
                {categories.map(category => (
                    <Category
                        key={category.id}
                        droppableId={category.id}
                        includeHeader={category.title !== null}
                        title={category.title}
                        argumentsList={category.connectedArguments}
                        additionalClassName={[category.theme]}
                        useNoArgumentsPlaceholder={category.useNoArgumentsPlaceholder}
                        onMove={(event, index, target) => starting(event, index, target)}
                    />
                ))}
            </DragDropContext>
            <Summary
                reset={registerReset}
                exportValues={collectExportValues}
                translate={translate}
            />
        </div>
    );
}

export default Surfacecontainer;
