import AppLayout from "../../components/layout/AppLayout";
import ProductGrid from "../../components/product/ProductGrid";
import { useShop } from "../../context/ShopContext";

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-black">Wishlist</h1>
        <ProductGrid products={wishlist} />
      </div>
    </AppLayout>
  );
}
