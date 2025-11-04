import Swal from "sweetalert2";
import useSliders from "../../../hooks/useSliders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";


const ManageSliders = () => {
    const [sliders, , refetch] = useSliders();
    const axiosSecure = useAxiosSecure();

    const handleDeleteSlider = (slider) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/sliders/${slider._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted",
                        text: "Your product has been deleted.",
                        confirmButtonColor: "#262626"
                    });
                }
            }
        });
    }
    return (
        <div className='min-h-screen'>
            <Title heading="Manage Sliders"></Title>
            <div>
                <div className="overflow-x-auto flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                        {
                            sliders.slice().reverse().map(slider =>
                                <div key={slider._id} className="card bg-white w-80 lg:w-96 shadow-md">
                                    <figure>
                                        <img
                                            src={slider.image} />
                                    </figure>
                                    <div className="card-body">
                                        <button onClick={() => handleDeleteSlider(slider)} className="px-4 py-2 rounded-lg border border-red-600 bg-red-100 text-red-600 font-medium transition-all duration-200 hover:bg-red-600 hover:text-white">Delete Image</button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ManageSliders;