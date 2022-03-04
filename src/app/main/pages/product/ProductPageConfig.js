import { lazy } from 'react';

const Product = lazy(() => import('./Product'));
const CreateProduct = lazy(() => import('./CreateProduct'));
const UpdateProduct = lazy(() => import('./UpdateProduct'));

const ProductPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/products',
      element: <Product />,
    },
    {
      path: 'pages/product/:id',
      element: <UpdateProduct />,
    },
    {
      path: 'pages/product/create',
      element: <CreateProduct />,
    },
  ],
};

export default ProductPageConfig;
