import { Navigate } from "react-router-dom";


export function RequiresAuth({ children , login}) {
  
  return login ? children : <Navigate to="/login" replace />;
}