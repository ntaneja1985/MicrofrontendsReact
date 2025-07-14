import faker from 'faker';




const mount = (el) =>{
    let products = '';
    for(let i=0; i<5; i++){
        const name = faker.commerce.productName(i);
        products += `<div>${name}</div>`;
    }

    el.innerHTML = products;
    //Can work with different frameworks like React
    //ReactDOM.render(<App />,el);
}

//Context/Situation #1
// Running this file in development in isolation with an id of dev-products
//We want to render our app into an id of dev-products
//Remember in webpack config we set mode to development or production
if(process.env.NODE_ENV !== 'production'){
 const el = document.querySelector('#dev-products');
 //Assuming our container doesnot have an element with id of dev-products
 if(el)
 {
     //We are probably running in isolation
     mount(el);
 }
}


//Context/Situation #2
//Running this file in development or product through container app
//No guarantee that an element with id of dev-products might exist
//So we donot want to immediately render the app, if element doesnot exist
//We will not call the mount function immediately
//Using the export function, we can force the container to decide when to load the app on the screen
export {mount};
