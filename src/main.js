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
const loader = document.querySelector('.loader-is-hidden');

let page = 1;
let totalPages;
let term;

form.addEventListener('submit', handleSearchImages);
async function handleSearchImages(event) {
  event.preventDefault();
  loader.classList.replace('loader-is-hidden', 'loader');
  loadBtn.classList.remove('load-more-visible');

  page = 1;
  term = event.target.elements.titleImage.value.trim();
  if (!term) {
    loader.classList.replace('loader', 'loader-is-hidden');
    return;
  }
  listImages.innerHTML = '';

  try {
    const images = await fetchPixabay(term, page);

    loader.classList.replace('loader', 'loader-is-hidden');

    if (images.hits.length === 0) {
      loader.classList.replace('loader', 'loader-is-hidden');
      throw new Error('There are no images matching your search query');
    }

    totalPages = Math.ceil(images.totalHits / 15);
    if (page > totalPages) {
      loader.classList.replace('loader', 'loader-is-hidden');
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
    loader.classList.replace('loader', 'loader-is-hidden');
    loadBtn.classList.remove('load-more-visible');
    if (error.message == 'There are no images matching your search query') {
      iziToastCondition();
    } else if (error.message == 'Ran out of pictures') {
      iziToastRanOutOfPictures();
    } else {
      return iziToast.error({
        position: 'topRight',
        message: `We're sorry, we are have a problem...${error.message}`,
        displayMode: 1,
      });
    }
  } finally {
    event.target.elements.titleImage.value = '';
  }
}

loadBtn.addEventListener('click', async () => {
  try {
    loadBtn.classList.remove('load-more-visible');
    loader.classList.replace('loader-is-hidden', 'loader');
    page += 1;

    const images = await fetchPixabay(term, page);

    loader.classList.replace('loader', 'loader-is-hidden');

    loadBtn.classList.add('load-more-visible');

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
    if (page === totalPages) {
      loadBtn.classList.remove('load-more-visible');
      throw new Error('The last page');
    }
  } catch (error) {
    loader.classList.replace('loader', 'loader-is-hidden');
    loadBtn.classList.remove('load-more-visible');
    if (page > totalPages || error.message === 'The last page') {
      return iziToastRanOutOfPictures();
    }
  }
});
