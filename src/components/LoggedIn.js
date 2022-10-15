import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const LoggedIn = () => {
    const [cookies] = useCookies(['email']);

    return (
        <div className="App" >
            {!cookies.email && <Navigate replace to="/" />}
            <header className="App-header">
                <p>
                    YOU are logged in
                </p>
            </header>
        </div>
    );
};