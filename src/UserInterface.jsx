import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartNoAxesGantt, ShoppingBag, Plus, Minus, Search, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";



const menuItems = [
    { id: '0', category: 'Food', name: 'Gourmet Burger', description: 'Juicy beef patty with premium toppings', price: 15, image: '/carrots.jpg', rating: 4.5, popular: true },
    { id: '1', category: 'Food', name: 'Artisan Pizza', description: 'Wood-fired with fresh ingredients', price: 18, image: '/dones.jpg', rating: 4.2 },
    { id: '2', category: 'Drinks', name: 'Craft Cola', description: 'Small-batch artisanal soda', price: 4, image: '/eggs.jpg', rating: 3.8 },
    { id: '3', category: 'Food', name: 'Superfood Salad', description: 'Nutrient-packed greens and grains', price: 12, image: '/fruity.jpg', rating: 4.0, popular: true },
    { id: '4', category: 'Drinks', name: 'Fresh-Squeezed Lemonade', description: 'Made to order', price: 5, image: '/steak.jpg', rating: 4.7 },
    { id: '5', category: 'Desserts', name: 'Decadent Chocolate Cake', description: 'Rich and moist', price: 8, image: '/tomato.jpg', rating: 4.9, popular: true },
    { id: '6', category: 'Food', name: 'Artisan Pizza', description: 'Wood-fired with fresh ingredients', price: 18, image: '/dones.jpg', rating: 4.2 },
    { id: '7', category: 'Drinks', name: 'Craft Cola', description: 'Small-batch artisanal soda', price: 4, image: '/eggs.jpg', rating: 3.8 },
    { id: '8', category: 'Food', name: 'Superfood Salad', description: 'Nutrient-packed greens and grains', price: 12, image: '/fruity.jpg', rating: 4.0, popular: true },
    { id: '9', category: 'Drinks', name: 'Fresh-Squeezed Lemonade', description: 'Made to order', price: 5, image: '/steak.jpg', rating: 4.7 },
    { id: '10', category: 'Desserts', name: 'Decadent Chocolate Cake', description: 'Rich and moist', price: 8, image: '/tomato.jpg', rating: 4.9, popular: true },
];

const NavMenu = ({ activeCategory, setActiveCategory }) => {
    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    return (
        <ScrollArea className="w-full">
            <div className="flex py-4 px-6 space-x-4">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        className="whitespace-nowrap"
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </ScrollArea>
    );
};

const MenuItem = ({ item, cart, addToCart, removeFromCart }) => (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            {item.popular && (
                <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
                    Popular
                </Badge>
            )}
        </div>
        <CardContent className="p-4">
            <h4 className="font-bold text-xl text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <div className="flex items-center mt-2 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm">{item.rating.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        variant={cart[item.id] ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => addToCart(item.id)}
                    >
                        <Plus size={16} />
                    </Button>
                    {cart[item.id] && (
                        <>
                            <span className="font-semibold">{cart[item.id]}</span>
                            <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Minus size={16} />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function Preview() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const filteredItems = menuItems.filter(item =>
        (activeCategory === 'All' || item.category === activeCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (itemId) => {
        setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId]--;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
        const item = menuItems.find(item => item.id === itemId);
        return sum + (item ? item.price * quantity : 0);
    }, 0);

    const placeOrder = () => {
        setOrderPlaced(true);
        setCart({});
        setTimeout(() => {
            setOrderPlaced(false);
            setIsCartOpen(false);
        }, 3000);
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) setIsCartOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Card className="shadow-lg w-full max-w-4xl mx-auto my-8 overflow-hidden">
                <div className='flex justify-between items-center p-4 bg-primary text-primary-foreground'>
                    <ChartNoAxesGantt className="rounded-full bg-primary-foreground text-primary p-1" size={36} />
                    <Button variant="ghost" onClick={() => setIsCartOpen(true)} className="relative">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && (
                            <Badge variant="secondary" className="absolute -top-2 -right-2">
                                {totalItems}
                            </Badge>
                        )}
                    </Button>
                </div>
                <CardHeader className="py-8 bg-primary/90 text-primary-foreground text-center">
                    <CardTitle className="text-4xl font-bold">Mensah's Gourmet</CardTitle>
                    <p className="text-xl opacity-90 mt-2">Exquisite Dining Experience</p>
                </CardHeader>
                <div className="sticky top-0 z-10 bg-background shadow-md">
                    <div className="p-4">
                        <Input
                            type="text"
                            placeholder="Search menu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                            icon={<Search className="text-gray-400" />}
                        />
                    </div>
                    <NavMenu activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                </div>
                <CardContent className="mt-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <MenuItem
                                key={item.id}
                                item={item}
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your Cart</DialogTitle>
                        <DialogDescription>
                            Review your order before checkout
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                        {Object.entries(cart).map(([itemId, quantity]) => {
                            const item = menuItems.find(item => item.id === itemId);
                            return (
                                <div key={itemId} className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {quantity}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => removeFromCart(itemId)}>
                                            <Minus size={16} />
                                        </Button>
                                        <span>{quantity}</span>
                                        <Button size="sm" variant="outline" onClick={() => addToCart(itemId)}>
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollArea>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                            Continue Shopping
                        </Button>
                        <Button onClick={placeOrder} disabled={totalItems === 0}>
                            Place Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {orderPlaced && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card className="w-96 text-center p-6">
                        <CardTitle className="text-2xl mb-4">Order Placed!</CardTitle>
                        <p>Thank you for your order. It will be ready soon.</p>
                        <Button className="mt-4" onClick={() => setOrderPlaced(false)}>Close</Button>
                    </Card>
                </div>
            )}
        </div>
    );
}