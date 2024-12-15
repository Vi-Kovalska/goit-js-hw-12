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

  try {
    const images = await fetchPixabay(term, page);

    if (images.hits.length === 0) {
      throw new Error();
    }

    listImages.insertAdjacentHTML(
      'beforeend',
      createMarkupPixabay(images.hits)
    );

    createSimpleLightBox();

    loadBtn.classList.add('load-more-visible');
  } catch (error) {
    loadBtn.classList.remove('load-more-visible');
    iziToastCondition();
  } finally {
    event.target.elements.titleImage.value = '';
  }
}
const cardByGallery = document.querySelector('.gallery-card');

loadBtn.addEventListener('click', async () => {
  try {
    loadBtn.insertAdjacentHTML('afterend', '<div class="loader" ></div>');
    const loader = document.querySelector('.loader');

    page += 1;

    const images = await fetchPixabay(term, page);

    loader.remove();

    totalPages = Math.ceil(images.totalHits / 15);

    if (page > totalPages) {
      throw new Error();
    }
    listImages.insertAdjacentHTML(
      'beforeend',
      createMarkupPixabay(images.hits)
    );

    createSimpleLightBox();

    const cardHeight = cardByGallery.getBoundingClientRect();
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    if (page > totalPages) {
      loader.remove();
      loadBtn.classList.remove('load-more-visible');
      return iziToastRanOutOfPictures();
    }
  }
});
