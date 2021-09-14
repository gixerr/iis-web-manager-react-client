import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import ApplicationPools from './containers/ApplicationPools/ApplicationPools';
import Applications from './containers/Applications/Applications';
import Builds from './containers/Builds/Builds';
import EditApplicationPool from './components/EditApplicationPool/EditApplicationPool';

function App() {
  return (
    <div>
        <Layout>
            <Switch>
                <Route path='/applicationPools' component={ApplicationPools}/>
                <Route path='/applications' component={Applications}/>
                <Route path='/builds' component={Builds}/>
                <Route path='/applicationPool/edit' component={EditApplicationPool}/>
            </Switch>
        </Layout>
    </div>
  );
}

export default App;
