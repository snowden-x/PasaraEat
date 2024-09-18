import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: "Poached Eggs",
            description: "Leaves, Taprika",
            image: "/eggs.jpg",
            price: 8.99,
            category: "Fast Food",
            defaultOptions: {
                size: "Medium",
                protein: "Chicken",
                sides: ["Fries"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Chicken", "Beef", "Fish", "Tofu"],
                sides: ["Fries", "Salad", "Coleslaw", "Rice"],
                addons: ["Cheese", "Bacon", "Avocado", "Extra sauce"]
            }
        },
        {
            id: 2,
            name: "Grilled Chicken Sandwich",
            description: "Grilled chicken, lettuce, tomato, and mayo on a toasted bun",
            image: "/pancake.jpg",
            price: 10.99,
            category: "Sandwiches",
            defaultOptions: {
                size: "Medium",
                protein: "Chicken",
                sides: ["Salad"],
                addons: ["Cheese"]
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Chicken", "Beef", "Turkey", "Tofu"],
                sides: ["Salad", "Fries", "Coleslaw"],
                addons: ["Cheese", "Bacon", "Guacamole"]
            }
        },
        {
            id: 3,
            name: "Vegan Buddha Bowl",
            description: "A healthy mix of quinoa, veggies, and tofu, drizzled with tahini sauce",
            image: "/steakey.jpg",
            price: 12.99,
            category: "Vegan",
            defaultOptions: {
                size: "Large",
                protein: "Tofu",
                sides: ["Salad"],
                addons: []
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Tofu", "Chickpeas"],
                sides: ["Salad", "Coleslaw", "Rice"],
                addons: ["Avocado", "Hummus", "Extra Tofu"]
            }
        },
        {
            id: 4,
            name: "Beef Burrito",
            description: "Beef, rice, beans, and salsa wrapped in a tortilla",
            image: "/dones.jpg",
            price: 9.99,
            category: "Mexican",
            defaultOptions: {
                size: "Medium",
                protein: "Beef",
                sides: ["Rice"],
                addons: ["Cheese"]
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Beef", "Chicken", "Fish", "Tofu"],
                sides: ["Rice", "Beans", "Salad"],
                addons: ["Cheese", "Sour Cream", "Guacamole", "Extra Salsa"]
            }
        },
        {
            id: 5,
            name: "Margherita Pizza",
            description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
            image: "/tomato.jpg",
            price: 14.99,
            category: "Pizza",
            defaultOptions: {
                size: "Medium",
                protein: "",
                sides: ["Salad"],
                addons: ["Extra Cheese"]
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: [],
                sides: ["Salad", "Garlic Bread"],
                addons: ["Extra Cheese", "Basil", "Olives", "Mushrooms"]
            }
        },
        {
            id: 6,
            name: "Caesar Salad",
            description: "Crisp romaine, parmesan, and croutons with Caesar dressing",
            image: "/steak.jpg",
            price: 7.99,
            category: "Salads",
            defaultOptions: {
                size: "Small",
                protein: "Chicken",
                sides: [],
                addons: ["Extra Croutons"]
            },
            availableOptions: {
                sizes: ["Small", "Medium", "Large"],
                proteins: ["Chicken", "Shrimp", "Tofu"],
                sides: [],
                addons: ["Extra Croutons", "Bacon", "Avocado"]
            }
        },
        // ... other menu items with similar structure
    ]);

    const [cart, setCart] = useState([]);

    const addToCart = (item, customizations = null) => {
        const cartItem = {
            ...item,
            options: customizations || item.defaultOptions,
            quantity: 1
        };
        setCart(prevCart => [...prevCart, cartItem]);
    };

    const updateCartItem = (index, newQuantity) => {
        setCart(prevCart => prevCart.map((item, i) => 
            i === index ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeCartItem = (index) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    return (
        <MenuContext.Provider value={{ menuItems, cart, addToCart, updateCartItem, removeCartItem }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);