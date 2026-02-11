import { useState, useMemo } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '@/components/products/ProductsTable';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductFormDialog } from '@/components/products/ProductFormDialog';
import { MovementDialog } from '@/components/products/MovementDialog';
import { products as initialProducts } from '@/data/mockData';
import { Product } from '@/types/inventory';
import { toast } from 'sonner';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [movementDialogOpen, setMovementDialogOpen] = useState(false);
  const [movementType, setMovementType] = useState<'entry' | 'exit'>('entry');
  const [movementProduct, setMovementProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesSupplier = supplierFilter === 'all' || product.supplier === supplierFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesSupplier;
    });
  }, [products, search, statusFilter, categoryFilter, supplierFilter]);

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSupplierFilter('all');
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id));
    toast.success(`Produto "${product.name}" excluído com sucesso`);
  };

  const handleProductSubmit = (data: any) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, ...data, status: calculateStatus(data.quantity, data.minQuantity, data.expirationDate) }
          : p
      ));
      toast.success('Produto atualizado com sucesso');
    } else {
      // Add new product
      const newProduct: Product = {
        id: String(Date.now()),
        ...data,
        entryDate: new Date().toISOString().split('T')[0],
        status: calculateStatus(data.quantity, data.minQuantity, data.expirationDate),
      };
      setProducts([newProduct, ...products]);
      toast.success('Produto cadastrado com sucesso');
    }
  };

  const calculateStatus = (quantity: number, minQuantity: number, expirationDate?: string): Product['status'] => {
    if (expirationDate) {
      const expDate = new Date(expirationDate);
      const today = new Date();
      if (expDate < today) return 'expired';
    }
    if (quantity === 0) return 'empty';
    if (quantity <= minQuantity) return 'low';
    return 'ok';
  };

  const handleMovement = (product: Product, type: 'entry' | 'exit') => {
    setMovementProduct(product);
    setMovementType(type);
    setMovementDialogOpen(true);
  };

  const handleMovementSubmit = (data: { quantity: number; notes?: string }) => {
    if (!movementProduct) return;

    const newQuantity =
      movementType === 'entry'
        ? movementProduct.quantity + data.quantity
        : movementProduct.quantity - data.quantity;

    setProducts(products.map((p) =>
      p.id === movementProduct.id
        ? {
            ...p,
            quantity: newQuantity,
            status: calculateStatus(newQuantity, p.minQuantity, p.expirationDate),
          }
        : p
    ));

    toast.success(
      `${movementType === 'entry' ? 'Entrada' : 'Saída'} de ${data.quantity} unidade(s) registrada`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produto(s) encontrado(s)
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={handleAddProduct} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        supplierFilter={supplierFilter}
        onSupplierFilterChange={setSupplierFilter}
        onClearFilters={handleClearFilters}
      />

      <ProductsTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onMovement={handleMovement}
      />

      <ProductFormDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={selectedProduct}
        onSubmit={handleProductSubmit}
      />

      <MovementDialog
        open={movementDialogOpen}
        onOpenChange={setMovementDialogOpen}
        product={movementProduct}
        type={movementType}
        onSubmit={handleMovementSubmit}
      />
    </div>
  );
}
