import React from 'react';
import Title from '../../../Components/TItle/Title';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddCategory = () => {
    
    const axiosSecure = useAxiosSecure();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const form = e.target;

       
        const categoryInfo = {
            category: form.category.value
        };
        const categoryRes = await axiosSecure.post('/categories', categoryInfo);
        if (categoryRes.data.insertedId) {
            form.reset();
            Swal.fire({
                title: "Category Added Successfully",
                confirmButtonText: "Okay",
                customClass: {
                    confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                },
                buttonsStyling: false
            });

        }
    }
    return (
        <div className='min-h-screen'>
            <Title heading="Add Category"></Title>
            <div className="flex items-center justify-center p-5">
                <form onSubmit={handleAddCategory} className="space-y-4 flex flex-col justify-center">
                    <label className="block text-sky-400 font-medium">Category</label>
                    <input
                        type="text"
                        name='category'
                        placeholder="Type the Category"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <input className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" type="submit" value="Add Category" />
                </form>
            </div>
        </div>
    );
};

export default AddCategory;