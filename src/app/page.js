"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`
            );

            const data = await response.json();

            setProducts(data.data);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Names</h1>

            {products.map((product) => (
                <div key={product._id}>
                    {product.name}
                </div>
            ))}
        </div>
    );
}