import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>Archive</Breadcrumb.Item>
      {pathSegments.map((segment, index) => (
        <Breadcrumb.Item key={index}>{segment}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;