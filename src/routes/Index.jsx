import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routeConfig from './ConfigRoute';

const AppRoutes = () => (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
);

export default AppRoutes;