import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading/Loading";

const LoadingWrapper: any = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();

  return loading ? <Loading /> : children;
};

export default LoadingWrapper;
