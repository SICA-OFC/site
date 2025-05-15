import HomePage from "./pages/HomePage.jsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return(
  
  <GoogleReCaptchaProvider reCaptchaKey="6Lch7TIrAAAAACwovKu2Vk4Xbqe2TmXdsrrIyn1h">
  <HomePage /> 
  </GoogleReCaptchaProvider>
  )
}

export default App;