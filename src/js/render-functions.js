'use strict';
import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkupPixabay(arr) {
  const markup = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        id,
        tags,
      }) =>
        `<li class="gallery-card" data-id="${id}">
      <a class="gallery-link" href="${largeImageURL}">
  <img class="pixabay-img" src="${webformatURL}" alt="${tags}" width="360" height="160"/>
  </a>
  <div class="wrapper-card-text">
  <p class="card-text">Likes <span>${likes}</span></p>
   <p class="card-text">Views <span>${views}</span></p>
    <p class="card-text">Comments <span>${comments}</span></p>
     <p class="card-text">Downloads <span>${downloads}</span></p>
  </div>
  </li>`
    )
    .join('');

  return markup;
}
export function createSimpleLightBox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',
    className: 'wrapper',
  });
  return lightbox.refresh();
}
export function iziToastCondition() {
  return iziToast.show({
    theme: 'dark',
    iconUrl: '../img/icons/alert.svg',
    imageWidth: '24px',
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    messageColor: '#fff',
    messageSize: '16px',
    messageLineHeight: '24px',
    backgroundColor: '#EF4040',
    timeout: 5000,
    displayMode: 1,
  });
}

export function iziToastRanOutOfPictures() {
  return iziToast.show({
    theme: 'dark',
    iconUrl: '../img/icons/alert.svg',
    imageWidth: '24px',
    position: 'topRight',
    message: ' We are sorry, but you have reached the end of search results.',
    messageColor: '#fff',
    messageSize: '16px',
    messageLineHeight: '24px',
    backgroundColor: '#EF4040',
    timeout: 5000,
    displayMode: 1,
  });
}
