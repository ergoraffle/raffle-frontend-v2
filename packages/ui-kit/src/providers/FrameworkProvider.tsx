import {
  type AnchorHTMLAttributes,
  type ComponentType,
  createContext,
  type ImgHTMLAttributes,
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
export type ImageProps =
  | (ImgHTMLAttributes<HTMLImageElement> & {
      src: string;
      alt: string;
      width: number;
      height: number;
    })
  | {
      src: string;
      alt: string;
      fill: boolean;
    };

export type AnchorComponent = ComponentType<AnchorProps>;
export type ImageComponent = ComponentType<ImageProps>;

export type FrameworkContextType = {
  components: {
    Anchor: AnchorComponent;
    Image: ImageComponent;
  };
};

export const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined);

export type FrameworkProviderProps = {
  children?: ReactNode;
  components: {
    Anchor: AnchorComponent;
    Image: ImageComponent;
  };
};

export const FrameworkProvider = ({ children, components }: FrameworkProviderProps) => {
  const value = useMemo<FrameworkContextType>(
    () => ({
      components: {
        Anchor: components.Anchor,
        Image: components.Image
      }
    }),
    [components.Anchor, components.Image]
  );

  return <FrameworkContext.Provider value={value}>{children}</FrameworkContext.Provider>;
};
