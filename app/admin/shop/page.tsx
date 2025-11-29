import { getShopProducts, getShopEnquiries } from "@/actions/shop";
import { ShopManager } from "@/components/admin/shop-manager";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

async function ShopData() {
  await connection();
  const [products, enquiries] = await Promise.all([
    getShopProducts(),
    getShopEnquiries(),
  ]);

  return (
    <ShopManager initialProducts={products} initialEnquiries={enquiries} />
  );
}

export default function ShopPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Shop</h2>
        <p className="text-muted-foreground">
          Manage your shop products and enquiries here.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <ShopData />
      </Suspense>
    </div>
  );
}
