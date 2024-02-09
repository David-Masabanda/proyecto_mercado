import * as jose from "jose";

// Define la función getCedula como una clase para aplicar el patrón Singleton
class UsuarioService {
  constructor() {
    // Puedes inicializar aquí cualquier estado que necesites
  }

  getToken() {
    const tokenString = localStorage.getItem("token");
    if (tokenString !== null) {
      return tokenString;
    } else {
      return null;
    }
  }

  getUsuario() {
    const token = this.getToken();
    if (token !== null) {
        const decodedToken = jose.decodeJwt(token, { complete: true });
        console.log(decodedToken);
        return decodedToken.name;
    } else {
      return null;
    }
  }
}

// Crea una única instancia de la clase para mantener el Singleton
const usuarioServiceInstance = new UsuarioService();

// Exporta la instancia en lugar de la clase directamente
export default usuarioServiceInstance;