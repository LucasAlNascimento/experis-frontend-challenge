import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slice/modal";
import { AppDispatch } from "../../redux/store";
import Basket from "../Basket/basket";
import { RootState } from "../../redux/store";
import { BasketItem } from "../../interfaces/basket";

export default function Footer() {
    const dispatch: AppDispatch = useDispatch();
    const openBasket = () => {
        dispatch(openModal());
    };

    const items = useSelector((state: RootState) => state.basket.items);

    const totalItems = items.reduce((total:number, item:BasketItem) => total + item.quantity, 0);

    return (
        <footer className="flex flex-col">
            <div className="flex flex-col items-center justify-center w-full h-16 px-6 bg-gray-100 border border-gray-200">
                <div className="flex items-center justify-center w-full bg-white rounded-lg font-bold underline cursor-pointer">View allergy information</div>
            </div>
            <div>
                <div className="flex w-full h-20 bg-gray-100 px-6 pt-2 pb-6">
                    <button onClick={openBasket} className="w-full items-center justify-center h-12 bg-[#4F372F] rounded-3xl text-white"> {`Your basket • ${totalItems} item${totalItems !== 1 ? 's' : ''}`}</button>
                </div>
                <Basket />
            </div>
        </footer>
    )
}