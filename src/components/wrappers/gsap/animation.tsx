import { gsap } from "gsap";
import { onCleanup } from "solid-js";


declare module "solid-js" {
    namespace JSX {
        interface Directives {
            rainbowHover?: any;
        }
    }
}


const rainbowHover = (el: HTMLElement) => {
    const colorSetter = gsap.quickSetter(el, "backgroundColor");
    const animation = gsap.to(el, {
        backgroundColor: colorSetter("hsl(+=360, +=0%, +=0%)"),
        color: "hsl(+=360, +=0%, +=0%)",
        duration: 5,
        repeat: -1,
        ease: "none",
        paused: true
    });

    el.addEventListener("mouseenter", () => {
        animation.play();
    });

    el.addEventListener("mouseleave", () => {
        animation.pause();
    });


    onCleanup(() => {
        animation.kill();
    })
};






export {rainbowHover}