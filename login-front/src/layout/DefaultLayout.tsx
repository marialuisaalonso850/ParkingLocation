import { Link } from "react-router-dom";
import Signup from '../routes/signup';
import Dashboard from '../routes/dashboard';

interface DefaultLayoutProps{
    children: React.ReactNode,
}
export default function DefaultLayout({children}:DefaultLayoutProps){
    return(
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            {children}
        </main>
    </>
    )
    
}