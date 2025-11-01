import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useSliders from '../../../../hooks/useSliders';

const Slider = () => {

    const [sliders] = useSliders();

    return (
        <div>
            <Carousel
                autoPlay={true}
                interval={10000}
                infiniteLoop={true}
                stopOnHover={false}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
            >
                {
                    sliders.map((slider, index)=><div
                    key={index}
                    className="hero h-[200px] md:h-[390px] lg:h-[550px]"
                    style={{
                        backgroundImage:
                            `url(${slider.image})`,
                    }}
                >
                </div>)
                }
            </Carousel>
        </div>
    );
};

export default Slider;