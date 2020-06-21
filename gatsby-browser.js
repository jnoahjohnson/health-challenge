import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// gatsby-browser.js
export const onServiceWorkerUpdateFound = () => {
  if (
    window.confirm(
      "The app has been updated. Would you like to reload to update?"
    )
  ) {
    window.location.reload(true);
  }
};
