import NavigationBar from '../Navigation/NavigationBar/NavigationBar';
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <NavigationBar/>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;