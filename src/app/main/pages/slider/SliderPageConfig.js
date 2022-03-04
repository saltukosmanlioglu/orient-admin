import { lazy } from 'react';

const Slider = lazy(() => import('./Slider'));
const CreateSlider = lazy(() => import('./CreateSlider'));
const UpdateSlider = lazy(() => import('./UpdateSlider'));

const SliderPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/sliders',
      element: <Slider />,
    },
    {
      path: 'pages/slider/:id',
      element: <UpdateSlider />,
    },
    {
      path: 'pages/slider/create',
      element: <CreateSlider />,
    },
  ],
};

export default SliderPageConfig;
