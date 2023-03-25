import React, { ReactNode } from 'react';

import NavBar from '@/components/navBar';
import SideMenu from '@/components/sideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <SideMenu />
      <div style={{ marginLeft: '13vw' }}>
        <NavBar />
        <main style={{ marginTop: '15vh' }}>{children}</main>
      </div>
    </div>
  );
}
