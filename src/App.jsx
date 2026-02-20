/* eslint-disable react-hooks/purity */
import { useState } from 'react';
import { 
  ShoppingBag, Search, Menu, Package, CreditCard, 
  ChevronRight, Star, Plus, Minus, X, CheckCircle, Truck, 
  Settings, Users, Activity
} from 'lucide-react';

// --- MOCK DATA (Simulando o Banco de Dados PostgreSQL / Prisma via NestJS) ---
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: "Chocadeira Automática Premium 100 Ovos", 
    category: "Incubators", 
    price: 850.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Chocadeira+100", 
    rating: 4.8, 
    stock: 12,
    specs: ["Bivolt (110V/220V)", "Controle de Umidade PID", "Rolagem Automática Programável", "Garantia de 2 anos"] 
  },
  { 
    id: 2, 
    name: "Impressora 3D Industrial CoreXY", 
    category: "3D Equipment", 
    price: 3200.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Impressora+3D", 
    rating: 4.9, 
    stock: 5,
    specs: ["Área de impressão 300x300x400mm", "Suporta ABS, PETG, Nylon", "Aquecimento Rápido", "Extrusora Direct Drive"] 
  },
  { 
    id: 3, 
    name: "Mesa de Trabalho Reforçada (Aço Carbono)", 
    category: "Furniture", 
    price: 450.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Mesa+Aço", 
    rating: 4.5, 
    stock: 20,
    specs: ["Estrutura em Aço Carbono", "Tampo em MDF 18mm", "Suporta até 250kg", "Pintura Eletrostática"] 
  },
  { 
    id: 4, 
    name: "Chocadeira Amadora 30 Ovos", 
    category: "Incubators", 
    price: 350.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Chocadeira+30", 
    rating: 4.2, 
    stock: 15,
    specs: ["110V", "Termostato Digital", "Ideal para iniciantes"] 
  },
  { 
    id: 5, 
    name: "Filamento PETG 1KG - Vermelho Emy", 
    category: "3D Equipment", 
    price: 120.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Filamento+PETG", 
    rating: 4.7, 
    stock: 50,
    specs: ["Cor: Vermelho #FF0000", "Diâmetro: 1.75mm", "Alta resistência mecânica"] 
  },
  { 
    id: 6, 
    name: "Estante Organizadora de Componentes", 
    category: "Furniture", 
    price: 280.00, 
    image: "https://placehold.co/600x600/111111/FF0000?text=Estante", 
    rating: 4.6, 
    stock: 8,
    specs: ["5 Prateleiras", "Metal Reforçado", "Acompanha caixas organizadoras"] 
  },
];

const CATEGORIES = ["All", "Incubators", "3D Equipment", "Furniture"];

// --- MAIN COMPONENT ---
export default function App() {
  // Estado de Roteamento Simulado (Substitui o App Router do Next.js no protótipo)
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Estado do Carrinho (Substitui o Zustand/Redux)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Navegação
  const navigate = (route, product = null) => {
    setCurrentRoute(route);
    if (product) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  // Funções do Carrinho
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-[#FF0000] selection:text-white flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('home')}>
              <span className="text-2xl font-bold tracking-tighter">
                EMY<span className="text-[#FF0000]">CHOCADEIRAS</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigate('home')} className={`hover:text-[#FF0000] transition-colors ${currentRoute === 'home' ? 'text-[#FF0000]' : ''}`}>Home</button>
              <button onClick={() => navigate('catalog')} className={`hover:text-[#FF0000] transition-colors ${currentRoute === 'catalog' ? 'text-[#FF0000]' : ''}`}>Catálogo</button>
              <button onClick={() => navigate('admin')} className={`hover:text-[#FF0000] transition-colors ${currentRoute === 'admin' ? 'text-[#FF0000]' : ''}`}>Admin</button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('catalog')} className="p-2 text-zinc-300 hover:text-white transition">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="p-2 text-zinc-300 hover:text-white transition relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#FF0000] rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-zinc-300 hover:text-white transition">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* DYNAMIC CONTENT ROUTER */}
      <main className="flex-grow flex flex-col relative">
        {currentRoute === 'home' && <HomeView navigate={navigate} />}
        {currentRoute === 'catalog' && <CatalogView navigate={navigate} />}
        {currentRoute === 'product' && <ProductView product={selectedProduct} addToCart={addToCart} navigate={navigate} />}
        {currentRoute === 'checkout' && <CheckoutView cart={cart} total={cartTotal} navigate={navigate} />}
        {currentRoute === 'admin' && <AdminDashboardView />}
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold tracking-tighter text-white mb-4 block">
              EMY<span className="text-[#FF0000]">CHOCADEIRAS</span>
            </span>
            <p className="text-sm">Tecnologia de ponta em incubação, impressão 3D e mobiliário industrial. Potencialize seus resultados.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('home')} className="hover:text-[#FF0000]">Home</button></li>
              <li><button onClick={() => navigate('catalog')} className="hover:text-[#FF0000]">Produtos</button></li>
              <li><button className="hover:text-[#FF0000]">Sobre Nós</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm">
              <li>Contato</li>
              <li>Política de Frete</li>
              <li>Garantia e Devoluções</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Pagamento Seguro</h3>
            <div className="flex space-x-2">
               <div className="h-8 w-12 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-500 font-bold border border-zinc-700">Pix</div>
               <div className="h-8 w-12 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-500 font-bold border border-zinc-700">Visa</div>
               <div className="h-8 w-12 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-500 font-bold border border-zinc-700">Master</div>
            </div>
            <p className="text-xs mt-4">Powered by Mercado Pago</p>
          </div>
        </div>
      </footer>

      {/* CART SIDEBAR OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" /> Seu Carrinho
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-zinc-500 mt-20">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Seu carrinho está vazio.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('catalog'); }}
                    className="mt-4 text-[#FF0000] font-semibold hover:underline"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-2 border border-zinc-100 rounded-lg shadow-sm">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-zinc-100" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-[#FF0000] font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-zinc-100"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 py-1 text-sm font-medium border-x">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-zinc-100"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-zinc-50">
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); navigate('checkout'); }}
                  className="w-full bg-[#FF0000] text-white py-3 rounded-md font-bold hover:bg-red-700 transition shadow-lg shadow-red-500/30 flex items-center justify-center"
                >
                  Finalizar Compra <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- VIEWS ---

function HomeView({ navigate }) {
  const featured = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 text-white overflow-hidden border-b-[8px] border-[#FF0000]">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 z-0 opacity-80"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF0000]/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-[#FF0000] text-sm font-medium uppercase tracking-wider">
              <Activity className="w-4 h-4 mr-2" /> Alta Performance
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              A evolução da <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-red-400">
                sua produção.
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              Equipamentos industriais, chocadeiras automáticas e impressão 3D de alta precisão. Tudo projetado para o seu máximo rendimento.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('catalog')}
                className="bg-[#FF0000] text-white px-8 py-4 rounded-md font-bold hover:bg-red-700 transition shadow-lg shadow-red-500/20"
              >
                Ver Catálogo
              </button>
              <button className="border border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-md font-medium transition">
                Falar com Consultor
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative">
             {/* Mock 3D or Hero Image visual */}
             <div className="aspect-square bg-gradient-to-tr from-zinc-900 to-zinc-800 rounded-3xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://placehold.co/800x800/111111/FF0000?text=Premium+Tech')] bg-cover bg-center mix-blend-overlay opacity-60 group-hover:opacity-80 transition duration-700 group-hover:scale-105"></div>
               <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-zinc-700 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold">Qualidade Premium</p>
                    <p className="text-zinc-400 text-sm">Garantia estendida</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center">
                    <CheckCircle className="text-white w-6 h-6" />
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Destaques</h2>
              <p className="text-zinc-500 mt-2">Os equipamentos mais vendidos no último mês.</p>
            </div>
            <button 
              onClick={() => navigate('catalog')}
              className="text-[#FF0000] font-semibold hover:underline flex items-center"
            >
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => navigate('product', product)} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#FF0000] flex items-center justify-center mb-6">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Frete Rápido</h3>
            <p className="text-zinc-500">Logística otimizada para entregar seus equipamentos com segurança e velocidade.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#FF0000] flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pagamento Seguro</h3>
            <p className="text-zinc-500">Integração nativa com Mercado Pago garantindo 100% de segurança na transação.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#FF0000] flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Garantia Emy</h3>
            <p className="text-zinc-500">Suporte técnico especializado e garantia de fábrica em todos os produtos da linha.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CatalogView({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Catálogo de Produtos</h1>
        <p className="text-zinc-500 mt-2">Encontre o equipamento perfeito para sua necessidade.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border rounded-xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <FilterIcon className="w-5 h-5 mr-2" /> Categorias
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left flex items-center justify-between transition-colors ${activeCategory === cat ? 'text-[#FF0000] font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
                  >
                    <span>{cat === "All" ? "Todos os Produtos" : cat}</span>
                    {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => navigate('product', product)} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductView({ product, addToCart, navigate }) {
  if (!product) return <div className="p-20 text-center">Produto não encontrado.</div>;

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-zinc-500 mb-8">
          <button onClick={() => navigate('home')} className="hover:text-zinc-900">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('catalog')} className="hover:text-zinc-900">Catálogo</button>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Imagem */}
          <div className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 aspect-square flex items-center justify-center p-8 relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl shadow-lg group-hover:scale-105 transition duration-500" />
            <div className="absolute top-4 left-4">
               <span className="bg-white text-xs font-bold px-3 py-1 rounded-full shadow-sm border">{product.category}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-[#FF0000]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-zinc-500">({product.rating} de 5)</span>
            </div>

            <p className="text-4xl font-black text-zinc-950 mb-8">
              R$ {product.price.toFixed(2)}
              <span className="text-sm text-zinc-500 font-normal block mt-1">em até 12x s/ juros no Mercado Pago</span>
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 border-b pb-2">Especificações Técnicas</h3>
              <ul className="space-y-2 text-zinc-600">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#FF0000] mr-2 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 mb-8">
               <span className="text-sm font-medium flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                 <Package className="w-4 h-4 mr-1"/> Em estoque ({product.stock} disp.)
               </span>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[#FF0000] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-xl shadow-red-500/20 flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutView({ cart, total, navigate }) {
  const [status, setStatus] = useState('idle'); // idle, processing, success

  const handlePayment = () => {
    setStatus('processing');
    // Simula a chamada SDK do Mercado Pago
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (cart.length === 0 && status === 'idle') {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-20">
         <h2 className="text-2xl font-bold mb-4">Checkout Vazio</h2>
         <button onClick={() => navigate('catalog')} className="text-[#FF0000] hover:underline">Voltar para a loja</button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-20 bg-zinc-50">
        <div className="bg-white p-12 rounded-2xl shadow-xl border text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Pedido Confirmado!</h2>
          <p className="text-zinc-500 mb-8">Obrigado pela sua compra. O pagamento via Mercado Pago foi aprovado e o vendedor já foi notificado via Webhook.</p>
          <div className="bg-zinc-50 p-4 rounded-lg border text-left mb-8">
            <p className="text-sm font-medium">Número do Pedido: <span className="font-mono text-[#FF0000]">#EMY-{Math.floor(Math.random() * 10000)}</span></p>
            <p className="text-sm text-zinc-500 mt-1">Você receberá atualizações no seu e-mail.</p>
          </div>
          <button 
            onClick={() => { window.location.reload() }} // Hard reset mock state
            className="w-full bg-zinc-950 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 flex-grow py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dados e Entrega */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center border-b pb-4">
                <Users className="w-5 h-5 mr-2 text-[#FF0000]" /> Dados Pessoais
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nome Completo" className="col-span-2 p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] focus:border-transparent outline-none" defaultValue="João Cliente da Silva" />
                <input type="email" placeholder="E-mail" className="p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" defaultValue="joao@exemplo.com" />
                <input type="text" placeholder="CPF" className="p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" defaultValue="123.456.789-00" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center border-b pb-4">
                <Truck className="w-5 h-5 mr-2 text-[#FF0000]" /> Endereço de Entrega
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="CEP" className="p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" defaultValue="01001-000" />
                <input type="text" placeholder="Endereço" className="col-span-2 p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" defaultValue="Praça da Sé" />
                <input type="text" placeholder="Número" className="p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" defaultValue="123" />
                <input type="text" placeholder="Complemento" className="col-span-2 p-3 border rounded-md focus:ring-2 focus:ring-[#FF0000] outline-none" />
              </div>
            </div>
          </div>

          {/* Resumo e Pagamento (Mock Mercado Pago) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-4">Resumo do Pedido</h2>
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-zinc-600 line-clamp-1 flex-grow">{item.qty}x {item.name}</span>
                    <span className="font-semibold ml-4">R$ {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Frete (Fixo)</span>
                  <span>R$ 45.00</span>
                </div>
                <div className="flex justify-between text-xl font-black text-zinc-950 pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>R$ {(total + 45).toFixed(2)}</span>
                </div>
              </div>

              {/* Botão de Pagamento simula o Mercado Pago Brick */}
              <button 
                onClick={handlePayment}
                disabled={status === 'processing'}
                className="w-full mt-8 bg-[#009EE3] text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-[#008ACA] transition shadow-lg shadow-blue-500/20 disabled:opacity-70"
              >
                {status === 'processing' ? (
                  <span className="animate-pulse">Processando...</span>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" /> Pagar via Mercado Pago
                  </>
                )}
              </button>
              <p className="text-xs text-center text-zinc-400 mt-4 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 mr-1" /> Ambiente Seguro e Criptografado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardView() {
  // Simulação do Painel Administrativo com RBAC (Visão do Gerente)
  return (
    <div className="flex-grow bg-zinc-100 flex h-full min-h-[80vh]">
      {/* Sidebar Admin */}
      <div className="w-64 bg-zinc-950 text-zinc-400 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-white font-bold text-lg tracking-tight">Painel Admin</h2>
          <span className="text-xs bg-[#FF0000] text-white px-2 py-0.5 rounded-full mt-2 inline-block">Role: Manager</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button className="w-full flex items-center p-3 text-white bg-zinc-800 rounded-lg">
            <Package className="w-5 h-5 mr-3" /> Produtos
          </button>
          <button className="w-full flex items-center p-3 hover:text-white hover:bg-zinc-800 rounded-lg transition">
            <ShoppingCartIcon className="w-5 h-5 mr-3" /> Pedidos (NestJS)
          </button>
          <button className="w-full flex items-center p-3 hover:text-white hover:bg-zinc-800 rounded-lg transition">
            <Settings className="w-5 h-5 mr-3" /> Configurações
          </button>
        </nav>
      </div>

      {/* Admin Content */}
      <div className="flex-grow p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-950">Gerenciamento de Produtos</h1>
          <button className="bg-[#FF0000] text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Novo Produto
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-zinc-900">ID</th>
                <th className="px-6 py-4 font-semibold text-zinc-900">Produto</th>
                <th className="px-6 py-4 font-semibold text-zinc-900">Categoria</th>
                <th className="px-6 py-4 font-semibold text-zinc-900">Preço</th>
                <th className="px-6 py-4 font-semibold text-zinc-900">Estoque</th>
                <th className="px-6 py-4 font-semibold text-zinc-900 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {MOCK_PRODUCTS.map(product => (
                <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 text-zinc-500 font-mono">{product.id}</td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-medium">R$ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${product.stock > 10 ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-[#FF0000] font-medium mr-4">Editar</button>
                    <button className="text-zinc-400 hover:text-[#FF0000] font-medium">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- UTILS & MICRO-COMPONENTS ---

function ProductCard({ product, onClick }) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-zinc-100 overflow-hidden cursor-pointer transition-all duration-300 group flex flex-col"
      onClick={onClick}
    >
      <div className="aspect-square bg-zinc-50 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">{product.category}</span>
        <h3 className="font-bold text-zinc-900 line-clamp-2 leading-tight flex-grow mb-2 group-hover:text-[#FF0000] transition-colors">{product.name}</h3>
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-zinc-50">
          <p className="font-black text-xl text-zinc-950">R$ {product.price.toFixed(2)}</p>
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon fallbacks for the single file
const FilterIcon = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const ShoppingCartIcon = (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;