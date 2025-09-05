import React, { useState } from 'react';
import { Trash2, Check, CreditCard } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
import tourImage from '@/assets/paracas-tour.jpg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Paracas, Ica, and Huacachina Oasis from Lima',
      fromDate: 'September 9, 2025 4:30 am',
      toDate: 'September 9, 2025 10:30 pm',
      duration: '18 hours',
      adults: 1,
      price: 50.00,
      image: tourImage
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, adults) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, adults: Math.max(1, adults) } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.adults), 0);
  const total = subtotal;

  const proceedToCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <span className="text-success-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-foreground text-xl">Turismo iPeru</span>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Cart</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            {/* Step 1 - Completed */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-success-foreground" />
              </div>
              <span className="ml-2 text-foreground font-medium">Add Tour</span>
            </div>
            
            {/* Progress Line 1 */}
            <div className="w-24 h-1 bg-success"></div>
            
            {/* Step 2 - Current */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center relative">
                <div className="w-3 h-3 bg-accent-foreground rounded-full"></div>
                <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse"></div>
              </div>
              <span className="ml-2 text-accent font-bold">Cart</span>
            </div>
            
            {/* Progress Line 2 */}
            <div className="w-24 h-1 bg-muted"></div>
            
            {/* Step 3 - Upcoming */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
              <span className="ml-2 text-muted-foreground font-medium">Checkout</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            
              <div className="bg-muted px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
                  <div className="col-span-6">Tour</div>
                  <div className="col-span-3 text-center">Price</div>
                  <div className="col-span-3 text-center">Subtotal</div>
                </div>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground text-lg">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="px-6 py-6 border-t border-border">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-6 flex space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                            {item.title}
                          </h3>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p><span className="font-medium">From:</span> {item.fromDate}</p>
                            <p><span className="font-medium">To:</span> {item.toDate}</p>
                            <p><span className="font-medium">Duration:</span> {item.duration}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="font-medium">Adults:</span>
                              <div className="flex items-center space-x-1">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.adults - 1)}
                                  className="w-6 h-6 bg-muted text-muted-foreground rounded flex items-center justify-center text-xs hover:bg-border"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">{item.adults}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.adults + 1)}
                                  className="w-6 h-6 bg-muted text-muted-foreground rounded flex items-center justify-center text-xs hover:bg-border"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="font-semibold">US${item.price.toFixed(2)}</span>
                      </div>
                      <div className="col-span-3 text-center flex items-center justify-between">
                        <span className="font-semibold">US${(item.price * item.adults).toFixed(2)}</span>
                        {/* <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button> */}
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {cartItems.length > 0 && (
                <div className="px-6 py-4 border-t border-border">
                  {/* <Button variant="secondary" className="w-full">
                    Update cart
                  </Button> */}
                </div>
              )}
          
          </div>

          {/* Booking Totals */}
          <div className="lg:col-span-1">
           
              <h2 className="text-xl font-bold text-foreground mb-6">Booking totals</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">US${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>US${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={proceedToCheckout} 
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                size="lg"
                disabled={cartItems.length === 0}
              >
                Proceed to book
              </button>
            
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              VISA
            </div>
            <div className="w-10 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
              MC
            </div>
            <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
              DC
            </div>
            <div className="w-10 h-6 bg-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
              AMEX
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-success-foreground font-bold text-sm">T</span>
                </div>
                <span className="font-bold text-foreground">Turismo iPeru</span>
              </div>
              <p className="text-sm text-muted-foreground">Explore Peru With Us</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Trade name: Turismo iPeru E.I.R.L.</p>
                <p>RUC: 20603063638</p>
                <p>(+51) 972 385 856</p>
                <p>info@iperutouis.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>About us</p>
                <p>Terms and Conditions</p>
                <p>Privacy policy</p>
                <p>Refund policy</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Cities</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Cusco, Peru</p>
                <p>Lima, Peru</p>
                <p>Huacaz, Peru</p>
                <p>Arequipa, Peru</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 mt-8 text-center text-sm text-muted-foreground">
            <p>All rights reserved - 2025 | Turismo iPeru</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;