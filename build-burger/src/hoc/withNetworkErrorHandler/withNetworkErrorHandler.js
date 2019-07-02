import React, { Fragment, useEffect, useState } from 'react'
import Modal from '../../components/UI/Modal/Modal';
const withNetworkErrorHandler = (WrappedComponent, axios) => {
    return (props) =>
    {
        const [error, setError] = useState(null);

        useEffect(() => {
            let requestInterceptor = null;
            let responseInterceptor = null;
    
            requestInterceptor = axios.interceptors
                .request.use(req => {
                    setError(null);
                    return req;
                });

            responseInterceptor = axios.interceptors
                .response.use(res => res, error=>
                    {
                    setError(error)
                    });

                return function cleanup () {
                axios.interceptors.request
                    .eject(requestInterceptor);
                axios.interceptors.response
                    .eject(responseInterceptor);
            }
        });
        
        return (
            <Fragment>
                <Modal show = {error} modalClosed={()=>setError(null)}>
                    <h3>Something went wrong!!!!</h3>    
                    <p>{error ? error.message : null}</p>                
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }    
    }

export default withNetworkErrorHandler
