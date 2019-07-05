import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withNetworkErrorHandler from '../../hoc/withNetworkErrorHandler/withNetworkErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('/Ingredients.json')
        .then(response => {
            this.props.onIngredientsSet(response.data);
        }).catch(error => { this.setState({error: true})});
    }

    updatePurchaseState () {
        const sum = Object.keys(this.props.ingredients)
        .map(igKey => {
            return this.props.ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        console.log(sum);
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
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
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

        let burger = this.state.error 
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
                    purchase={this.purchaseHandler}/>
            </Fragment>
        }

        return (burger);
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsSet: (ingredients) => dispatch({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }),
        onIngredientUpdate: (ingredient, count) => dispatch({type: actionTypes.UPDATE_INGREDIENT, ingredient: ingredient, count: count}),
        onPriceUpdate: (totalPrice) => dispatch({type: actionTypes.UPDATE_PRICE, totalPrice})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNetworkErrorHandler(BurgerBuilder, axios)); 