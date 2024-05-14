import React from 'react';

const SpecialOffersModal = ({ closeModal }) => {
    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal-background')) {
            closeModal();
        }
    };

    return (
        <div className="z-[4] fixed inset-0 flex items-center justify-center modal-background bg-black bg-opacity-50" onClick={handleModalClick}>
            <div className="bg-cover h-72 w-2/5 bg-center bg-no-repeat bg-opacity-50 bg-white p-8 rounded-lg max-w-md relative modal-content" style={{ backgroundImage: "url('https://i.ibb.co/nwC3sSW/villa1.jpg')" }}>
                <button
                    onClick={closeModal}
                    className="absolute top-0 border-2 rounded-full px-2 border-gray-800 font-bold text-red-600 right-0 m-4 t hover:text-red-800 focus:outline-none"
                >
                    &times;
                </button>
                <div className="absolute bottom-3 left-0 right-0 text-center ">
                    <h2 className="text-2xl font-bold w-fit mx-auto rounded-md p-1 bg-slate-400 text-red-500">Special Offers and Promotions</h2>
                    <p className="text-lg w-fit mx-auto rounded-b-md p-1 bg-slate-400 text-red-500">Upto 35% Offers</p>
                    <p className="text-lg text-green-500 font-semibold bg-gray-700 mt-2">Check out our latest deals!</p>

                </div>
            </div>
        </div>
    );
};

export default SpecialOffersModal;
