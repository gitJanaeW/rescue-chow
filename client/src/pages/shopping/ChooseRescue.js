import React, { useState } from 'react';
import Form from '../../components/Form'

const ChooseARescue = () => {

    //stripe stuff 
    // const [state, dispatch] = useStoreContext();
    // const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // useEffect(() => {
    //     if (data) {
    //         stripePromise.then((res) => {
    //             res.redirectToCheckout({ sessionId: data.checkout.session });
    //         });
    //     }
    // }, [data]);

    const [formData, setFormData] = React.useState(
        {
            rescue: ""
        }
    )

    function submitConsole() {
        console.log('hello')
    }


    return (
        <div>
            <div>
                <h1>Find Rescue</h1>
                <p>
                    You get to choose where your animal rescue fundraising money goes. Here is a list of the rescues you can choose to donate your subscription money to, helping organizations across Canada, including: Ontario, British Columbia, and Quebec.
                </p>
            </div>
            <div>
                <Form></Form>

            </div>

        </div>
    );
}


export default ChooseARescue;

