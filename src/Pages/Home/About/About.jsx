import Title from '../../../Components/TItle/Title';
import aboutImg from '../../../assets/profile.jpg';

const About = () => {
    return (
        <div className='px-5 lg:px-30'>
            <Title heading="About Us"></Title>





            <div className='lg:flex justify-center items-center mb-10'>
                <div>
                    <div>
                        <p className='text-xl text-sky-400'>Welcome to Pokeverse — your ultimate online destination for anime-inspired
                            merchandise and collectibles!</p>
                    </div>
                    <br />
                    <div>
                        <h1 className='text-xl text-sky-400 font-semibold'>Who We Are:</h1>
                        <ul className='text-xl text-sky-400'>
                            <li><p>• Founded by Shishir Ahamed, owner of Pokexel and member of the Bangladesh Anime Podcast.</p></li>
                            <li><p>• One of the original founders of Pokeverse, built by anime fans for anime fans.</p></li>
                        </ul>
                    </div>
                    <br />
                    <div>
                        <h1 className='text-xl text-sky-400 font-semibold'>What We Do:</h1>
                        <ul className='text-xl text-sky-400'>
                            <li><p>• Offer a wide range of anime-themed products, apparel, and collectibles</p></li>
                            <li><p>• Celebrate anime culture and bring the community closer through creativity and passion.</p></li>
                        </ul>
                    </div>
                    <br />
                    <div>
                        <h1 className='text-xl text-sky-400 font-semibold'>Our Mission:</h1>
                        <ul className='text-xl text-sky-400'>
                            <li><p>• To connect Bangladeshi anime fans with authentic, high-quality anime products they’ll love.</p></li>
                            <li><p>• Celebrate anime culture and bring the community closer through creativity and passion.</p></li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center w-full lg:w-2/5">
                    <div className="text-sky-400 text-xl text-center ml-0 lg:ml-5">
                        <img src={aboutImg} className="w-3/4 rounded-md mx-auto mt-8 lg:mt-0" />
                        <br />
                        <p>Shishir Ahmed</p>
                        <p>Founder: Pokexel, Co-Founder: PokéVerse</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;