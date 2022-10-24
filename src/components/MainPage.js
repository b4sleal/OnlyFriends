import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css';

import image from '../img/MainPage/sitting.svg';

export const MainPage = () => {
    const [cookies] = useCookies(['email']);
    const navigate = useNavigate();

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            {cookies.email && navigate('/homepage')}
            <section className="page-card">
                <div className="main-container">
                    <nav className="navbar navbar-light navbar-expand-md py-3">
                        <div className="container">
                            <a className="navbar-brand d-flex align-items-center" href="/">
                                <span className="logo-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-question">
                                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                    </svg>
                                </span>
                                <span className="logo-name">OnlyFriends</span>
                            </a>
                            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
                                <span className="visually-hidden">Toggle navigation</span>
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navcol-3">
                                <ul className="navbar-nav mx-auto nav-links">
                                    <li className="nav-item"><a className="nav-link active" href="/">link1</a></li>
                                    <li className="nav-item"><a className="nav-link active" href="/">link2</a></li>
                                    <li className="nav-item"><a className="nav-link active" href="/">link3</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container py-5 ctn-1">
                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                            <div className="col mb-4">
                                <div>
                                    <h1 className="title-header">A new way to<br />make connections<br />on campus</h1>
                                    <p className="pg">A safe place for students<br />to date and make friends<br /></p>
                                    <div className="button-container">
                                        <button className="default-btn create-acc-btn" type="submit" onClick={() => navigate("/createprofile")}>Create Account</button>
                                        <button className="default-btn login-btn" type="submit" onClick={() => navigate("/loginpage")}>Login</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <img className="sitting-image" src={image} width={700} height={524} />
                            </div>
                        </div>
                    </div>
                    {/** Decide for later */}
                    {/* <div className="container py-5 ctn-1 ctn-2">
                        <div className="row row-reverse  row-cols-1 row-cols-md-2 d-flex justify-content-center">
                            <div className="col mb-4">
                                <p className="pg">(pic showcasing matching with people)</p>
                            </div>
                            <div className="col col-right">
                                <div>
                                    <h1 className="title-header">Meet new people</h1>
                                    <p className="pg">Match and find people around your campus (add more info)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container py-5 ctn-1 ctn-2">
                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                            <div className="col mb-4">
                                <h1 className="title-header">Strike a conversation</h1>
                                <p className="pg">blah blah blah info info info more info and more info</p>
                            </div>
                            <div className="col col-right">
                                <p className="pg">(pic showcasing messaging)</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
};