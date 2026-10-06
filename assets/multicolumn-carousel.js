document.querySelectorAll('.multicolumn-carousel-wrapper').forEach((wrapper) => {
    const carousel = wrapper.querySelector('.multicolumn-carousel');
    const prevButton = wrapper.querySelector('.multicolumn-carousel__chevron--left');
    const nextButton = wrapper.querySelector('.multicolumn-carousel__chevron--right');

    if (!carousel || !prevButton || !nextButton) return;

    const updateButtons = () => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      prevButton.disabled = carousel.scrollLeft <= 1;
      nextButton.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
    };

    prevButton.addEventListener('click', () => {
      const slide = carousel.querySelector('.group-block');

      if (!slide) return;

      const styles = getComputedStyle(carousel);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const step = slide.getBoundingClientRect().width + gap;

      carousel.scrollBy({
        left: -step,
        behavior: 'smooth'
      });
    });

    nextButton.addEventListener('click', () => {
      const slide = carousel.querySelector('.group-block');

      if (!slide) return;

      const styles = getComputedStyle(carousel);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const step = slide.getBoundingClientRect().width + gap;

      carousel.scrollBy({
        left: step,
        behavior: 'smooth'
      });
    });

    carousel.addEventListener('scroll', updateButtons);

    window.addEventListener('resize', updateButtons);

    updateButtons();
  });