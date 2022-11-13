import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import qs from 'qs'

import Catigories from "../components/Catigories";
import Sort from "../components/Sort";
import { arrSort } from '../components/Sort'
import PizzaBlock from "../components/PizzaBlockFolder/PizzaBlock";
import Skeleton from "../components/PizzaBlockFolder/PizzaBlockSkeleton";
import Pagination from '../components/Pagination';

import { setFilters } from "../redux/slices/filterSlice.js"
import { fetchPizza } from "../redux/slices/pizzasSlice.js"


function Home() {
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // выносим пиццы из Redux
    const { items, status } = useSelector((state) => state.pizzas);
    // 

    const getPizzas = async () => {
        const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
        // если в categoryIndex пришел индекс 0 то передать пустую строчку в сортировку по категориям, или если больше то индекс

        const sortBy = sort.sortProperty.replace('-', '');
        // ИЗ sort.sortProperty УДАЛИ (replace) минус ('-') если он будет или нет

        const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
        // ПРОВЕРь если в sort.sortProperty есть минус ('-') ТО ПУСТЬ БУДЕТ 'ask' если НЕТ то 'desc'

        dispatch(fetchPizza({
            pageCount, category, sortBy, order, searchValue,
        }));

        window.scrollTo(0, 0)
    }

    // состояния из фильтров
    const { searchValue, pageCount, sort, categoryIndex } = useSelector((state) => state.filter);
    // 


    console.log(sort);

    // урок №15. ничего не понятно
    // если изменили параметры и был первый рендер то, отработает условие
    React.useEffect(() => {
        if (isMounted.current) {
            const queryStr = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryIndex,
                pageCount,
            });
            navigate(`?${queryStr}`)
        }
        isMounted.current = true;
    }, [sort.sortProperty, categoryIndex, pageCount],)
    // 


    // 
    //если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе.
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sortingFilters = arrSort.find(obj => obj.sortProperty === params.sortProperty);

            console.log(sortingFilters, 'пришло в sortingFilters')
            dispatch(setFilters({
                ...params,
                sortingFilters,
            }),
            );
            isSearch.current = true;
        }
    },
        []);
    // substring = уберает символ из строки ("количество символов в начале", "количество символов в конце");
    // window.location.search = Свойство search интерфейса Location — это строка поиска, также называемая строкой запроса;
    // то есть строка, содержащая '?' за которыми следуют параметры URL.
    // 

    //если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [sort.sortProperty, categoryIndex, searchValue, pageCount],);
    // [] -- значит что useEffect есть зависимость и если эти значения поменяются то useEffect перевызовется

    const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />)
    const pizzasMap = items.map((object, index) => (
        <PizzaBlock key={index} {...object} />
    ))



    return (
        <div className="container">
            <div className="content__top">
                <Catigories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status == 'error' ?
                    (<div>
                        <h1>Извините, но произошла ошибка.</h1>
                        <p>питсы потерялись.</p>
                    </div>)
                    :
                    (status == 'loading' ? skeleton : <div className="content__items">{pizzasMap}</div>)
            }
            <Pagination />
        </div>
    )
}

export default Home;