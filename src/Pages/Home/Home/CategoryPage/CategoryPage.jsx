import { useParams } from "react-router-dom";
import useProducts from "../../../../hooks/useProducts";
import Title from "../../../../Components/TItle/Title";
import ProductDisplay from "../../../../Components/ProductDisplay/ProductDisplay";
import BackBtn from "../../../../Components/BackBtn/BackBtn";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products] = useProducts();
    const categoryProducts = products.filter(product => product.category === categoryName);

    return (
        <div>
            <Title heading={categoryName}></Title>
            <ProductDisplay products={categoryProducts}></ProductDisplay>
            <BackBtn />
        </div>
    );
};

export default CategoryPage;
