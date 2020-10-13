import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import * as productsAPI from '../../services/products-api'

import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import AddProductPage from '../AddProductPage/AddProductPage'
import ProductCard from '../../components/ProductCard/ProductCard'




class App extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            user: userService.getUser()
        };
    }

    async componentDidMount() {
        const products = await productsAPI.getAll();
        this.setState({ products: products })
    }

    // ----- User Interaction Functions ----- //

    handleAddProduct = async newProductData => {
        const newProduct = productsAPI.create(newProductData);
        this.setState(state => ({
            products: [...state.products, newProduct]
        }),
            () => this.props.history.push('/')
        )
    }


    // ----- Authentication Functions ----- //

    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    }

    handleSignupOrLogin = () => {
        this.setState({ user: userService.getUser() });
    }

    render() {
        return (

            <div className="App">
                <header className="App-header">
                    The Sweat Aesthetic
                    <nav>
                        <NavBar
                            user={this.state.user}
                            handleLogout={this.handleLogout}
                        />
                    </nav>
                </header>

                <Switch>
                    <Route exact path='/' render={() =>
                        this.state.products.map(product => (
                            <ProductCard product={product}/>
                        ))

                    } />
                    <Route exact path='/addproduct' render={() =>
                        <AddProductPage handleAddProduct={this.handleAddProduct}/>
                    } />
                    <Route exact path='/signup' render={({ history }) =>
                        <SignupPage
                            history={history}
                            handleSignupOrLogin={this.handleSignupOrLogin}
                        />
                    } />
                    <Route exact path='/login' render={({ history }) =>
                        <LoginPage
                            handleSignupOrLogin={this.handleSignupOrLogin}
                            history={history}
                        />
                    } />
                </Switch>
            </div>
        )
    }
}

export default App;
