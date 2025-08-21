import { type ReactNode } from 'react'; 
import Footer from './Footer';
import NavBar from './NavBar';

interface IProps {
    children : ReactNode
}

const CommonLayout = ({children}: IProps) => {
    return (
        <div className=" min-h-screen flex flex-col">
            <NavBar />
            <div className="grow-1 container mx-auto px-2">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;