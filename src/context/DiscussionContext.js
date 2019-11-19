import React from 'react';

export const DiscussionContext = React.createContext({
    params: {},
    behaviour: {},
    id: null,
    language: 'en',
    translations: {},
    registerReset: () => {},
    reset: () => {},
    collectExportValues: () => {},
});
