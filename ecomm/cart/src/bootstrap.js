import faker from "faker";



const mount = (element) => {
    const cartText = `<div>You have ${faker.random.number()} 
                        items in your cart</div>`
    element.innerHTML = cartText;
}

// Running in Development Environment
if(process.env.NODE_ENV !== "production") {
    const el = document.querySelector('#dev-cart');
    if(el) {
        mount(el);
    }
}

//Running in Production
export {mount};