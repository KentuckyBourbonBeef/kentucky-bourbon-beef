import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Product } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductDetailBreadcrumbsProps {
  product: Product;
}

const ProductDetailBreadcrumbs = ({ product }: ProductDetailBreadcrumbsProps) => {
  return (
    <div className="mb-8 space-y-4">
      <Link
        to="/"
        className="inline-flex items-center text-bourbon-600 hover:text-bourbon-700 group transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-bourbon-600 hover:text-bourbon-700">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-bourbon-600 hover:text-bourbon-700 capitalize">
              {product.category}s
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-bourbon-800">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ProductDetailBreadcrumbs;