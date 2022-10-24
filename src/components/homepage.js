import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const homepage = () => {
    const [cookies] = useCookies(['email']);

    return (
        <div className='swipe'>
            <header>Home</header>
            <div>
                <p> Matches </p>
            </div>
        </div>

    );
};