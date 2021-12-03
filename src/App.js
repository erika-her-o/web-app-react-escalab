import React from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';

// import components
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

//design pattents: statefull
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  //ciclos de vida -live cyles
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth )=> {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  //pattern design: render props
  render() {
    return (
      <div>
        <Header currentUser = { this.state.currentUser } />
        <Switch>
            <Route exact path= "/" component = { HomePage } />
            <Route path="/shop" component = { ShopPage } />
            <Route path="/shop" component = { SignInAndSignUpPage } />
        </Switch>
      </div>
    );
  }
}

export default App;
