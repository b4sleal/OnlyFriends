import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const LoggedIn = () => {
    const [cookies] = useCookies(['email']);
    const navigate = useNavigate();

    return (
        <div className="App" >
            {!cookies.email && navigate('/home')}
            <header className="App-header">
                <p>
                    YOU are logged in
                </p>
            </header>
        </div>
    );
};