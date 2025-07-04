export class APIUtils {
    apiContext: any;
    loginPayload: any;
    //create a constuctor to pick the apicontext
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    //get token method
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    //create order method
    async createOrder(orderPayload){
            let response = {};
            response.token = await this.getToken();

            const orderResponse = await this.apiContext.post(
                "https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    headers:{
                        'Authorization': response.token,
                        'Content-Type': 'application/json'
                    },
                })
                const orderResponseJson = await orderResponse.json();
                console.log(orderResponseJson);
                const orderID = orderResponseJson.orders[0];
                response.orderID = orderID;
                return response;
    }
}

module.exports = {APIUtils};