'use strict';
import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPixabay } from './js/pixabay-api';
import {
  createMarkupPixabay,
  createSimpleLightBox,
  iziToastCondition,
  iziToastRanOutOfPictures,
} from './js/render-functions';

const form = document.querySelector('.form-search-img');
export const listImages = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more-btn');

const loader = document.querySelector('.loader');
let page = 1;
let totalPages;
let term;

form.addEventListener('submit', handleSearchImages);
async function handleSearchImages(event) {
  event.preventDefault();
  loadBtn.classList.remove('load-more-visible');

  page = 1;
  term = event.target.elements.titleImage.value.trim();
  if (!term) {
    return;
  }
  listImages.innerHTML = '';

  try {
    listImages.insertAdjacentHTML('afterbegin', '<div class="loader" ></div>');
    const loader = document.querySelector('.loader');

    const images = await fetchPixabay(term, page);

    loader.remove();

    if (images.hits.length === 0) {
      loader.remove();
      throw new Error('There are no images matching your search query');
    }

    totalPages = Math.ceil(images.totalHits / 15);
    if (page > totalPages) {
      loader.remove();
      throw new Error('Ran out of pictures');
    }

    listImages.insertAdjacentHTML(
      'beforeend',
      createMarkupPixabay(images.hits)
    );

    createSimpleLightBox();

    loadBtn.classList.add('load-more-visible');
    if (page === totalPages) {
      loadBtn.classList.remove('load-more-visible');
    }
  } catch (error) {
    listImages.insertAdjacentHTML('afterbegin', '<div class="loader" ></div>');
    const loader = document.querySelector('.loader');
    loader.remove();
    loadBtn.classList.remove('load-more-visible');
    if (error.message == 'There are no images matching your search query') {
      iziToastCondition();
    } else if (error.message == 'Ran out of pictures') {
      iziToastRanOutOfPictures();
    }
  } finally {
    event.target.elements.titleImage.value = '';
  }
}

loadBtn.addEventListener('click', async () => {
  try {
    loadBtn.classList.remove('load-more-visible');
    loadBtn.insertAdjacentHTML('afterend', '<div class="loader" ></div>');
    const loader = document.querySelector('.loader');

    page += 1;

    const images = await fetchPixabay(term, page);

    loader.remove();

    totalPages = Math.ceil(images.totalHits / 15);
    if (page > totalPages) {
      loadBtn.classList.remove('load-more-visible');
      throw new Error();
    }

    listImages.insertAdjacentHTML(
      'beforeend',
      createMarkupPixabay(images.hits)
    );

    createSimpleLightBox();
    const cardByGallery = document.querySelector('.gallery-card');
    const cardHeight = cardByGallery.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    loadBtn.classList.add('load-more-visible');
  } catch (error) {
    loadBtn.insertAdjacentHTML('afterend', '<div class="loader" ></div>');
    const loader = document.querySelector('.loader');
    loader.remove();
    loadBtn.classList.remove('load-more-visible');
    if (page > totalPages) {
      return iziToastRanOutOfPictures();
    }
  }
});
