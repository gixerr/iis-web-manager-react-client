import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import ApplicationPools from './containers/ApplicationPools/ApplicationPools';
import Applications from './containers/Applications/Applications';
import Builds from './containers/Builds/Builds';

function App() {
  return (
    <div>
        <Layout>
            <Switch>
                <Route path='/applicationPools' component={ApplicationPools}/>
                <Route path='/applications' component={Applications}/>
                <Route path='/builds' component={Builds}/>
            </Switch>            
        </Layout>
    </div>
  );
}

export default App;
