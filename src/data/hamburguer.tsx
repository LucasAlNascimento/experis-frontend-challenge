import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMenu } from '../redux/slice/menu';
import { openMenuDetail } from '../redux/slice/menu-detail';

import { Menu, MenuItem } from '../interfaces/menu';
import MenuDetail from '../components/MenuDetail/menu-detail';

import { IoIosArrowUp } from "react-icons/io";



const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
        return description;
    }
    return description.slice(0, maxLength) + '...';
};

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
};

export default function HamburguerData() {

    const dispatch: AppDispatch = useDispatch();
    const { isLoading, data, isError } = useSelector((state: RootState) => state.menu);
    const searchTerm = useSelector((state: RootState) => state.search.term)

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

    const handleItemClick = (item: MenuItem) => {
        dispatch(openMenuDetail(item));
      };

    const filteredBurgers: MenuItem[] = [];
    menuData.forEach(menu => {
        menu.sections.forEach(section => {
            if (section.name === 'Burgers') {
                filteredBurgers.push(...section.items);
            }
        });
    });

    const filteredItems = filteredBurgers.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))



    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-row justify-between'>
                <h2 className='ml-5 text-2xl font-medium'>Burgers</h2>
                <button className='mr-5 text-3xl'><IoIosArrowUp /></button>
            </div>
            <ul>

                {filteredItems.map((item: MenuItem) => (
                    <li key={item.id} onClick={() => handleItemClick(item)} className='flex p-5 mb-10 justify-between w-full h-auto cursor-pointer hover:bg-gray-100 hover:scale-95 hover:rounded-md hover:transition-all hover:ease-in-out hover:duration-500 duration-500'>
                        <div className='flex flex-col w-full'>
                            <h4 className='font-medium'>{item.name}</h4>
                            <p className='text-[#464646] font-light'>{truncateDescription(item.description, 58)}</p>
                            <p>{formatPrice(item.price)}</p>
                        </div>
                        <img src={item.images[0].image} className='rounded-md w-40' />

                    </li>
                ))}
            </ul>
            <MenuDetail />
        </div>
    );
}