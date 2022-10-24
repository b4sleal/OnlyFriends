import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';

export const MainPage = () => {
    const [cookies] = useCookies(['email']);
    const navigate = useNavigate();

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            {cookies.email && navigate('/homepage')}
            <section className="page-card">

            </section>
        </div>
    );
};