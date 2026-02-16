import {
  type AnchorHTMLAttributes,
  type ComponentType,
  createContext,
  type ReactNode,
  useContext,
  useMemo
} from 'react';

export const useFramework = () => {
  const context = useContext(FrameworkContext);

  if (!context) {
    throw new Error('useFramework must be used within FrameworkProvider');
  }

  return context;
};

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export type AnchorComponent = ComponentType<AnchorProps>;

export type FrameworkContextType = {
  components: {
    Anchor: AnchorComponent;
  };
};

export const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined);

export type FrameworkProviderProps = {
  children?: ReactNode;
  components: {
    Anchor: AnchorComponent;
  };
};

export const FrameworkProvider = ({ children, components }: FrameworkProviderProps) => {
  const value = useMemo<FrameworkContextType>(
    () => ({
      components: {
        Anchor: components.Anchor
      }
    }),
    [components.Anchor]
  );

  return <FrameworkContext.Provider value={value}>{children}</FrameworkContext.Provider>;
};
