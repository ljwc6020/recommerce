import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;
const ProductList = lazy(() => import("../pages/product/P_ListPage"));
const ProductRead = lazy(() => import("../pages/product/P_ReadPage"));
const ProductAdd = lazy(() => import("../pages/product/P_AddPage"));
const ProductModify = lazy(() => import("../pages/product/P_ModifyPage"));
const ProductCart = lazy(() => import("../pages/product/cart/CartPage"));

const productRouter = () => {
  return [
    {
      path: "/product/list",
      element: (
        <Suspense fallback={Loading}>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={Loading}>
          <ProductRead />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={Loading}>
          <ProductModify />
        </Suspense>
      ),
    },
    {
      path: "/product/cart",
      element: (
        <Suspense fallback={Loading}>
          <ProductCart />
        </Suspense>
      ),
    },
    { path: "", element: <Navigate replace to="list/?page=1&size=12" /> },
    { path: "list", element: <Navigate replace to="list/?page=1&size=12" /> },
  ];
};

export default productRouter;
