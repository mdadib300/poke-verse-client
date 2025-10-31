import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Title from "../../../Components/TItle/Title";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { title, price } = useLoaderData();
    const product = useLoaderData();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const res = await axiosSecure.get("/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = { image: form.image.files[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);

        const sizesTogether = e.target.sizes.value;
        const sizes = sizesTogether.split(',').map(size => size.trim());
        const colorsTogether = e.target.colors.value;
        const colors = colorsTogether.split(',').map(color => color.trim());
        const priceString = form.price.value;
        const priceInt = parseInt(priceString);
        const productInfo = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            price: priceInt,
            sizes: sizes,
            colors: colors,
            imageLink: res.data.data.display_url
            // image1: form.image1.value,
            // image2: form.image2.value,
            // image3: form.image3.value
        };
        axiosSecure.patch(`/products/${product._id}`, productInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    form.reset();
                    Swal.fire({
                        title: "Product Updated Successfully",
                        confirmButtonText: "Okay",
                        customClass: {
                            confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                        },
                        buttonsStyling: false
                    });
                    navigate('/dashboard/manageProducts');
                }
            })
    }

    return (
        <div>
            <Title heading="Update Product"></Title>
            <div className="flex items-center justify-center p-5">
                <form onSubmit={handleUpdateProduct} className="space-y-4 flex flex-col justify-center">
                    <label className="block text-sky-400 font-medium">Product Title</label>
                    <input
                        type="text"
                        name='title'
                        defaultValue={title}
                        placeholder="Product Title"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <label className="block text-sky-400 font-medium mt-3">Product Description</label>
                    <textarea className="textarea w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3" name="description" placeholder="Product Description"></textarea>
                    <label className="block text-sky-400 font-medium">Product Category</label>
                    <select defaultValue="Select Category" name="category" required className="select">
                        <option disabled={true}>Select Category</option>
                        {
                            categories.map((category, index) => <option key={index}>{category.category}</option>)
                        }
                    </select>
                    <label className="block text-sky-400 font-medium">Price</label>
                    <input
                        type="number"
                        name='price'
                        defaultValue={price}
                        required
                        placeholder="Price"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Sizes</label>
                    <input
                        type="text"
                        name='sizes'
                        placeholder="S, M, L, XL"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Colors</label>
                    <input
                        type="text"
                        name='colors'
                        placeholder="Blue, White, Black"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <label className="block text-sky-400 font-medium">Product Image</label>
                    <input type="file" name="image" required className="file-input" />

                    <input className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" type="submit" value="Update" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;