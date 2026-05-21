import DisplayCategories from './DisplayCategories/DisplayCategories';
import Slider from './Slider/Slider';
import NewIn from './NewIn/NewIn';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <DisplayCategories></DisplayCategories>
            <NewIn></NewIn>
        </div>
    );
};

export default Home;