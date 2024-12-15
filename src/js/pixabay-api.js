'use strict';
import axios from 'axios';

import { listImages } from '../main';

const PIXABAY_KEY = '47506069-50a24acca197abc732faaa7f2';
const URL_PIXABAY = 'https://pixabay.com/api/';

export async function fetchPixabay(term, page) {
  listImages.insertAdjacentHTML('afterbegin', '<div class="loader" ></div>');
  const loader = document.querySelector('.loader');

  const response = await axios(`https://pixabay.com/api/`, {
    params: {
      key: PIXABAY_KEY,
      q: term,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  loader.remove();

  return response.data;
}
