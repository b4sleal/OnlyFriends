import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.scss';
import ProfileCard from './ProfileCard';

export const MatchingCarousel = () => {
    const numberOfSlides = 5;

    return (
        <Carousel
            plugins={[
                'centered',
                'infinite',
                'arrows',
                {
                    resolve: slidesToShowPlugin,
                    options: {
                        numberOfSlides: numberOfSlides
                    },
                },
            ]}
        >
            // Later we can use map
            <ProfileCard></ProfileCard>
            <ProfileCard></ProfileCard>

        </Carousel>

    );
}


