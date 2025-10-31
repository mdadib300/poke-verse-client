import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";

const AddCoupon = () => {
    const axiosSecure = useAxiosSecure();

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value.toUpperCase();
        const discountPercent = parseFloat(form.discountPercent.value);
        const newCoupon = { code, discountPercent };

        try {
            const res = await axiosSecure.post("/coupons", newCoupon);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Coupon Added!",
                    text: `Code: ${code} (${discountPercent}% off)`,
                    icon: "success",
                    confirmButtonColor: "#262626",
                });
                form.reset();
            }
        } catch (err) {
            if (err.response?.status === 400) {
                Swal.fire("Error", "Coupon code already exists!", "error");
            } else {
                Swal.fire("Error", "Failed to add coupon!", "error");
            }
        }
    };

    return (
        <div className="p-5">
            <Title heading="Add a Coupon"></Title>
            <div className="flex items-center justify-center p-5">
                <form onSubmit={handleAddCoupon} className="space-y-4 flex flex-col justify-center">
                    <input
                        type="text"
                        name="code"
                        placeholder="Coupon Code (e.g. SAVE10)"
                        required
                        className="input border border-sky-400 text-sky-400 bg-white"
                    />
                    <input
                        type="number"
                        name="discountPercent"
                        placeholder="Discount %"
                        required
                        min="1"
                        max="100"
                        className="input border border-sky-400 text-sky-400 bg-white"
                    />
                    <input type="submit" value="Add Coupon" className="px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium hover:bg-sky-400 hover:text-white" />
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
