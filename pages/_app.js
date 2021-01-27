import { css, Global } from "@emotion/core";
import React from "react";
import Head from "next/head";
import cartReducer from "../reducers/cartReducer";
import catalogReducer from "../reducers/catalogReducer";
import ErrorModal from "../components/common/ErrorModal";
import errorReducer from "../reducers/errorReducer";
import bannerReducer from "../reducers/bannerReducer";
import technicReducer from "../reducers/technicReducer";
import orderReducer from "../reducers/orderReducer";
import useErrorReport from "../components/common/useErrorReport";
import storage from "../utils/storage";

const isDev = process.env.NODE_ENV === "development";
// const ymCounter = `
// (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
// m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
// (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

// ym(64332478, "init", {
//     clickmap:true,
//     trackLinks:true,
//     accurateTrackBounce:true,
//     webvisor:true
// });
// `;
const gaCounter = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MSNKXX4');
`;
const chatScript = `
!function(){function t(t,e){return function(){window.carrotquestasync.push(t,arguments)}}if("undefined"==typeof carrotquest){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="//cdn.carrotquest.app/api.min.js",document.getElementsByTagName("head")[0].appendChild(e),window.carrotquest={},window.carrotquestasync=[],carrotquest.settings={};for(var n=["connect","track","identify","auth","oth","onReady","addCallback","removeCallback","trackMessageInteraction"],a=0;a<n.length;a++)carrotquest[n[a]]=t(n[a])}}(),carrotquest.connect("39487-c817bf628baf12b6da2302ebfe");
`;

export const ContextCart = React.createContext();

function MyApp({ Component, pageProps }) {
  const intialized = React.useRef(false);

  const [cart, cartDispatch] = React.useReducer(cartReducer, []);
  const [order, orderDispatch] = React.useReducer(orderReducer, {});
  const [catalog, catalogDispatch] = React.useReducer(catalogReducer, null);
  const [banners, bannersDispatch] = React.useReducer(bannerReducer, null);
  const [technics, technicsDispatch] = React.useReducer(technicReducer, null);
  const [error, errorDispatch] = React.useReducer(errorReducer, null);
  useErrorReport();

  React.useEffect(() => {
    try {
      if (catalog && catalog.items && !intialized.current) {
        intialized.current = true;
        const savedIds = storage.session.getValue("cart") || [];
        const savedcart = savedIds
          .map((id) => catalog.items.find((i) => i.id === id))
          .filter(Boolean);
        cartDispatch({ type: "restore", payload: savedcart });
      } else if (intialized.current) {
        const savedcart = cart.map((i) => i.id);
        storage.session.setValue("cart", savedcart);
      }
    } catch (e) {
      intialized.current = true;
      console.log(e);
    }

    if (!isDev) {
      try {
        setTimeout(() => {
          const script = document.createElement("script");
          script.innerHTML = chatScript;
          script.type = "text/javascript";
          document.head.appendChild(script);
        }, 1000);
      } catch (error) {
        console.log(">>>>", error);
      }
    }
  }, [cart, catalog]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>
          Redmond.еда | Ужин на всю семью за 15 минут - привозим ингредиенты и
          рецепты
        </title>
        <meta
          content="🍽Сервис по доставке ингредиентов и заготовок для
          приготовления вкусных завтраков и ужинов 🎁Техника REDMOND со скидкой 50%"
          name="description"
        />
        <meta
          content="готовая еда, доставка еды, редмонд еда, ужин за 15 минут"
          name="keywords"
        ></meta>
        <meta
          content="https://redmondeda.ru/opengraph_logo.png"
          property="og:image"
        />
        <meta
          content="Ужин на всю семью за 15 минут с бесплатной доставкой: Redmond еда"
          property="og:title"
        />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=0, viewport-fit=cover"
          name="viewport"
        />
        <meta content="telephone=YES" name="format-detection" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="yes" name="mobile-web-app-capable" />

        {!isDev && <link href="https://app.redmondeda.ru" rel="preconnect" />}
        {!isDev && <script dangerouslySetInnerHTML={{ __html: gaCounter }} />}
      </Head>
      <Global
        styles={() =>
          css`
            body,
            button,
            input,
            select {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
            }
            button {
              cursor: pointer;
            }
            body {
              margin: 0;
              text-rendering: optimizeLegibility;
              min-width: 320px;
              -webkit-tap-highlight-color: transparent;
            }
            * {
              outline: none;
            }
            .mobilemodal {
              @media (max-width: 767px) {
                overflow: hidden !important;
              }
            }
          `
        }
      />
      <ContextCart.Provider
        value={{
          cart,
          cartDispatch,
          catalog,
          catalogDispatch,
          error,
          errorDispatch,
          banners,
          bannersDispatch,
          technics,
          technicsDispatch,
          order,
          orderDispatch
        }}
      >
        <Component {...pageProps} />
        {error && <ErrorModal {...error} />}
      </ContextCart.Provider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
