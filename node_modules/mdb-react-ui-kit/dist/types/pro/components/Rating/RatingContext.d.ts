import React from 'react';
interface RatingProps {
    activeItem: number | undefined;
    dynamic: boolean | undefined;
    dynamicStyle: {
        color: string;
        icon: string;
    };
    setDynamicStyle: React.SetStateAction<any>;
    setActiveItem: React.SetStateAction<any>;
    hoveredItem: number;
    setHoveredItem: React.SetStateAction<any>;
    readonly: boolean;
    onChange?: (value: number) => void;
}
declare const RatingContext: React.Context<RatingProps>;
export { RatingContext };
