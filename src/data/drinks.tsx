import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMenu } from '../redux/slice/menu';
import { openMenuDetail } from '../redux/slice/menu-detail';

import { Menu, MenuItem } from '../interfaces/menu';
import MenuDetail from '../components/MenuDetail/menu-detail';

import { IoIosArrowUp } from "react-icons/io";

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
};

export default function DrinksData() {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, data, isError } = useSelector((state: RootState) => state.menu);
    const searchTerm = useSelector((state: RootState) => state.search.term);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const menuData: Menu[] = Array.isArray(data) ? data : [data];

    const filteredDrinks: MenuItem[] = [];
    menuData.forEach(menu => {
        menu.sections.forEach(section => {
            if (section.name === 'Drinks') {
                filteredDrinks.push(...section.items);
            }
        });
    });

    const filteredItems = filteredDrinks.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleItemClick = (item: MenuItem) => {
        dispatch(openMenuDetail(item));
    };

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-row justify-between'>
                <h2 className='ml-5 text-2xl font-medium'>Drinks</h2>
                <button className='mr-5 text-3xl'><IoIosArrowUp /></button>
            </div>
            <ul>
                {filteredItems.map((item: MenuItem) => (
                    <li key={item.id} onClick={() => handleItemClick(item)} className='flex mb-7 p-5 justify-between w-full h-auto cursor-pointer hover:bg-gray-100 hover:scale-95 hover:rounded-md hover:transition-all hover:ease-in-out hover:duration-500 duration-500'>
                        <div className='flex flex-col w-full'>
                            <h4 className='font-medium'>{item.name}</h4>
                            <p className='text-[#464646] font-light'>{item.description}</p>
                            <p>{formatPrice(item.price)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <MenuDetail />
        </div>
    );
}
