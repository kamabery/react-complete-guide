import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInintIngredients();
    }


    updatePurchaseState () {
        const sum = Object.keys(this.props.ingredients)
        .map(igKey => {
            return this.props.ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }


    UpdaIngredientHandler = (type, amount) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + amount;
        this.props.onIngredientUpdate(type, updatedCount);

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        let newPrice = 0;
        if(amount > 0) {
            newPrice = oldPrice + priceAddition;
        }
        else{
            newPrice = oldPrice - priceAddition;
        }
                this.props.onPriceUpdate(newPrice);
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({purchasing : true});
        }
        else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error 
            ? <p>Ingredients can't be loaded</p> : <Spinner/>

        if(this.props.ingredients){
            let orderSummary =   <OrderSummary 
            ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice} />
    
            
            if (this.state.loading) {
                orderSummary = <Spinner/>
            }
    
            burger = 
            <Fragment>                    
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}                        
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    ingredientUpdated={this.UpdaIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState()}
                    purchase={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    />
                    
            </Fragment>
        }

        return (burger);
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInintIngredients: () => 
            dispatch(actionCreators.initIngredients()),
        onIngredientUpdate: (ingredient, count) => 
            dispatch(actionCreators.updateIngredient(ingredient, count)),
        onPriceUpdate: (totalPrice) => 
            dispatch(actionCreators.updatePrice(totalPrice)),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => 
            dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder); 