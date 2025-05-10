import {onCleanup, onMount, ParentComponent} from "solid-js";
import Swiper from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SwiperWrapper: ParentComponent<{
    direction?: 'horizontal' | 'vertical'
    loop?: boolean

}> = props => {
    const direction = () => props.direction ?? 'horizontal';
    const loop = () => props.loop ?? false;

    let ref!: HTMLDivElement;

    onMount(() => {
        const swiper = new Swiper(ref, {
            // Optional parameters
            direction: direction(),
            loop: loop(),

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
        onCleanup(() => {
           swiper.destroy()
        })
    })

    return (
        <div ref={ref} class="swiper cursor-pointer">
            <div class={"swiper-wrapper"}>
            {props.children}
            </div>
        </div>
    );
};

export default SwiperWrapper;