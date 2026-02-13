import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ConfigDrawer } from "../Components/ConfigDrawer/ConfigDrawer";

export interface IAppConfig {
  custoMinuto: number;
  custoGrama: number;
  lucroPadrao: number;
}

const STORAGE_KEY = "precificacao_3d_config";

const defaultConfig: IAppConfig = {
  custoMinuto: 0.05,
  custoGrama: 0.15,
  lucroPadrao: 30,
};

interface IAppConfigContext {
  config: IAppConfig;
  setConfig: (config: IAppConfig) => void;
  openConfig: () => void;
}

const AppConfigContext = createContext<IAppConfigContext | null>(null);

export const useAppConfig = () => {
  const ctx = useContext(AppConfigContext);
  if (!ctx) {
    throw new Error("useAppConfig deve ser usado dentro do AppConfigProvider");
  }
  return ctx;
};

export const AppConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getStorageConfig = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return defaultConfig;
  };

  const setConfig = (newConfig: IAppConfig) => {
    setConfigState(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const [config, setConfigState] = useState<IAppConfig>(getStorageConfig());
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setConfigState(JSON.parse(stored));
    }
  }, []);

  const openConfig = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <AppConfigContext.Provider
      value={{
        config,
        setConfig,
        openConfig,
      }}
    >
      {children}

      <ConfigDrawer
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </AppConfigContext.Provider>
  );
};
