import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Join = lazy(() => import("../pages/user/JoinPage"));
const Login = lazy(() => import("../pages/user/LoginPage"));
const LogoutPage = lazy(() => import("../pages/user/LogoutPage"));
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage"));
const MemberModify = lazy(() => import("../pages/user/ModifyPage"));
const MyPage = lazy(() => import("../pages/user/MyPage"));
const Remove = lazy(() => import("../pages/user/RemovePage"));
const FindPw = lazy(() => import("../pages/user/FindPwPage"));

const userRouter = () => {
  return [
    {
      path: "join",
      element: (
        <Suspense fallback={Loading}>
          <Join />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <LogoutPage />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={Loading}>
          <MemberModify />
        </Suspense>
      ),
    },
    {
      path: "mypage/:email",
      element: (
        <Suspense fallback={Loading}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "remove/:email",
      element: (
        <Suspense fallback={Loading}>
          <Remove />
        </Suspense>
      ),
    },
    {
      path: "reset-pw",
      element: (
        <Suspense fallback={Loading}>
          <FindPw />
        </Suspense>
      ),
    },
  ];
};

export default userRouter;
