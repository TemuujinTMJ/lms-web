import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { getUser } from '@/modules/me/me.services';

export default function ({ children }) {
  const token = Cookies.get('token');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.meReducer);

  useEffect(() => {
    if (!token && router.pathname !== '/') {
      console.log('enter');
      window.location.assign('/');
    } else if (token && router.pathname === '/') {
      dispatch(getUser()).then((c) => {
        if (c.payload?.user?.role) {
          let role = c.payload?.user?.role;
          if (role === 'teacher') role = 'laborant';
          if (role === 'customer') role = 'user';
          window.location.assign(`/${role}`);
        }
      });
    }
  }, []);

  if (loading) return <></>;
  return <>{children}</>;
}
