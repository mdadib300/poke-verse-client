import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddSlider = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const handleAddSlider = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = { image: form.image.files[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const sliderInfo = {
            image: res.data.data.display_url
        };
        const sliderRes = await axiosSecure.post('/sliders', sliderInfo);
        if (sliderRes.data.insertedId) {
            form.reset();
            Swal.fire({
                title: "Image Added Successfully",
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
            <div className="flex items-center justify-center p-5">
                <form onSubmit={handleAddSlider} className="space-y-4 flex flex-col justify-center">
                    <Title heading="Add Slider Image"></Title>
                    <input type="file" name="image" className="file-input" />
                    <input className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" type="submit" value="Add Slider" />
                </form>
            </div>
        </div>
    );
};

export default AddSlider;