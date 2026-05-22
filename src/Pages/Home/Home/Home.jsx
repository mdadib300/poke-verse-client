import DisplayCategories from './DisplayCategories/DisplayCategories';
import Slider from './Slider/Slider';
import NewIn from './NewIn/NewIn';
import AllCategoryProducts from './AllCategoryProducts/AllCategoryProducts';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <DisplayCategories></DisplayCategories>
            <NewIn></NewIn>
            <AllCategoryProducts></AllCategoryProducts>
        </div>
    );
};

export default Home;