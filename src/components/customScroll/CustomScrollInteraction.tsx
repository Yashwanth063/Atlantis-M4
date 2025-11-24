import { Img } from '@chakra-ui/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import scroll from 'assets/img/games/scroll.png';
import cross from 'assets/img/games/cross.png';
interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string; // Custom width prop
  height?: string; // Custom height prop
  id?: string; // Custom height prop
}
const ScrollbarInteraction: React.FC<ScrollbarProps> = ({
    children,
    className,
    width = '100%',
    height,
    id,
    ...props
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [thumbHeights, setThumbHeights] = useState(0);
    const thumbHeight = 15; // Fixed thumb height
    const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
        null
    );
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const updateScrollable = useCallback(() => {
        if (contentRef.current) {
            const { scrollHeight, clientHeight } = contentRef.current;
            setIsScrollable(scrollHeight > clientHeight);
        }
    }, []);
    function handleScrollButton(direction: 'up' | 'down') {
        const { current } = contentRef;
        if (current) {
            const scrollAmount = direction === 'down' ? 200 : -200;
            current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }

    const handleTrackClick = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const { current: trackCurrent } = scrollTrackRef;
            const { current: contentCurrent } = contentRef;
            if (trackCurrent && contentCurrent) {
                const { clientY } = e;
                const target = e.target as HTMLDivElement;
                const rect = target.getBoundingClientRect();
                const trackTop = rect.top;
                const thumbOffset = -(thumbHeight / 2);
                const clickRatio =
                    (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
                const scrollAmount = Math.floor(
                    clickRatio * contentCurrent.scrollHeight
                );
                contentCurrent.scrollTo({
                    top: scrollAmount,
                    behavior: 'smooth',
                });
            }
        },
        [thumbHeight]
    );

    const handleThumbPosition = useCallback(() => {
        if (
            !contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current
        ) {
            return;
        }
        const { scrollTop: contentTop, scrollHeight: contentHeight, clientHeight: contentClientHeight } =
            contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        let newTop = (contentTop / (contentHeight - contentClientHeight)) * (trackHeight - thumbHeight);
        newTop = Math.min(newTop, trackHeight - thumbHeight);
        const thumb = scrollThumbRef.current;
        thumb.style.top = `${newTop}px`;
    }, [thumbHeight]);

    const handleThumbMousedown = useCallback((e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }, []);

    const handleThumbMouseup = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                setIsDragging(false);
            }
        },
        [isDragging]
    );

    const handleThumbMousemove = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                const {
                    scrollHeight: contentScrollHeight,
                    offsetHeight: contentOffsetHeight,
                } = contentRef.current;

                const deltaY =
                    (e.clientY - scrollStartPosition) *
                    (contentOffsetHeight / thumbHeight);
                const newScrollTop = Math.min(
                    initialScrollTop + deltaY,
                    contentScrollHeight - contentOffsetHeight
                );

                contentRef.current.scrollTop = newScrollTop;
            }
        },
        [isDragging, scrollStartPosition, thumbHeight]
    );

    useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
            const ref = contentRef.current;
            observer.current = new ResizeObserver(() => {
                handleThumbPosition();
                updateScrollable();
            });
            observer.current.observe(ref);
            ref.addEventListener('scroll', handleThumbPosition);
            ref.addEventListener('scroll', updateScrollable);
            updateScrollable();
            return () => {
                observer.current?.unobserve(ref);
                ref.removeEventListener('scroll', handleThumbPosition);
                ref.removeEventListener('scroll', updateScrollable);
            };
        }
    }, [handleThumbPosition, updateScrollable]);
    // Listen for mouse events to handle scrolling by dragging the thumb
    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        document.addEventListener('mouseleave', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    const updateThumbHeight = () => {
        const content = contentRef.current;
        if (!content) return;
        const visibleRatio = content.clientHeight / content.scrollHeight;
        const newHeight = visibleRatio * content.clientHeight;
        setThumbHeights(newHeight); // ✅ Update thumb height state
    };

    useEffect(() => {
    const updateOnResize = () => {
        updateThumbHeight(); // ✅ ## Recalculate thumb height
    };

    window.addEventListener('resize', updateOnResize);
    window.addEventListener('orientationchange', updateOnResize); // ✅ ## Rotate update

    return () => {
        window.removeEventListener('resize', updateOnResize);
        window.removeEventListener('orientationchange', updateOnResize);
    };
}, []);

    const handleThumbTouchStart = (e: any) => {
    e.preventDefault(); // ✅ ## BLOCK browser's default scroll

    const startY = e.touches[0].clientY;
    const startScrollTop = contentRef.current.scrollTop;

    const handleTouchMove = (moveEvent: any) => {
        moveEvent.preventDefault(); // ✅ ## Again, block default swipe

        const deltaY = moveEvent.touches[0].clientY - startY;
        contentRef.current.scrollTop = startScrollTop + deltaY * 2;
    };

    const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false }); // ✅ ## Must be passive: false
    window.addEventListener('touchend', handleTouchEnd);
};


    return (
        <div
            style={{
                display: 'grid',
                height: height || '100%',
                width: width,
                gridTemplateColumns:isScrollable ? '1fr 27px' :'',
                overflow: 'hidden',
                position: 'relative',
            }}
            className='Cutom_scroll'
        >
            <div id={id} className={'custom-scrollbars__content'} ref={contentRef} {...props}>
                {children}
            </div>
            <div className={`custom-scrollbars__scrollbar ${isScrollable ? '' : 'hidden'}`}>
                <button
                    className="custom-scrollbars__button"
                    onClick={() => handleScrollButton('up')}
                >
                </button>
                <div className="custom-scrollbars__track-and-thumb">
                    <div
                        className="custom-scrollbars__track"
                        ref={scrollTrackRef}
                        onClick={handleTrackClick}
                        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                    ><Img src={scroll} w={'auto'} h={'100%'} /></div>
                    <div
                        className="custom-scrollbars__thumb-interaction"
                        ref={scrollThumbRef}
                        onMouseDown={handleThumbMousedown}
                        onTouchStart={handleThumbTouchStart}
                        style={{
                            // height: `${thumbHeight}px`,
                            // cursor: isDragging ? 'grabbing' : 'grab',
                            width:'100%',
                            marginLeft:'7px',
                            height: `${thumbHeight}px`, 
                            cursor: isDragging ? 'grabbing' : 'grab',
                             touchAction: 'none',                 // ## NEW: Prevents browser from hijacking touch
        userSelect: 'none',    
                        }}
                    ><Img src={cross} w={'auto'} h={'100%'} /></div>
                </div>
            </div>
        </div>
    );
};

export default ScrollbarInteraction; 