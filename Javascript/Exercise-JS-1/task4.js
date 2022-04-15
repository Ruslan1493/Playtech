//Напишете програма, която да категоризира продукти според цената им. Програмата трябва да изпише
//името на всеки продукт и неговата категория. Също така трябва да изпише и колко е сбораната сума
//на всички продукти. Изписването на резултата трявба да е само в конзолата.
//Използвайте следните продукти.

//Обсег на всяка категория:
//	Евтини 0 - 100
//	Нормална цена 100 - 500
//	Скъпи 500 - 3000
//	Много скъпи 3000+


let products = [
    { product: "Shirt", price: 10 },
    { product: "Laptop", price: 2400 },
    { product: "Bike", price: 450 },
    { product: "Chair", price: 150 },
    { product: "Phone", price: 1500 },
    { product: "Shoes", price: 60 },
    { product: "Car", price: 25000 },
    { product: "Coffe Machine", price: 500 }
];
let sum = 0;

function getCategory(price) {
    if (price >= 0 && price < 100) {
        return 'cheap';
    } else if (price >= 100 && price < 500) {
        return 'normal';
    }
    else if (price >= 500 && price < 3000) {
        return 'expensive';
    }
    else if (price >= 3000) {
        return 'very expensive';
    }
}

products = products.map(p => {
    sum += p.price;

    return { product: p.product, category: getCategory(p.price)};
});

console.log(`Sum of all product is ${sum}`);
console.log(products.forEach(p => {console.log(p)}));
