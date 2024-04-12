import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;
const AuctionList = lazy(() => import("../pages/auction/A_ListPage"));
const AuctionRead = lazy(() => import("../pages/auction/A_ReadPage"));
const AuctionAdd = lazy(() => import("../pages/auction/A_Addpage"));
const AuctionModify = lazy(() => import("../pages/auction/A_ModifyPage"));

const auctionRouter = () => {
  return [
    {
      path: "/auction/list",
      element: (
        <Suspense fallback={Loading}>
          <AuctionList />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={Loading}>
          <AuctionRead />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <AuctionAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={Loading}>
          <AuctionModify />
        </Suspense>
      ),
    },

    { path: "", element: <Navigate replace to="list/?page=1&size=12" /> },
    { path: "list", element: <Navigate replace to="list/?page=1&size=12" /> },
  ];
};

export default auctionRouter;
