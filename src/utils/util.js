import {fakerDE as faker } from '@faker-js/faker';

export const generateUser = () => {
    let numOfProducts = faker.number.int({min:0, max:7});
    let products = [];
    for (let i=0;i<numOfProducts;i++){
        products.push(generateProduct());
    }

    return{
        id:faker.database.mongodbObjectId(),
        name:faker.person.firstName(),
        last_name:faker.person.lastName(),
        products
    }
}

export const generateProduct = () => {
    return{
        id:faker.database.mongodbObjectId(),
        title:faker.commerce.productName()
    }
}