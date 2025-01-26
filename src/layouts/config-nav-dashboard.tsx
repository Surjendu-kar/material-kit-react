import type { ReactNode } from 'react';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from 'src/hooks/use-auth-state';

import { RoutePaths } from 'src/enum/paths';

import { Iconify } from 'src/components/iconify';

import { logout } from 'src/auth/auth';

type NavItem = {
  title: string;
  path: string;
  icon: ReactNode;
  info?: ReactNode;
  onClick?: () => void;
};

export function useNavConfig() {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate(RoutePaths.SIGN_IN);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigate]);

  const navItems: NavItem[] = [
    {
      title: 'Students',
      path: RoutePaths.STUDENTS,
      icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    ...(isAuthenticated
      ? [
          {
            title: 'Logout',
            path: '#',
            icon: <Iconify icon="solar:logout-3-bold" width={24} />,
            onClick: handleLogout,
          },
        ]
      : []),
  ];

  return navItems;
}
