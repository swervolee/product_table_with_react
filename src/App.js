import { useState } from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="text-xl font-semibold">
          <span className="text-yellow-400">Filterable</span>ProductTable
        </div>

        
        <nav className="space-x-6">
          <a href="/" className="hover:text-yellow-400 transition duration-200">Home</a>
          <a href="/about" className="hover:text-yellow-400 transition duration-200">About</a>
          <a href="/services" className="hover:text-yellow-400 transition duration-200">Services</a>
          <a href="/contact" className="hover:text-yellow-400 transition duration-200">Contact</a>
        </nav>

      
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="absolute top-0 right-0 mt-2 mr-3 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M18 10.5A7.5 7.5 0 1110.5 18a7.5 7.5 0 017.5-7.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}


function Footer() {
  return (
    <div className="bg-gray-800 text-white mt-auto">
      <div className="mx-auto flex justify-around py-4">
        <nav className="space-x-6">
          <a href="/" className="hover:text-yellow-400 transition duration-200">Home</a>
          <a href="/about" className="hover:text-yellow-400 transition duration-200">About</a>
          <a href="/services" className="hover:text-yellow-400 transition duration-200">Services</a>
          <a href="/contact" className="hover:text-yellow-400 transition duration-200">Contact</a>
        </nav>
      </div>
    </div>
  );
}




function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="text-left py-2 px-4 text-lg font-semibold text-gray-700 bg-gray-100">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span className="text-red-500">{product.name}</span>;

  return (
    <tr className="border-t">
      <td className="py-2 px-4">{name}</td>
      <td className="py-2 px-4">{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table className="min-w-full border-collapse table-auto mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form className="flex flex-col space-y-4">
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} 
        className="px-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} 
          className="h-4 w-4"
        />
        <span className="text-lg">Only show products in stock</span>
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];


//     <FilterableProductTable products={PRODUCTS} />;

export default function App() {
  return (
  <div className='min-h-screen flex flex-col'>
    <Header />
    <FilterableProductTable products={PRODUCTS} />
    <Footer />
  </div>
  );
}
