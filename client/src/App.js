import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Test from './pages/Test';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar';
import FundraiserDetails from './pages/FundraiserDetails';
import '@stripe/stripe-js';
import { Container, Grid } from 'semantic-ui-react';
import MyFundraisers from './pages/MyFundraisers';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/categories" component={Categories} />
          <Route path="/register" component={Register} />
          <Route
            path={'/(.+)'}
            render={() => (
              <>
                <Container
                  style={{ border: 'orange 2px solid', marginTop: '5rem', minHeight: '80vh' }}
                >
                  <Navbar />
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <SideBar />
                      </Grid.Column>
                      <Grid.Column width={13}>
                        <Route path="/home" component={Home} exact />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/fundraisers" component={MyFundraisers} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </>
            )}
          />
        </Switch>
        <Route path="/fundraiser/:id" component={FundraiserDetails} />
        <ToastContainer position="bottom-right" autoClose={5000} />
      </Router>
    </div>
  );
}

export default App;
