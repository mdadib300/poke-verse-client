import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Title from "../../../Components/TItle/Title";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {
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

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;

        // ✅ Require at least one image, others optional
        const imageFiles = [form.image1.files[0], form.image2.files[0], form.image3.files[0]].filter(Boolean);

        if (imageFiles.length === 0) {
            Swal.fire({
                title: "Image Required",
                text: "Please upload at least one product image.",
                icon: "warning",
                confirmButtonText: "Okay",
                customClass: {
                    confirmButton: "bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded"
                },
                buttonsStyling: false
            });
            return;
        }

        // ✅ Upload images to imgbb
        const uploadedImages = [];
        for (const file of imageFiles) {
            const formData = new FormData();
            formData.append("image", file);
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: { "content-type": "multipart/form-data" },
            });
            uploadedImages.push(res.data.data.display_url);
        }

        const sizes = form.sizes.value.split(",").map(size => size.trim()).filter(Boolean);
        const colors = form.colors.value.split(",").map(color => color.trim()).filter(Boolean);
        const priceInt = parseInt(form.price.value);

        const productInfo = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            price: priceInt,
            sizes,
            colors,
            images: uploadedImages,
        };

        const productRes = await axiosSecure.post("/products", productInfo);

        if (productRes.data.insertedId) {
            form.reset();
            Swal.fire({
                title: "Product Added Successfully",
                confirmButtonText: "Okay",
                customClass: {
                    confirmButton: "bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded"
                },
                buttonsStyling: false
            });
        }
    };

    return (
        <div>
            <Title heading="Add Product" />
            <div className="flex items-center justify-center p-5">
                <form onSubmit={handleAddProduct} className="space-y-4 flex flex-col justify-center">
                    <label className="block text-sky-400 font-medium">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Product Description</label>
                    <textarea
                        name="description"
                        placeholder="Product Description"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 p-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    ></textarea>

                    <label className="block text-sky-400 font-medium mt-3">Product Category</label>
                    <select name="category" required className="select">
                        <option disabled selected>
                            Select Category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index}>{category.category}</option>
                        ))}
                    </select>

                    <label className="block text-sky-400 font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        placeholder="Price"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 p-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Sizes</label>
                    <input
                        type="text"
                        name="sizes"
                        placeholder="S, M, L, XL"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 p-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Colors</label>
                    <input
                        type="text"
                        name="colors"
                        placeholder="Blue, White, Black"
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 p-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />

                    <label className="block text-sky-400 font-medium mt-3">Product Photos</label>
                    <input type="file" name="image1" required className="file-input" />
                    <input type="file" name="image2" className="file-input" />
                    <input type="file" name="image3" className="file-input" />

                    <input
                        className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium hover:bg-sky-400 hover:text-white"
                        type="submit"
                        value="Add Product"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
