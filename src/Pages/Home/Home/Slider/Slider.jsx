import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import useSliders from '../../../../hooks/useSliders';
import slider1 from '../../../../assets/slider/website cover-1.jpg';
import slider2 from '../../../../assets/slider/website cover-2.jpg';
import slider3 from '../../../../assets/slider/website cover-3.jpg';

const Slider = () => {

    // const [sliders] = useSliders();

    return (
        <div>
            <Carousel
                autoPlay={true}
                interval={10000}
                infiniteLoop={true}
                stopOnHover={false}
                showThumbs={false}
                showStatus={false}
            >

                <div
                    className="hero h-[200px] md:h-[390px] lg:h-[550px]"
                    style={{
                        backgroundImage:
                            `url(${slider1})`,
                    }}
                >
                </div>
                <div
                    className="hero h-[200px] md:h-[390px] lg:h-[550px]"
                    style={{
                        backgroundImage:
                            `url(${slider2})`,
                    }}
                >
                </div>
                <div
                    className="hero h-[200px] md:h-[390px] lg:h-[550px]"
                    style={{
                        backgroundImage:
                            `url(${slider3})`,
                    }}
                >
                </div>


            </Carousel>
        </div>
    );
};

export default Slider;