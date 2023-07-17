import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((app) => {
  if (typeof window !== "undefined") {
    app.AOS = AOS.init({
      once: true,
      easing: "ease-in",
    });
  }
});
