import { IKContext } from "imagekitio-react";

const ImageKitProviderWrapper = ({ children }) => {
  const urlEndpoint = "https://ik.imagekit.io/ez1ffaf6o/";

  // optional parameters (needed for client-side upload)
  const publicKey = "public_Wwlp5YlR37rYXrDWwNIDMDhBgQo=";

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {children}
    </IKContext>
  );
};

export default ImageKitProviderWrapper;
