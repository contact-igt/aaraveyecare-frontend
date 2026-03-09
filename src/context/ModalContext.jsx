import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('default');

    const openPopup = (type = 'default') => {
        setPopupType(type);
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
        setPopupType('default');
    };

    return (
        <ModalContext.Provider value={{ isPopupOpen, popupType, openPopup, closePopup }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
