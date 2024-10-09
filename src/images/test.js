function MovieShoppingCartPage() {
    const [moviesShopCart, setMoviesShopCart]= useState([]);
    const [quantities, setQuantities] = useState({});
    const [productNumber, setProductNumber] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchShopCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Token non trouvé !');
                return;
            }

            try {
                const response = await fetch('https:/symbian.stvffmn.com/nady/public/api/v1/users/cart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const inCart = data.datas;
                    setProductNumber(inCart.length);
                    
                    const fetchedMovies = await Promise.all(
                        inCart.map(async movie => {
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.product_id}?api_key=${apiKey}`);
                            const data = await response.json();
                            return { ...data, quantity: movie.quantity, cartItemId: movie.id };
                        })
                    );
                    
                    setMoviesShopCart(fetchedMovies);

                    // Initialiser les quantités pour chaque produit
                    const initialQuantities = {};
                    inCart.forEach(movie => {
                        initialQuantities[movie.id] = movie.quantity;
                    });
                    setQuantities(initialQuantities);
                } else {
                    const errorData = await response.json();
                    console.log(errorData.message);
                }
            } catch (err) {
                console.log('Erreur lors de la récupération du panier.', err);
            }
        };

        fetchShopCart();
    }, []);

    const updateCartQuantity = async (cartItemId, newQuantity) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https:/symbian.stvffmn.com/nady/public/api/v1/users/cart/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    quantity: newQuantity,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);

                // Mettre à jour localement la quantité
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [cartItemId]: newQuantity,
                }));
            } else {
                console.error('Erreur lors de la mise à jour de la quantité:', data.message);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }
    };

    const incrementQuantity = (cartItemId) => {
        const currentQuantity = quantities[cartItemId] || 1;
        updateCartQuantity(cartItemId, currentQuantity + 1);
    };

    const decrementQuantity = (cartItemId) => {
        const currentQuantity = quantities[cartItemId] || 1;
        if (currentQuantity > 1) {
            updateCartQuantity(cartItemId, currentQuantity - 1);
        }
    };

    return (
        <>
            {/* Le reste de ton composant */}
            {
                moviesShopCart.map((cart, index) => (
                    <div key={index} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                        <div className="w-full md:max-w-[126px]">
                            <img src={`${imgBase}${cart?.backdrop_path}`} alt={cart.title} className="mx-auto rounded-xl"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                            <div className="md:col-span-2">
                                <h6 className="font-semibold text-base leading-7 text-black">{cart.title}</h6>
                                <h6 className="font-medium text-base leading-7 text-gray-600">${cart.price}</h6>
                            </div>
                            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                <button onClick={() => decrementQuantity(cart.cartItemId)} className="group rounded-l-xl px-5 py-[18px] border">
                                    -
                                </button>
                                <input 
                                    type="text"
                                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] py-[12px] text-center bg-transparent"
                                    value={quantities[cart.cartItemId] || 1}
                                    readOnly
                                />
                                <button onClick={() => incrementQuantity(cart.cartItemId)} className="group rounded-r-xl px-5 py-[18px] border">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* Le reste de ton composant */}
        </>
    );
}

export default MovieShoppingCartPage;
